

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
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'
  import {useGetRoomInfoQuery} from '@/services/providers'
 
export function RoomModal(props) {
 
  const MyPlayers = function(myroom){
    const { data, error, isLoading  } = useGetRoomInfoQuery(myroom)
    if(!isLoading && !error){
      const myPlayers = Object.entries(data.state.players).map(e => e[1]);
    //thought to add key to 
     // const myKeys =  Object.keys(data.state.players);

      return(
        myPlayers && myPlayers.map(({session, connected, name, ip}) => {
          return <Tr  key={session} >
            <Td >{name}</Td>
            <Td >{ip}</Td>
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
            <ModalHeader>Room {props._roomid}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <p>Room Type: {props._name}</p>
            <p>Number of clinets: {props._clients}</p>
            <p>Created: {props._createdAt}</p>
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
              {MyPlayers(props._roomid)}
              </Tbody>
            </Table>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Launch</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

