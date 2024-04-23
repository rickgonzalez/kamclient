
import React, {useState} from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import MyPlayers from '../RoomInfo';
import {useSelector, useDispatch} from 'react-redux'
import {SET_PLAYER} from '../../services/reducers/playerSlice'

export default function CheckoutForm(props) {
  
  let myid = props.productId
 
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState();
  const [stripecustomer, setstripecustomer] = useState();
  const [loading, setLoading] = useState(false);



  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    var customer;

    if (!stripe) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
  

    console.log('Create a customer if the current player doesnt have a stripe id', props.stripeid);
    if(!props.stripeid){
      
          try {
            const myresult =  await fetch("/api/stripe/stripe-customer", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name: props.playername, email: props.email }),
            })
           customer = await myresult.json();
            console.log('stripe customer', customer);
          } catch (error) {
            console.log('error happened posting the stripe-customer!....',error)
          }
    
          //update the player in firebase so they're good the next time
          let myplayer = {
            email: props.email,
            stripeid: customer.result.id
          }
          try {
            const response = await fetch('/api/player/', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(myplayer),
              });
              console.log('response from player update',response);
              if (response.status == 200){
                console.log('success');
                //Take away  registration option here
                // Add player to redux
                dispatch(SET_PLAYER({
                  stripeid: customer.result.id,
                }));
                setstripecustomer(customer.result.id);
              }    
            } catch (error) {
                console.log('error happened updating player info!....',error)
            }
          
    }else{
      setstripecustomer(props.stripeid);
    }
    
 
  console.log('create payment intent now with customer ', stripecustomer )
    // Create the PaymentIntent and obtain clientSecret
  var stripeid
  if(props.stripeid){
    stripeid = props.stripeid
  }else{stripeid = customer.result.id}


  const myres =  await fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: myid, stripeid: stripeid}),
    })
   
    const {client_secret: clientSecret} = await myres.json();
    console.log('clientSecret',clientSecret);
   


    // Confirm the PaymentIntent using the details collected by the Payment Element
    const {error} = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'http://localhost:3000/Apothecary',
      },
    });
   
  
    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      handleError(error);
    } else {
      // Your customer is redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer is redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.

      console.log("Now WHATA?");
      


    }
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button type="submit" disabled={!stripe || loading}>
        Submit Payment
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
}

