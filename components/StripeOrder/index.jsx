

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


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);



export default function StripeOrder(productid) {

  const [clientSecret, setClientSecret] = useState('');  
  


  const { isOpen, onOpen, onClose } = useDisclosure();


  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: productid }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
 
    


  return (
    <>
      <Button colorScheme='blackAlpha' size='sm' onClick={() => { onOpen() }}>Buy</Button>
    
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Purchase Coins </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
              <Container
            maxW={'lg'}
            bg={useColorModeValue('white', 'whiteAlpha.100')}
            boxShadow={'xl'}
            rounded={'lg'}
            p={6}>
           <div className="App">
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                    </Elements>
                )}
             </div>
          </Container>
              </ModalBody>

              {/* <ModalFooter>
                <Button colorScheme='blue' mr={3}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter> */}
            </ModalContent>
          </Modal>
    </>
  )
}




