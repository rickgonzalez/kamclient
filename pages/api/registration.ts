import type { NextApiRequest, NextApiResponse } from 'next'

import { customInitApp } from "@/lib/firebase-admin-config";
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';


//#############-------#######################
// Server side connection using firebase admin example 
// https://dev.to/geiel/how-to-use-firebase-authentication-in-nextjs-13-client-and-server-side-1bbn
// firebase-admin is required for the service account to be used
// The customInitApp passes the credential for the service account so that requests to firebase
// Are authenticated with it!
//#############-------#######################

customInitApp();
const db = getFirestore();

export async function CaptureEmail(email: any){
    try {
      const data = {
        email: email,
        regtime: Date.now()
      };
      // Add a new document in collection "beta2signups" with ID set to the email
      const res = await db.collection('beta2signups').doc(email).set(data);
      return res;

    } catch (e) {
      console.error("join error", e);
      return;
    }
  
  }

//merging on existing data 
//https://firebase.google.com/docs/firestore/manage-data/add-data
//const cityRef = db.collection('cities').doc('BJ');
// const res = await cityRef.set({
//   capital: true
// }, { merge: true });


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
         try {
                let myemail = req.body
                let result = await CaptureEmail(myemail);
                res.status(200).json({ 'result': result })

          } catch (e) {
            console.error("processing error adding reservation", e);
            res.status(500).json({error: e })
          }

    } else {
      // Handle any other HTTP method
      res.status(400).json({ name: 'only takes post' })
    }
  }