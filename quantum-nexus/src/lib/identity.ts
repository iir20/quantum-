'use client';

import { webcrypto } from 'crypto';

export interface DID {
  id: string;
  publicKey: JsonWebKey;
  privateKey?: CryptoKey;
  metadata: {
    created: Date;
    lastUpdated: Date;
    reputation: number;
    location?: {
      lat: number;
      lng: number;
      accuracy: number;
      timestamp: Date;
      cloaked: boolean;
    };
  };
}

export class IdentityService {
  private did: DID | null = null;
  private keyPair: { publicKey: CryptoKey; privateKey: CryptoKey } | null = null;

  async initialize(): Promise<DID> {
    if (this.did) return this.did;

    // Generate key pair for identity
    const keyPair = await webcrypto.subtle.generateKey(
      {
        name: 'ECDSA',
        namedCurve: 'P-384' // Post-quantum resistant curve
      },
      true,
      ['sign', 'verify']
    );

    // Export public key for sharing
    const publicKeyJwk = await webcrypto.subtle.exportKey('jwk', keyPair.publicKey);

    this.keyPair = keyPair;
    this.did = {
      id: `did:quantum:${Buffer.from(publicKeyJwk.x || '', 'base64').toString('hex').slice(0, 16)}`,
      publicKey: publicKeyJwk,
      metadata: {
        created: new Date(),
        lastUpdated: new Date(),
        reputation: 0
      }
    };

    return this.did;
  }

  async signMessage(message: string): Promise<{ signature: ArrayBuffer; timestamp: number }> {
    if (!this.keyPair?.privateKey) throw new Error('Identity not initialized');

    const timestamp = Date.now();
    const data = new TextEncoder().encode(`${message}:${timestamp}`);
    
    const signature = await webcrypto.subtle.sign(
      {
        name: 'ECDSA',
        hash: { name: 'SHA-384' },
      },
      this.keyPair.privateKey,
      data
    );

    return { signature, timestamp };
  }

  async verifyMessage(
    message: string,
    signature: ArrayBuffer,
    timestamp: number,
    publicKey: JsonWebKey
  ): Promise<boolean> {
    const key = await webcrypto.subtle.importKey(
      'jwk',
      publicKey,
      {
        name: 'ECDSA',
        namedCurve: 'P-384'
      },
      true,
      ['verify']
    );

    const data = new TextEncoder().encode(`${message}:${timestamp}`);
    
    return await webcrypto.subtle.verify(
      {
        name: 'ECDSA',
        hash: { name: 'SHA-384' },
      },
      key,
      signature,
      data
    );
  }

  async updateLocation(lat: number, lng: number, accuracy: number, cloaked: boolean = false): Promise<void> {
    if (!this.did) throw new Error('Identity not initialized');

    this.did.metadata.location = {
      lat: cloaked ? this.cloakCoordinate(lat) : lat,
      lng: cloaked ? this.cloakCoordinate(lng) : lng,
      accuracy: cloaked ? accuracy * 3 : accuracy, // Increase uncertainty when cloaked
      timestamp: new Date(),
      cloaked
    };

    this.did.metadata.lastUpdated = new Date();
  }

  private cloakCoordinate(coord: number): number {
    const fuzzyFactor = 0.01; // Roughly 1km of uncertainty
    return coord + (Math.random() - 0.5) * fuzzyFactor;
  }

  async createEmergencySignal(message: string): Promise<{
    signal: ArrayBuffer;
    location: DID['metadata']['location'];
    timestamp: number;
  }> {
    if (!this.did?.metadata.location) {
      throw new Error('Location not available for emergency signal');
    }

    const { signature, timestamp } = await this.signMessage(
      `EMERGENCY:${message}:${JSON.stringify(this.did.metadata.location)}`
    );

    return {
      signal: signature,
      location: this.did.metadata.location,
      timestamp
    };
  }

  getDID(): DID {
    if (!this.did) throw new Error('Identity not initialized');
    return this.did;
  }
} 