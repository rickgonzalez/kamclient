
import type { NextApiRequest, NextApiResponse } from 'next'

import { customInitApp } from "@/lib/firebase-admin-config";
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';


// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



export default async function handler(req: NextApiRequest, res: NextApiResponse) {



  if (req.method === 'POST') {
       try {
          
        const player  = req.body;
     //   console.log('player is ', player);    
         
        const returnedcustomer = await stripe.customers.create({
              name: player.name,
              email: player.email,
            });
            res.status(200).json({ 'result': returnedcustomer })
        } catch (e) {
          console.error("error adding a stripe customer ", e);
          res.status(500).json({error: e })
        }

  }
  else if (req.method === 'GET') {
    try {

         const myid = req.query.id as string;
         const returnedcustomer = await stripe.customers.retrieve(myid);
         res.status(200).json({ 'result': returnedcustomer })
     } catch (e) {
       console.error("error retreiving a stripe customer ", e);
       res.status(500).json({error: e })
     }

}

  
  
  else {
    // Handle any other HTTP method
    res.status(400).json({ name: 'only takes post' })
  }
}