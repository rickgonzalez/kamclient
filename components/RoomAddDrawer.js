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
    Divider,
    Spacer
  } from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'

import {usePostNewRoomMutation} from '@/services/providers'



export default function RoomAddDrawer() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [value, setValue] = React.useState('1')
    const [addRoom, result] = usePostNewRoomMutation()


   async function  ProcessRoom({aroom}) {
           //In here get the data and then pass to addRoom
            let playerId = '88b098defB751B7401B5f6d8976F'
            let playerName = 'Pete'
            let playerIp = '10.10.0.0.9'
            let roomName = aroom
            let roomType = 'public'
            let roomMaxPlayers = 50
          
          let myresult = addRoom({playerId, playerName, playerIp,roomName,roomType,roomMaxPlayers})
          console.dir('this is myresult -->',myresult)
          console.log('here is a result >>',result);   
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
                <FormHelperText>We'll say something now. We need to cover Locked/private, </FormHelperText>
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

//onClick={ProcessRoom('AzariaRoom')}
 // processRoom(roomName)
  //  const [
  //       addRoom, // This is the mutation trigger
  //       { isLoading: isUpdating }, // This is the destructured mutation result
  //     ] = usePostNewRoomMutation()