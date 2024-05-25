

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
import { CheckIcon } from '@chakra-ui/icons'
import React from 'react'
import error from 'next/error'

import * as admin from 'firebase-admin';




export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'initial' | 'submitting' | 'success'>('initial')
  const [error, setError] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()


  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)


 
    //This will call a post to API
    const handleSubmit = async () => {
      console.log('sending email');

          try {
            const response = await fetch(process.env.NEXT_PUBLIC_URL +'/api/registration/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(email),
              });
              console.log(response);
              if (response.status == 200){
                console.log('success');
                setEmail('');
              } 
             
        } catch (error) {
            console.log('error happened!....',error)
            setEmail('oops please try again');
        }
    };
  


  return (
    <>
      <Button onClick={() => { onOpen(); setState('initial');}}>Request Beta2 Access</Button>
      {/* <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button> */}
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Beta 2: Date Pending </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
              <Container
            maxW={'lg'}
            bg={useColorModeValue('white', 'whiteAlpha.100')}
            boxShadow={'xl'}
            rounded={'lg'}
            p={6}>
            <Heading
              as={'h2'}
              fontSize={{ base: 'xl', sm: '2xl' }}
              textAlign={'center'}
              mb={5}>
              We're taking signups and we'll email you details!
            </Heading>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              as={'form'}
              spacing={'12px'}
              onSubmit={(e: FormEvent) => {
                e.preventDefault()
                setError(false);
                setState('submitting')

                // remove this code and implement your submit logic right here
                setTimeout(() => {
                  if (email === 'fail@example.com') {
                    setError(true)
                    setState('initial')
                    return
                  }
                  setState('success');
                  handleSubmit();
                }, 1000)
              }}>
              <FormControl>
                <Input
                  variant={'solid'}
                  borderWidth={1}
                  color={useColorModeValue('gray.800', 'gray.200')}
                  _placeholder={{
                    color: 'gray.400',
                  }}
                  borderColor={useColorModeValue('gray.300', 'gray.700')}
                  id={'email'}
                  type={'email'}
                  required
                  placeholder={'Your Email'}
                  aria-label={'Your Email'}
                  value={email}
                  disabled={state !== 'initial'}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl w={{ base: '100%', md: '40%' }}>
                <Button
                  colorScheme={state === 'success' ? 'green' : 'blue'}
                  isLoading={state === 'submitting'}
                  w="100%"
                  type={state === 'success' ? 'button' : 'submit'}>
                  {state === 'success' ? <CheckIcon /> : 'Submit'}
                </Button>
              </FormControl>
            </Stack>
            <Text mt={2} textAlign={'center'} color={error ? 'red.500' : 'gray.500'}>
              {error
                ? 'Oh no an error occured! 😢 Please try again later.'
                : "You won't receive any spam! ✌️"}
            </Text>
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




