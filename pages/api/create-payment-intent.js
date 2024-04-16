// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
console.log('items', items[0].id);
  switch (items[0].id.productId) {
    case 1:
      return 500;
    case 2:
      return 1000;
    case 3:
        return 2000;
    default:
      return 0;
  }
};

export default async function handler(req, res) {
  const { items } = req.body;


  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });

};