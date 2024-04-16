import type { NextApiRequest, NextApiResponse } from 'next'

import { customInitApp } from "@/lib/firebase-admin-config";
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
import {useSelector, useDispatch} from 'react-redux'
import {SET_PLAYER} from '../../services/reducers/playerSlice'

var http = require('http');



customInitApp();
const db = getFirestore();



//ip address comes in at login
//login updates but doesn't capture new data
//game will pass a player for registration (playername, email, public key)
// _login is actually requested to the game (still designing)
// _addPublicKey will be it's own call to update


export async function CapturePlayer(player: any){
 
  try {
      const data = player
      data.ts_added = Date.now();
      data.emailValidated = false;
      data.publickey = '';
      data.ip = '';
      
      const res = await db.collection('players').doc(player.email).set(data);
     
     
      return res;

    } catch (e) {
      console.error("join error", e);
      return;
    }
  
  }



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
         try {
                let myPlayer = req.body
                console.log('myPlayer to the database is -->', myPlayer)
                let result = await CapturePlayer(myPlayer);
                res.status(200).json({ 'result': result })

          } catch (e) {
            console.error("processing error adding player", e);
            res.status(500).json({error: e })
          }

    } else if (req.method === 'GET') {
      //Query database and return public key
      res.status(400).json({ name: 'only takes post' })
    }
  }