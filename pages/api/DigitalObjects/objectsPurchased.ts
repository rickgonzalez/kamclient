import type { NextApiRequest, NextApiResponse } from 'next'
import { customInitApp } from "@/lib/firebase-admin-config";
import { getFirestore, Timestamp, FieldValue, Filter  } from 'firebase-admin/firestore';




customInitApp();
const db = getFirestore();



export async function CapturePurchases(object: any){
  try {
      const data = object //this stuff should already be in object
      data.ts_purchased = Date.now();
     
      //may need to set doc to a uuid
      const res = await db.collection('object_purchases').doc().set(data); 
      return res;
    } catch (e) {
      console.error("object creation error", e);
      return;
    }
  }


  //used to update objects to utilized

  export async function UpdatePurchases(object: any){
    try {
        const data = object //
        const res = await db.collection('object_purchases').doc(object.id).update(data); 
        return res;
      } catch (e) {
        console.error("object Update error", e);
        return;
      }
    }



//used to get a players available objects by player id

export async function GetPurchases(myId: any){

  try {
   
    const objectsRef = db.collection('object_purchases');
      const snapshot = await objectsRef.where('player_id', '==', myId).get();
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }  
     snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      });
    //return doc.data();
    return snapshot.docs

    } catch (e) {
      console.error("error getting Objects by playerid", e);
      return;
    }
  }


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'POST') {
         try {
                let myPlayer = req.body
                console.log('myPlayer to the database is -->', myPlayer)
                let result = await CapturePurchases(myPlayer);
                res.status(200).json({ 'result': result })

          } catch (e) {
            console.error("processing error adding player", e);
            res.status(500).json({error: e })
          }

    } else if (req.method === 'GET') {
          try {
            console.log('Objects purchased request is',req.query);

            const myemail = req.query.email as string


            const myplayer: any = await GetPurchases(myemail) 
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
             let result = await UpdatePurchases(myPlayer);
             res.status(200).json({ 'result': result })

       } catch (e) {
         console.error("processing error updating player", e);
         res.status(500).json({error: e })
       }

 }
  }