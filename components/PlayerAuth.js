import * as React from 'react'

import {
    Text,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Box,
    Container,
    Wrap,
    WrapItem,
    Center,
    VStack,
    Avatar,
    Input,
    Button,
    Stack,
    Heading,
    Accordion,
    AccordionPanel,
    AccordionIcon,
    AccordionButton,
    AccordionItem,
    useColorModeValue,
    HStack,
    FormControl,
    FormLabel,
    InputGroup,

  } from '@chakra-ui/react'

  //import {useRef} from 'react'
  import {useSelector, useDispatch} from 'react-redux'
  import {SET_PLAYER} from '../services/reducers/playerSlice'
 var http = require('http');
//import {http} from 'http'
import { useDisclosure } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

import PlayerAuthChoice from '../components/PlayerAuthChoice'


export default function PlayerAuth() {
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const [value, setValue] = React.useState('');
    const [connectedAccount, setConnectedAccount] = React.useState('null');
  
    const myplayer = useSelector((state) => state.player);


    const handleChange = (event) => setValue(event.target.value)
      

    return (
        <>
          <WrapItem>
          <Avatar onClick={onOpen} size='md' src='https://bit.ly/broken-link' name= {myplayer.isAuthenticated ? myplayer.playername : ''} />
          </WrapItem>

          <Drawer
            size={'md'}
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Your account</DrawerHeader>
    
              <DrawerBody>
              <VStack
                    spacing={4}
                    align='stretch'
                >
                    <Avatar  size='lg' name= {myplayer.isAuthenticated ? myplayer.playername : ''}  src='' />
                  
                    <Box>
                    <Text fontSize='sm'>{myplayer.playername}</Text>
                    </Box>
                    <Box>
                    <Text  fontSize='sm'>{myplayer.playerip}</Text>
                    </Box>
                    <Box></Box>
                  
                  
                   {/* {state === 'success' ? <CheckIcon /> : 'Submit'} */}
                   {!myplayer.isAuthenticated ? <PlayerAuthChoice/> : <></>} 
                   
   
                </VStack> 
             </DrawerBody>
    
              <DrawerFooter>
                <Button variant='outline' mr={3} onClick={onClose}>
                  Done
                </Button>
                {/* <Button colorScheme='blue' onClick={() => AuthUser(value)}>Save</Button> */}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      )
  }




  // async function connectMetamask() {
  //   //check metamask is installed
  //   if (window.ethereum) {
  //     // instantiate Web3 with the injected provider
  //     const web3 = new Web3(window.ethereum);

  //     //request user to connect accounts (Metamask will prompt)
  //     await window.ethereum.request({ method: 'eth_requestAccounts' });

  //     //get the connected accounts
  //     const accounts = await web3.eth.getAccounts();

  //     //show the first connected account in the react page
  //     setConnectedAccount(accounts[0]);
  //   } else {
  //     alert('Please download metamask');
  //   }
  // }


   {/* <Button  onClick={() => connectMetamask()} fontFamily={'heading'} bg={'gray.200'} color={'gray.800'}>
                    Connect to Metamask
                    </Button> */}