

import KamNavBar from '../components/Navbar';
import RoomAddDrawer from '../components/RoomAddDrawer';

import {
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'

import React, { useState } from 'react'

export const Gameheader = () => {
  // const { data: posts } = useGetPostsQuery()
 
  // if (!posts) return null
 
   return (
     <Stat>
       <StatLabel>This Game</StatLabel>
       <StatNumber>Wha</StatNumber>
     </Stat>
   )
 }

export default function Gameroom() {
  const [count, setCount] = useState(0);

 return (
  
    <Box>
      <KamNavBar currentPage = "Gameroom"></KamNavBar>
      <Flex bg="#011627" p={4} color="white">
        <Box>
          <Heading size="xl">Gameroom</Heading>
        </Box>
        <Spacer />
        <Box>
          <Gameheader />
        </Box>
      </Flex>


      <Divider />


      <p>section</p>
      <Divider />

      <Flex wrap="wrap">
          <Box flex={4} borderRight="1px solid #eee">
         
        </Box>
       
        <Box flex={2} m={4} >
          <Box p={4} borderBottom="1px solid #eee">
              <Heading size="sm">Stats</Heading>
            </Box>
           
            

            <Box p={4} borderBottom="1px solid #eee">
                <Heading size="sm">Players</Heading>
              </Box>
            <Box p={1}>
        
            </Box>
        </Box>
        
      </Flex>
    </Box>



  )
}



