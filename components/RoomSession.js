

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
  import {useGetRoomInfoQuery} from '@/services/providers'
  import JoinRoom from './JoinAddRoom'



 
  
 export function RoomModal({roomId, name, clients, createdAt, locked}) {
//can use props here instead and just go props.roomId...





  const MyPlayers = function(myroom){
    const { data, error, isLoading  } = useGetRoomInfoQuery(myroom)
    if(!isLoading && !error){
      const myPlayers = Object.entries(data.state.players).map(e => e[1]);
     // console.log (myPlayers);
      //thought to add key to 
     // const myKeys =  Object.keys(data.state.players);

      return(
        myPlayers && myPlayers.map(({session, connected, playerName, playerIp}) => {
          return <Tr  key={session} >
            <Td >{playerName}</Td>
            <Td >{playerIp}</Td>
            <Td >{connected}</Td>
            </Tr>
            })
        )
      } 
   }


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
                </Tr>
              </Thead>
              <Tbody>
              {MyPlayers(roomId)}
              </Tbody>
            </Table>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <JoinRoom myroomid = {roomId} fname={roomId.slice(9)}></JoinRoom>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

 // roomId, name, clients, createdAt, locked