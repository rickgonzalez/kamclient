// pages/api/player/pair-device.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { customInitApp } from '../../../lib/firebase-admin-config'
import { getFirestore } from 'firebase-admin/firestore'
import { ethers } from 'ethers'

customInitApp()
const db = getFirestore()

export interface DevicePairingRequest {
  deviceAddress: string
  deviceName?: string
}

export interface DevicePairingResponse {
  success: boolean
  message: string
  pairedDevices?: Array<{
    address: string
    deviceName: string
    pairedAt: number
    lastSeen: number
  }>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DevicePairingResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  // Verify user is authenticated via NextAuth session
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ success: false, message: 'Not authenticated' })
  }

  const { deviceAddress, deviceName = 'Unknown Device' } = req.body as DevicePairingRequest

  if (!deviceAddress || !deviceAddress.startsWith('0x')) {
    return res.status(400).json({ success: false, message: 'Invalid device address' })
  }

  try {
    var localplayer:any;
    localplayer = session;

    const playerRef = db.collection('players').doc(localplayer.email)
    const playerDoc = await playerRef.get()

    if (!playerDoc.exists) {
      return res.status(404).json({ success: false, message: 'Player not found' })
    }

    const playerData = playerDoc.data()
    const currentDevices = playerData?.trustedDevices || []

    // Check if device is already paired
    const existingDevice = currentDevices.find((device: any) => 
      device.address.toLowerCase() === deviceAddress.toLowerCase()
    )

    if (existingDevice) {
      // Update last seen
      existingDevice.lastSeen = Date.now()
      await playerRef.update({ trustedDevices: currentDevices })
      
      return res.status(200).json({
        success: true,
        message: 'Device already paired - updated last seen',
        pairedDevices: currentDevices
      })
    }

    // Add new device
    const newDevice = {
      address: deviceAddress,
      deviceName,
      pairedAt: Date.now(),
      lastSeen: Date.now()
    }

    const updatedDevices = [...currentDevices, newDevice]
    await playerRef.update({ trustedDevices: updatedDevices })

    return res.status(200).json({
      success: true,
      message: 'Device paired successfully',
      pairedDevices: updatedDevices
    })

  } catch (error) {
    console.error('Error pairing device:', error)
    return res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

