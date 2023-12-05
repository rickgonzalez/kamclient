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
    IconButton,
    BsThreeDotsVertical
  } from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid';

export default function PlayerAuth() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [value, setValue] = React.useState('')
    const [player, setPlayer] = React.useState(
        {
            name: 'Cruiser',
            email: 'rcgonzalez.home@gmail.com',
            id: '', 
            playerip:'',
            verToken: ''  
        }

    )
  
 // console.log(uuidv4());
  
    const AuthUser = async (myname) => {
           //In here get the data and then pass to addRoom
            
            let playerId = uuidv4();
            let playerName = myname
            let playerIp = '10.10.0.0.9'
            
            setPlayer({id:playerId, playerip:playerIp, name:playerName,});
            console.log(player);
         
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
           <Avatar onClick={onOpen} size='sm' src='https://bit.ly/broken-link' />
          </WrapItem>
          <Drawer
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
              <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Avatar  size='sm' name={player.name} src='https://bit.ly/broken-link' />

                    <Box>
                    <Heading size='sm'>{value}</Heading>
                    <Text fontSize='sm'>{player.id}</Text>
                    </Box>
                    <Box>
                    <Text  fontSize='sm'>{player.playerip}</Text>
                    </Box>
                    <Box>
                    <Input value={value} onChange={handleChange}  placeholder='Name' />
                    </Box>
                   
                </Flex>
                
                </Flex>
               
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

 