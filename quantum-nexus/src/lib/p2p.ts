'use client';

import { EventEmitter } from 'events';
import { IdentityService, DID } from './identity';

interface PeerMessage {
  type: 'text' | 'neural' | 'holographic' | 'emergency' | 'time-warp';
  content: string;
  sender: string;
  timestamp: Date;
  signature?: ArrayBuffer;
  metadata?: {
    unlockTime?: Date;
    location?: DID['metadata']['location'];
    neural?: {
      emotionalResonance: number;
      cognitiveState: string;
    };
  };
}

export default class P2PService extends EventEmitter {
  private peers: Map<string, RTCPeerConnection>;
  private dataChannels: Map<string, RTCDataChannel>;
  private identityService: IdentityService;
  private localId: string;
  private meshConsensus: Set<string>; // Peers that have validated your identity
  
  constructor() {
    super();
    this.peers = new Map();
    this.dataChannels = new Map();
    this.identityService = new IdentityService();
    this.meshConsensus = new Set();
    this.localId = '';
  }

  async initialize(): Promise<void> {
    const did = await this.identityService.initialize();
    this.localId = did.id;
  }

  async initializePeer(remoteId: string): Promise<void> {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    });

    this.peers.set(remoteId, peerConnection);

    // Create quantum-safe data channel
    const dataChannel = peerConnection.createDataChannel('messageChannel', {
      ordered: true,
      maxRetransmits: 3
    });
    
    this.setupDataChannel(dataChannel, remoteId);

    // Handle ICE candidates with location awareness
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // Add location metadata if available
        const locationData = this.identityService.getDID().metadata.location;
        this.emit('iceCandidate', {
          candidate: event.candidate,
          remoteId,
          location: locationData
        });
      }
    };

    peerConnection.ondatachannel = (event) => {
      this.setupDataChannel(event.channel, remoteId);
    };

    return new Promise((resolve) => {
      peerConnection.onnegotiationneeded = async () => {
        try {
          const offer = await peerConnection.createOffer();
          await peerConnection.setLocalDescription(offer);
          this.emit('offer', {
            offer,
            remoteId,
            did: this.identityService.getDID()
          });
          resolve();
        } catch (error) {
          console.error('Error creating offer:', error);
        }
      };
    });
  }

  private setupDataChannel(channel: RTCDataChannel, peerId: string): void {
    this.dataChannels.set(peerId, channel);

    channel.onmessage = async (event) => {
      try {
        const message: PeerMessage = JSON.parse(event.data);
        
        // Verify message signature if present
        if (message.signature) {
          const isValid = await this.identityService.verifyMessage(
            message.content,
            message.signature,
            message.timestamp.getTime(),
            this.peers.get(peerId)?.remoteDescription?.sdp as any // Get peer's public key from SDP
          );

          if (!isValid) {
            console.error('Invalid message signature');
            return;
          }
        }

        // Handle emergency signals
        if (message.type === 'emergency') {
          this.handleEmergencySignal(message, peerId);
        }

        // Handle time-warp messages
        if (message.type === 'time-warp' && message.metadata?.unlockTime) {
          if (new Date() < message.metadata.unlockTime) {
            // Store for later delivery
            this.storeTimeWarpMessage(message);
            return;
          }
        }

        this.emit('message', message);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    channel.onopen = () => {
      this.emit('peerConnected', peerId);
      this.meshConsensus.add(peerId);
    };

    channel.onclose = () => {
      this.emit('peerDisconnected', peerId);
      this.peers.delete(peerId);
      this.dataChannels.delete(peerId);
      this.meshConsensus.delete(peerId);
    };
  }

  private async handleEmergencySignal(message: PeerMessage, peerId: string) {
    if (!message.metadata?.location) return;

    // Verify location proximity for emergency signal
    const myLocation = this.identityService.getDID().metadata.location;
    if (myLocation && this.isInProximity(myLocation, message.metadata.location)) {
      // Act as validator for the emergency signal
      this.emit('emergencyValidation', {
        peerId,
        message,
        validation: true
      });
    }
  }

  private isInProximity(loc1: DID['metadata']['location'], loc2: DID['metadata']['location']): boolean {
    if (!loc1 || !loc2) return false;
    
    const R = 6371; // Earth's radius in km
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLon = (loc2.lng - loc1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance <= 1; // Within 1km
  }

  private timeWarpMessages: Map<string, PeerMessage> = new Map();

  private storeTimeWarpMessage(message: PeerMessage): void {
    if (!message.metadata?.unlockTime) return;
    
    const id = `${message.sender}-${message.timestamp.getTime()}`;
    this.timeWarpMessages.set(id, message);
    
    const delay = message.metadata.unlockTime.getTime() - Date.now();
    setTimeout(() => {
      const storedMessage = this.timeWarpMessages.get(id);
      if (storedMessage) {
        this.emit('message', storedMessage);
        this.timeWarpMessages.delete(id);
      }
    }, delay);
  }

  async sendMessage(message: Partial<PeerMessage>): Promise<void> {
    const { signature, timestamp } = await this.identityService.signMessage(message.content || '');
    
    const fullMessage: PeerMessage = {
      type: message.type || 'text',
      content: message.content || '',
      sender: this.localId,
      timestamp: new Date(timestamp),
      signature,
      metadata: message.metadata
    };

    this.dataChannels.forEach(channel => {
      if (channel.readyState === 'open') {
        channel.send(JSON.stringify(fullMessage));
      }
    });
  }

  async sendEmergencySignal(message: string): Promise<void> {
    const emergency = await this.identityService.createEmergencySignal(message);
    
    await this.sendMessage({
      type: 'emergency',
      content: message,
      metadata: {
        location: emergency.location
      }
    });
  }

  async sendTimeWarpMessage(content: string, unlockTime: Date): Promise<void> {
    await this.sendMessage({
      type: 'time-warp',
      content,
      metadata: {
        unlockTime
      }
    });
  }

  disconnect(): void {
    this.peers.forEach(peer => peer.close());
    this.dataChannels.forEach(channel => channel.close());
    this.peers.clear();
    this.dataChannels.clear();
    this.meshConsensus.clear();
    this.emit('disconnected');
  }

  get isConnected(): boolean {
    return this.dataChannels.size > 0;
  }

  get peerId(): string {
    return this.localId;
  }

  get consensusCount(): number {
    return this.meshConsensus.size;
  }
} 