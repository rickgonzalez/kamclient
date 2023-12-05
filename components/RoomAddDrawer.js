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
  VStack
  } from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'

import {usePostNewRoomMutation} from '@/services/providers'



export default function RoomAddDrawer() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [value, setValue] = React.useState('1')
  
    const [
      addRoom, // This is the mutation trigger
      mutationResult,
     // { isLoading: isUpdating }, // This is the destructured mutation result
    ] = usePostNewRoomMutation()

  
    const ProcessRoom = async (aroom) => {
           //In here get the data and then pass to addRoom
            let mybody = new Object();
                mybody.playerId
            let playerId = '88b098defB751B7401B5f6d8976F'
            let playerName = 'Pete'
            let playerIp = '10.10.0.0.9'
            let roomName = aroom
            let roomType = 'public'
            let roomMaxPlayers = 50
         
            await addRoom({playerId, playerName, playerIp,roomName,roomType,roomMaxPlayers})
           
              if(mutationResult.status = 'fulfilled' && mutationResult.isSuccess){
                  console.log(JSON.parse(JSON.stringify(mutationResult)))
                  //create a post process call with the session and roomId to accept the reservation
              }
            
    } 

      

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
                  
                  <Input placeholder='friendly name' />
                  
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
                          <Button colorScheme='blue' onClick={() => ProcessRoom('AzariaRoom')} >Save</Button>
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
         