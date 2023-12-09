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
    Flex,
    Heading,
    IconButton
  } from '@chakra-ui/react'

  import {useRef} from 'react'
  import {useSelector, useDispatch} from 'react-redux'
  import {SET_PLAYER} from '../services/reducers/playerSlice'
 

import { useDisclosure } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

export default function PlayerAuth() {
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const [value, setValue] = React.useState('');
    const dispatch = useDispatch();
    const myplayer = useSelector((state) => state.player);
    const ipAddress = '';
  
    const AuthUser = async (myname) => {
    
           //In here get the data and then pass to addRoom the joinRoom
          // console.log('orig player ',state.player);
            let playerId = uuidv4();
            let playerName = myname;
            let playerIp = ipAddress;
           
            //Authenticate Playere  
            let playerAuthenticated = true;
           // setPlayer({id:playerId, playerip:playerIp, name:playerName});
            
              dispatch(SET_PLAYER({
                name: playerName,
                email: 'bm@tribevest.com',
                id: playerId, 
                playerip: playerIp,
                verToken: 'ver100001000',
                isAuthenticated: playerAuthenticated 
              }));

            
           
           // setAuth(true);
         
           

            // await addRoom({playerId, playerName, playerIp,roomName,roomType,roomMaxPlayers})
           
            //   if(mutationResult.status = 'fulfilled' && mutationResult.isSuccess){
            //       console.log(JSON.parse(JSON.stringify(mutationResult)))
            //       //create a post process call with the session and roomId to accept the reservation
            //   }
            
    } 

    const handleChange = (event) => setValue(event.target.value)
      

    return (
        <>
          <WrapItem>
           <Avatar onClick={onOpen} size='sm' name= {myplayer.name} src='' />
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
                   


                    <Avatar  size='sm' name={myplayer.name} src='' />

                    <Box>
                    <Heading size='sm'>{value}</Heading>
                    </Box>
                    <Box>
                    <Text fontSize='sm'>{myplayer.id}</Text>
                    </Box>
                    <Box>
                    <Text  fontSize='sm'>{myplayer.playerip}</Text>
                    </Box>
                    <Box>
                    <Input value={value} onChange={handleChange}  placeholder='Name' />
                    </Box>
                   
               
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

 