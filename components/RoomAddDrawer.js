import * as React from 'react'

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    FormControl,
    FormLabel,
    FormHelperText,
    Text,
    Button,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Divider
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
        <Button ref={btnRef} colorScheme='blue' onClick={onOpen}>
          Create Room
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your Room</DrawerHeader>
  
            <DrawerBody>
            <RadioGroup onChange={setValue} value={value}>
              <Stack direction='row'>
                <Radio value='1'>Standard</Radio>
                <Radio value='2'>Private</Radio>
              </Stack>
            </RadioGroup>
            <Divider />
            <Text>
              ..
            </Text>
              <FormControl>
                <FormLabel>Room Name</FormLabel>
                <Input placeholder='Enter Name...' />
                <FormHelperText></FormHelperText>
              </FormControl>
              
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue' onClick={() => ProcessRoom('AzariaRoom')} >Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

