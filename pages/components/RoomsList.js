

import * as React from 'react'
import { providersApi,useGetRoomsQuery} from '@/services/providers'
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
  Button
} from '@chakra-ui/react'

export default function RoomsList() {

  const { data, error, isLoading  } = useGetRoomsQuery("Rooms");




const renderRooms = () => {
  if(!isLoading){

   // const myRooms = Object.entries(data.roomsById).map((e) => ( { [e[0]]: e[1] } ));
   const myRooms = Object.entries(data.roomsById).map(e => e[1]);
    console.log(myRooms);
    return(
     
      myRooms.map(({roomId,name,maxClients, clients,locked}) => {
      return <tr class="hover:bg-gray-100 dark:hover:bg-gray-700" key={roomId} >
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{roomId}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{name}</td>
        <td class="text-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{maxClients}</td>
        <td class="text-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{clients}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"><Button colorScheme='blue' size='xs'>View</Button></td>
        </tr>
      
        })
      )
   }
  
}


    return (
      <Box maxW='80%' borderWidth='1px' borderRadius='lg' overflow='hidden'>
    <TableContainer>
      <Table variant='striped' colorScheme='grey'>
      <Thead>
      <Tr m={2}>
        <Th>Room Name</Th>
        <Th>Type</Th>
        <Th isNumeric>Max Players</Th>
        <Th isNumeric>Current Players</Th>
        <Th>Action</Th>
      </Tr>
    </Thead>
             {renderRooms()}
      </Table>
      </TableContainer>
      </Box>     
           
   
     )
   }
   
