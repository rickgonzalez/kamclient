import type { NextApiRequest, NextApiResponse } from 'next'
import { customInitApp } from "@/lib/firebase-admin-config";
import { getFirestore, Timestamp, FieldValue, Filter  } from 'firebase-admin/firestore';



var http = require('http');
import { v4 as uuidv4 } from 'uuid';


customInitApp();
const db = getFirestore();



//ip address comes in at login
//login updates but doesn't capture new data
//game will pass a player for registration (playername, email, public key)
// _login is actually requested to the game (still designing)
// _addPublicKey will be it's own call to update


export async function CapturePlayer(player: any){
  try {
      const data = player //this stuff should already be in player
      data.ts_added = Date.now();
      data.emailValidated = false;
      data.ip = '';
      data.credits = 0;
      const res = await db.collection('players').doc(player.email).set(data); 
      return res;
    } catch (e) {
      console.error("player creation error", e);
      return;
    }
  }

  export async function UpdatePlayer(player: any){
    try {
        const data = player //this stuff should already be in player
        const res = await db.collection('players').doc(player.email).update(data); 
        return res;
      } catch (e) {
        console.error("player Update error", e);
        return;
      }
    }




export async function GetPlayer(myemail: any){
 console.log('email passed to authenticate: ', myemail)
  try {
    const playersRef = db.collection('players').doc(myemail);;
    const doc = await playersRef.get();

    if (!doc.exists) {
      console.log('No such Player!');
    } else {
      console.log('Document data:', doc.data());
    }
    return doc.data();

    } catch (e) {
      console.error("error getting player by email", e);
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
          try {
            console.log('request is',req);

            const myemail = req.query.email as string
            const myplayer: any = await GetPlayer(myemail) 
            const jsonData = JSON.parse(JSON.stringify(myplayer));
            res.status(200).json(jsonData)
            //res.status(200).send({'result': myplayer })
             } catch (e) {
              console.error("processing error Getting player", e);
              res.status(500).json({error: e })
            }
    } else if (req.method === 'PUT') {
      try {
             let myPlayer = req.body
             console.log('myPlayer update -->', myPlayer)
             let result = await UpdatePlayer(myPlayer);
             res.status(200).json({ 'result': result })

       } catch (e) {
         console.error("processing error updating player", e);
         res.status(500).json({error: e })
       }

 }
  }