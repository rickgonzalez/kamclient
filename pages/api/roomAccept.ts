import type { NextApiRequest, NextApiResponse } from 'next'
import * as Colyseus from "colyseus.js"; 

var client = new Colyseus.Client('wss://localhost:2567'); 



export async function ConsumeReservation(reservation: any){
    try {
      const room = await client.consumeSeatReservation(reservation);
      console.log("joined successfully", room);
    
    } catch (e) {
      console.error("join error", e);
    }
  }



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
         try {
                // Process a POST request
                let myReservation = req.body
                console.log(myReservation);
                await ConsumeReservation(myReservation);
                res.status(200).json({ name: 'good to go' })
          
          } catch (e) {
            console.error("processing error accepting room reservation", e);
            res.status(200).json({error: e })
          }

    } else {
      // Handle any other HTTP method
      res.status(200).json({ name: 'only takes post' })
    }
  }