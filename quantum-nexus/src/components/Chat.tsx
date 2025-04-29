'use client';

import { useState, useEffect, useRef } from 'react';
import P2PService from '@/lib/p2p';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'neural' | 'holographic' | 'emergency' | 'time-warp';
  metadata?: {
    unlockTime?: Date;
    location?: {
      lat: number;
      lng: number;
      accuracy: number;
      timestamp: Date;
      cloaked: boolean;
    };
    neural?: {
      emotionalResonance: number;
      cognitiveState: string;
    };
  };
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [peerId, setPeerId] = useState<string>('');
  const [remotePeerId, setRemotePeerId] = useState('');
  const [messageType, setMessageType] = useState<Message['type']>('text');
  const [unlockTime, setUnlockTime] = useState<string>('');
  const [showEmergencyButton, setShowEmergencyButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const p2pServiceRef = useRef<P2PService | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initialize P2P service
    const p2pService = new P2PService();
    p2pServiceRef.current = p2pService;
    
    // Initialize service and get DID
    p2pService.initialize().then(() => {
      setPeerId(p2pService.peerId);
      
      // Request location for emergency features
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            setShowEmergencyButton(true);
          },
          (error) => {
            console.log('Location not available:', error);
          }
        );
      }
    });

    // Set up event listeners
    p2pService.on('message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    p2pService.on('peerConnected', () => {
      setIsConnected(true);
    });

    p2pService.on('peerDisconnected', () => {
      setIsConnected(false);
    });

    p2pService.on('emergencyValidation', (data) => {
      // Show emergency validation UI
      console.log('Emergency validated:', data);
    });

    return () => {
      p2pService.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleConnect = async () => {
    if (!remotePeerId.trim() || !p2pServiceRef.current) return;
    await p2pServiceRef.current.initializePeer(remotePeerId);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !p2pServiceRef.current) return;

    const metadata: Message['metadata'] = {};

    // Add time-warp metadata
    if (messageType === 'time-warp' && unlockTime) {
      metadata.unlockTime = new Date(unlockTime);
    }

    // Add neural metadata
    if (messageType === 'neural') {
      metadata.neural = {
        emotionalResonance: Math.random(), // Replace with actual emotional AI
        cognitiveState: 'focused'
      };
    }

    if (messageType === 'emergency') {
      await p2pServiceRef.current.sendEmergencySignal(newMessage);
    } else if (messageType === 'time-warp') {
      await p2pServiceRef.current.sendTimeWarpMessage(newMessage, metadata.unlockTime!);
    } else {
      await p2pServiceRef.current.sendMessage({
        type: messageType,
        content: newMessage,
        metadata
      });
    }

    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-4xl mx-auto p-6">
      {/* Connection Status */}
      <div className={`mb-4 p-4 rounded-lg quantum-border ${
        isConnected ? 'bg-green-500/20' : 'bg-red-500/20'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <span>{isConnected ? 'Connected to P2P Mesh' : 'Disconnected'}</span>
          </div>
          {!isConnected && (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={remotePeerId}
                onChange={(e) => setRemotePeerId(e.target.value)}
                placeholder="Enter peer ID to connect..."
                className="px-3 py-1 rounded-lg bg-background/20 quantum-border"
              />
              <button
                onClick={handleConnect}
                className="px-4 py-1 bg-primary rounded-lg text-white hover:opacity-90 transition-all"
              >
                Connect
              </button>
            </div>
          )}
        </div>
        <div className="mt-2 text-sm text-foreground/60">
          Your DID: {peerId}
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 quantum-border rounded-lg p-4 backdrop-blur-sm bg-background/20">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.sender === peerId ? 'items-end' : 'items-start'
            }`}
          >
            <div className={`max-w-[70%] p-3 rounded-lg ${
              message.sender === peerId
                ? 'bg-primary/20 quantum-border'
                : 'bg-background/40'
            }`}>
              <div className="flex items-center mb-1">
                <span className="font-bold mr-2">{message.sender}</span>
                <span className="text-xs text-foreground/60">
                  {message.timestamp.toLocaleTimeString()}
                </span>
                {message.type !== 'text' && (
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/20">
                    {message.type}
                  </span>
                )}
              </div>
              <p>{message.content}</p>
              {message.metadata?.neural && (
                <div className="mt-1 text-xs text-foreground/60">
                  Emotional Resonance: {Math.round(message.metadata.neural.emotionalResonance * 100)}%
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSend} className="space-y-2">
        <div className="flex gap-2">
          <select
            value={messageType}
            onChange={(e) => setMessageType(e.target.value as Message['type'])}
            className="px-3 py-2 rounded-lg bg-background/20 quantum-border"
          >
            <option value="text">Text</option>
            <option value="neural">Neural</option>
            <option value="holographic">Holographic</option>
            <option value="time-warp">Time Warp</option>
            {showEmergencyButton && (
              <option value="emergency">Emergency</option>
            )}
          </select>

          {messageType === 'time-warp' && (
            <input
              type="datetime-local"
              value={unlockTime}
              onChange={(e) => setUnlockTime(e.target.value)}
              className="px-3 py-2 rounded-lg bg-background/20 quantum-border"
            />
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Type your ${messageType} message...`}
            className="flex-1 bg-background/20 quantum-border rounded-lg p-3 backdrop-blur-sm"
            disabled={!isConnected}
          />
          <button
            type="submit"
            className={`px-6 py-3 rounded-lg text-white hover:opacity-90 transition-all disabled:opacity-50 ${
              messageType === 'emergency' ? 'bg-red-500' : 'bg-primary'
            }`}
            disabled={!isConnected}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
} 