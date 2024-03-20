

import * as React from 'react'
import { providersApi,useGetRoomsQuery} from '@/services/providers'
import {RoomModal} from './RoomModal'

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  useColorModeValue
} from '@chakra-ui/react'



export default function RoomsList() {

const { data, error, isLoading  } = useGetRoomsQuery("Rooms",{
  pollingInterval: 3000,
})

const RenderRooms = () => {
  if(!isLoading && !error){

   // const myRooms = Object.entries(data.roomsById).map((e) => ( { [e[0]]: e[1] } ));
   const myRooms = Object.entries(data.roomsById).map(e => e[1]);
    

    return(
     
      myRooms && myRooms.map(({roomId,name,maxClients, clients, createdAt, locked}) => {
       
        let p1roomId = roomId.slice(9)
        let p2roomId = roomId.slice(0, 9)
      return <Tr key={roomId} >
        <Td color={useColorModeValue('gray.800', 'gray.300')}>{p1roomId}</Td>
        <Td color={useColorModeValue('gray.800', 'gray.300')}>{p2roomId}</Td>
        <Td color={useColorModeValue('gray.800', 'gray.300')}>{clients}</Td>
        <Td color={useColorModeValue('gray.800', 'gray.300')}><RoomModal roomId = {roomId} name = {p2roomId} clients = {clients} createdAt = {createdAt} locked ={locked}></RoomModal></Td>
        </Tr>
      
        })
      )
   }
  
}


    return (
      <Box maxW='80%' borderWidth='1px' borderRadius='lg' overflowX='auto'>
    <TableContainer>
      <Table variant='striped' colorScheme='blackAlpha'>
      <Thead>
      <Tr m={1}>
        <Th>Name</Th>
        <Th>ID</Th>
        <Th>Current Players</Th>
        <Th>Action</Th>
      </Tr>
    </Thead>
    
     <Tbody>
             {RenderRooms()}
     </Tbody>        
      </Table>
      </TableContainer>
      </Box>     
           
   
     )
   }
   
  //  _roomid = {roomId} _name = {name} _clients = {clients} _createdAt = {createdAt} _locked ={locked}

  // <RoomModal></RoomModal>