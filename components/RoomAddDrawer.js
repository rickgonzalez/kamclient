import * as React from 'react'

import {
    Text,
    Button,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Divider,
    Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Container,
  Wrap,
  WrapItem,
  Center,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  } from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'
import {useSelector} from 'react-redux'
import {usePostNewRoomMutation} from '@/services/providers'
import { useRouter } from 'next/router'

import * as Colyseus from "colyseus.js"; 

var client = new Colyseus.Client('ws://localhost:2567'); 



export async function ConsumeReservation(reservation){
    try {
      const room = await client.consumeSeatReservation(reservation);
      console.log("joined successfully", room);
    
    } catch (e) {
      console.error("join error", e);
    }
  }


export default function RoomAddDrawer() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter();
    const myplayer = useSelector((state) => state.player);

   //const [roomName, setRoomName] = React.useState('AzariaRoom');
    const [friendlyName, setRoomFname] = React.useState('');
    const [value, setValue] = React.useState('1')
    const btnRef = React.useRef();
   
  
    const [
      addRoom, // This is the mutation trigger
      mutationResult,
     // { isLoading: isUpdating }, // This is the destructured mutation result
    ] = usePostNewRoomMutation()

  
    const ProcessRoom = async (aroom) => {
      console.log('adding room ...')
      if (myplayer.isAuthenticated){
        let playerId = myplayer.id
        let name = myplayer.name
        let ip = myplayer.playerip
        let roomName = 'AzariaRoom'
        let fname = aroom
        let roomType = 'public'
        let roomMaxPlayers = 50
            
            try {

                let myResponse = await addRoom({playerId,name,ip,fname,roomName,roomType,roomMaxPlayers})
                let myReservation = myResponse.data;
                console.dir(myReservation);
                await ConsumeReservation(myReservation);
                router.push('/Gameroom')
                    
          
            } catch (e) {
              console.error("join error", e);
            }
              
      }else {
        console.log('player is not authenticated');
        // Statusbar =  <Alert status='error'>
        //                   <AlertIcon />
        //                   <AlertTitle>You Are Not Authenticated</AlertTitle>
        //                   <AlertDescription>Please authenticate using your profile icon in the header bar.</AlertDescription>
        //                 </Alert>
        
        // return(
        //   statusbar
        // )
      }
           
         
    } 

    const handleChange = (event) => setRoomFname(event.target.value)

    return (
      <>
      <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  Add New Room
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
             <VStack
            spacing={4}
            align='stretch'
          >
                  
                  <Input placeholder='friendly name' onChange={handleChange} value={friendlyName} />
                  
                  <RadioGroup onChange={setValue} value={value}>
                      <Stack direction='row'>
                        <Radio value='1'>Private</Radio>
                        <Radio value='2'>Public</Radio>
                      </Stack>
                </RadioGroup>
                <Wrap>
                  <WrapItem>
                    <Center w='300px' h='80px'>
                    </Center>
                  </WrapItem>
                  <WrapItem>
                      <Box display='flex' mt='2' alignItems='center'>
                          <Button colorScheme='blue' onClick={() => ProcessRoom(friendlyName)} >Save</Button>
                      </Box>
                  </WrapItem>
                 
                </Wrap>
                
            </VStack>   
                
                
                
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </>
    )
  }

 // <Button colorScheme='blue' onClick={() => ProcessRoom('AzariaRoom')} >Save</Button>

//  You can create a new room on this server and then share it out for
//               friends to connect to.
         