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

import { useRouter } from 'next/router'

import * as Colyseus from "colyseus.js"; 
import JoinRoom from './JoinAddRoom'

var client = new Colyseus.Client('wss://localhost:2567'); 



export default function RoomAddDrawer() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter();
    const myplayer = useSelector((state) => state.player);
 

   //const [roomName, setRoomName] = React.useState('AzariaRoom');
    const [friendlyName, setRoomFname] = React.useState('');
    const [value, setValue] = React.useState('1')
    const btnRef = React.useRef();
   
  
   
  
    // const ProcessRoom = async (aroom) => {
    //   console.log('adding room ...')
    //     if (myplayer.isAuthenticated){
    //           try {
    //             router.push('/Gameroom?id='+ 'null' + '&jointype=new' + '&fname='+ aroom);
    //           } catch (e) {
    //             console.error("join error", e);
    //           }
    //     }else {
    //       console.log('player is not authenticated');
    //     }
    //  } 

    const handleChange = (event) => setRoomFname(event.target.value)

    return (
      <>
      <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box color={'white'} as="span" flex='1' textAlign='left'>
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
                      <Stack color={'white'} direction='row'>
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
                          {/* <Button colorScheme='blue' onClick={() => ProcessRoom(friendlyName)} >Join</Button> */}
                          <JoinRoom myroomid ='new' fname={ friendlyName }></JoinRoom>
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

