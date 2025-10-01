// pages/api/pairing/start.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { customInitApp } from '../../../lib/firebase-admin-config';
import { getFirestore } from 'firebase-admin/firestore';

customInitApp();
const db = getFirestore();

export interface PairingStartRequest {
  publicKey: string;
  deviceInfo?: {
    platform?: string;
    userAgent?: string;
    timestamp?: number;
  };
}

export interface PairingStartResponse {
  success: boolean;
  pairingCode?: string;
  expiresIn?: number;
  webPairUrl?: string;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PairingStartResponse>
) {
  // if (req.method !== 'POST') {
  //   return res.status(405).json({ success: false, message: 'Method not allowed' });
  // }

 // const { publicKey, deviceInfo } = req.body as PairingStartRequest;
 const myRequest: PairingStartRequest  = req.body;
 console.log("myRequest-------->", myRequest);
  // // Validate public key format (Ethereum address)
  // if (!publicKey || !publicKey.match(/^0x[a-fA-F0-9]{40}$/)) {
  //   return res.status(400).json({ 
  //     success: false, 
  //     message: 'Invalid public key format' 
  //   });
  // }

  try {
    // Generate 4-digit code
    const pairingCode = Math.floor(1000 + Math.random() * 9000).toString();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes
    const publicKey = myRequest.publicKey;
    const deviceInfo = myRequest.deviceInfo;
    // Store pending pairing in Firestore
    await db.collection('devicePairings').doc(pairingCode).set({
      pairingCode,
      publicKey,
      deviceInfo: deviceInfo || {},
      createdAt: now,
      expiresAt,
      completed: false,
      completedAt: null,
      userId: null
    });

    return res.status(200).json({
      success: true,
      pairingCode,
      expiresIn: 300, // 5 minutes in seconds
      webPairUrl: `${process.env.NEXTAUTH_URL}/pair`
    });

  } catch (error) {
    console.error('Error starting pairing process:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}