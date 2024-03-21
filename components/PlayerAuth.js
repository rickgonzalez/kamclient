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
    Heading
  } from '@chakra-ui/react'

  //import {useRef} from 'react'
  import {useSelector, useDispatch} from 'react-redux'
  import {SET_PLAYER} from '../services/reducers/playerSlice'
 var http = require('http');
//import {http} from 'http'
import { useDisclosure } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { Web3 } from 'web3';


export default function PlayerAuth() {
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const [value, setValue] = React.useState('');
    const [connectedAccount, setConnectedAccount] = React.useState('null');
    const dispatch = useDispatch();
    const myplayer = useSelector((state) => state.player);
    var ipAddress = undefined;


    
      const AuthUser = async (myname) => {
      
          http.get({'host': 'api.ipify.org?format=json', 'port': 80, 'path': '/'}, function(resp) {
            resp.on('data', async function(data) {
             // console.log("My public IP address is: " + String(data));

                    let playerId = uuidv4();
                    let playerName = myname;
                    let playerIp = String(data);
                    let playerAuthenticated = true;
                   
                     dispatch(SET_PLAYER({
                      name: playerName,
                      email: 'bm@tribevest.com',
                      id: playerId, 
                      playerip: playerIp,
                      verToken: 'ver100001000',
                      isAuthenticated: playerAuthenticated 
                    }));
            });
          });

          onClose();

         
      } 


      async function connectMetamask() {
        //check metamask is installed
        if (window.ethereum) {
          // instantiate Web3 with the injected provider
          const web3 = new Web3(window.ethereum);
    
          //request user to connect accounts (Metamask will prompt)
          await window.ethereum.request({ method: 'eth_requestAccounts' });
    
          //get the connected accounts
          const accounts = await web3.eth.getAccounts();
    
          //show the first connected account in the react page
          setConnectedAccount(accounts[0]);
        } else {
          alert('Please download metamask');
        }
      }




    const handleChange = (event) => setValue(event.target.value)
      

    return (
        <>
          <WrapItem>
          <Avatar onClick={onOpen} size='md' src='https://bit.ly/broken-link' name= {myplayer.name}  />
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
                   


                   <Avatar  size='lg' name={myplayer.name} src='' />

                    <Box>
                    <Heading size='sm'>{value}</Heading>
                    </Box>
                    <Box>
                    <Text fontSize='sm'>{myplayer.name}</Text>
                    </Box>
                    <Box>
                    <Text fontSize='sm'>{connectedAccount}</Text>
                    </Box>
                    <Box>
                    <Text  fontSize='sm'>{myplayer.playerip}</Text>
                    </Box>
                    <Box>
                    <Input value={value} onChange={handleChange}  placeholder='Name' />
                    </Box>
                    <Button  onClick={() => connectMetamask()} fontFamily={'heading'} bg={'gray.200'} color={'gray.800'}>
                    Connect to Metamask
                    </Button>
               
                </VStack> 
            



                </DrawerBody>
    
              <DrawerFooter>
                <Button variant='outline' mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='blue' onClick={() => AuthUser(value)}>Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      )
  }

 