

import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Divider,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'
  import JoinRoom from './JoinAddRoom'
  import MyPlayers from './RoomInfo'



 
  
 export function RoomModal({roomId, name, clients, createdAt, locked}) {
//can use props here instead and just go props.roomId...







    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen}>View</Button>
  
        <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset='slideInBottom' scrollBehavior='inside'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Room {roomId}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <p>Room Type: {name}</p>
            <p>Number of clinets: {clients}</p>
            <p>Created: {createdAt}</p>
            <Divider />
           {/* <PlayerList ></PlayerList> */}
            </ModalBody>
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th>Players</Th>
                  <Th>IP Address</Th>
                </Tr>
              </Thead>
              <Tbody>
              <MyPlayers myroomid ={roomId}></MyPlayers>
              </Tbody>
            </Table>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <JoinRoom myroomid = {roomId} fname={roomId}></JoinRoom>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

 // roomId, name, clients, createdAt, locked