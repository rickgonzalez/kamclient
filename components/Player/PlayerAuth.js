import * as React from 'react'
import { signOut } from "next-auth/react"
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    WrapItem,
    VStack,
    Avatar,
    Button
   } from '@chakra-ui/react'


  import {useSelector, useDispatch} from 'react-redux'
  import {SET_PLAYER} from '../../services/reducers/playerSlice'
 var http = require('http');

import { useDisclosure } from '@chakra-ui/react';
import PlayerAuthChoice from './PlayerAuthChoice'
import PlayerInfoPanel from './PlayerInfoPanel'

export default function PlayerAuth() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
   
    const myplayer = useSelector((state) => state.player);
    const dispatch = useDispatch();


    const handleLogout = async () => {
      console.log('logging out!')
      // dispatch(SET_PLAYER({
      //   isAuthenticated: false  // Todo - validate email and then can login
      // }));
      signOut({ callbackUrl: '/' })
      }

    return (
        <>
          <WrapItem>
          <Avatar onClick={onOpen} size='md' src='' name= {myplayer.isAuthenticated ? myplayer.playername : ''} />
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
        
                   {/* {state === 'success' ? <CheckIcon /> : 'Submit'} */}
                   {!myplayer.isAuthenticated ? <PlayerAuthChoice/> : <><PlayerInfoPanel/><Button bg={'blue.400'} color={'white'} _hover={{   bg: 'blue.500', }} size='sm' onClick={() => { handleLogout() } }>Log Out</Button></>}
                   
   
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