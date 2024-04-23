

import { FormEvent, ChangeEvent, useState } from 'react'
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

import React from 'react'
import error from 'next/error'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm"
import { useDispatch, useSelector } from 'react-redux';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

//https://docs.stripe.com/payments/accept-a-payment-deferred?type=payment





export default function StripeOrder(props) {
  const myplayer = useSelector((state) => state.player);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  console.log('stripe order says the product id is ',props.productId);

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  function processbuy(){
    console.log(myplayer);
    if(!myplayer.isAuthenticated){
      console.log('you should be logged in to buy something');
    }else{
      onOpen();
    }
   }


  const appearance = {
    theme: 'stripe',
  };
  const options = {
    mode: 'payment',
    amount: props.price,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance: {/*...*/},
  };
 //get the amound for the product and pass to the CheckoutForm
    


  return (
    <>
      <Button colorScheme='blackAlpha' size='sm' onClick={() => { processbuy() }}>Buy</Button>
    
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Purchase Coins Package for ${props.price/100}</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
              <Container
            maxW={'lg'}
            bg={useColorModeValue('white', 'whiteAlpha.100')}
            boxShadow={'xl'}
            rounded={'lg'}
            p={6}>
           <div className="App">
              <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm productId = {props.productId} playername = {myplayer.playername} email = {myplayer.email} stripeid = {myplayer.stripeid}/>
              </Elements>
             </div>
          </Container>
              </ModalBody>
            </ModalContent>
          </Modal>
    </>
  )
}




// <div className="App">
//                 {clientSecret && (
//                     <Elements options={options} stripe={stripePromise}>
//                     <CheckoutForm />
//                     </Elements>
//                 )}
//              </div>