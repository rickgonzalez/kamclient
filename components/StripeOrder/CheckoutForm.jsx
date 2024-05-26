
import React, {useState} from 'react';
import {
 Center,
 Flex,
 Text,
 Box,
 Stack
} from '@chakra-ui/react'
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import {useSelector, useDispatch} from 'react-redux'
import {SET_PLAYER} from '../../services/reducers/playerSlice'
import { useSession} from "next-auth/react"

export default function CheckoutForm(props) {
  
  let myid = props.productId
 
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { data: session, status, update } = useSession()
  const [errorMessage, setErrorMessage] = useState();
  const [stripecustomer, setstripecustomer] = useState();
  const [PaymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const player = useSelector((state) => state.player);


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
            const myresult =  await fetch(process.env.NEXT_PUBLIC_URL +"/api/stripe/stripe-customer", {
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
            const response = await fetch(process.env.NEXT_PUBLIC_URL +'/api/player/', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(myplayer),
              });
              console.log('response from player update',response);
              
              if (response.status == 200){
                console.log('success');
               
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


  const myres =  await fetch(process.env.NEXT_PUBLIC_URL +"/api/stripe/create-payment-intent", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      credentials: "same-origin", // include, *same-origin, omit
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: myid, stripeid: stripeid}),
    })
   
    const {client_secret: clientSecret} = await myres.json();
    //console.log('clientSecret',clientSecret);
   

  
    // Confirm the PaymentIntent using the details collected by the Payment Element
    try {
      let returnurl = process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL
     let myconfirmation = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: returnurl,
        },
        redirect: "if_required"
      });
      //console.log('Confrimation ->',myconfirmation);
      if(myconfirmation.paymentIntent.status == "succeeded"){
        
        console.log('player at purchase is', player);
       //To Do! credits in session showing up as 0 !! fix


        let spent = myconfirmation.paymentIntent.amount
        console.log('spent is: ', spent)
        
        var newCredits = 0;

        if(spent == 500){
          newCredits = 400;
        }else if(spent == 1000){
            newCredits = 900;
        }else if(spent == 2000){
              newCredits = 2200;
        }


        console.log('NewCredits is: ',newCredits)



        let creditBalance = (newCredits + player.credits)
        console.log('credits will now be: ', creditBalance);
            let myplayer = {
              email: props.email,
              credits: creditBalance
            }
            
            try {
              const response = await fetch(process.env.NEXT_PUBLIC_URL +'/api/player/', {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(myplayer),
                });
                console.log('response from player update',response);
                if (response.status == 200){
                  console.log('success');
                  await update({ credits: creditBalance })
                  dispatch(SET_PLAYER({
                    credits: creditBalance,
                  }));
                  update();
                  console.log('Yay Success ->',myconfirmation);
                  setPaymentSuccess(true);
                }    
              } catch (error) {
                  console.log('error happened updating player info!....',error)
              }
          
      }



    } catch (error) {
      handleError(error);
    }
    //Update of coins is made to the player collection via a player update
    // current value of coins (and the new value too) need to be read from redux store
    // as it maintains the active state - then on each new purchase or spend it should update
    // coins in the player collection of firebase
   
  
    console.log("Now WHATA?");
      

  };

  const paymentElementOptions = {
    layout: "tabs",
  };


  function MyPaymentform(){
    if(PaymentSuccess){
      return ( 
        <><Center bg='green' h='100px' color='white'>
         <Stack>
         <Text as='b' fontSize='2xl'>Success!!</Text>
         <Text fontSize='xl'>Your new Nycoin balance is: {player.credits}</Text>
         </Stack>
         
        </Center></> 
    
    )
    }

  }


  return (
   
    <><Box><MyPaymentform PaymentSuccess = {PaymentSuccess} /><form onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button type="submit" disabled={!stripe || loading}>
        Submit Payment
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form></Box></>
  );
}

// 