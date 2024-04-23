import type { NextApiRequest, NextApiResponse } from 'next'



// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (item: number) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
console.log('items', item);
  switch (item) {
    case 1:
      return 500;
    case 2:
      console.log('got a 2')
      return 1000;
    case 3:
        return 2000;
    default:
      return 500;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
          
    const  purchase = req.body;
    console.log('this is the purchase ->',purchase);  
     
    
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(purchase.id),
    currency: "usd",
    customer: purchase.stripeid,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
   
  });
        res.status(200).json({ client_secret: paymentIntent.client_secret })
    } catch (e) {
      console.error("error adding a PAYMENT INTENT ", e);
      res.status(500).json({error: e })
    }







 
  

//  res.json({client_secret: paymentIntent.client_secret});


};