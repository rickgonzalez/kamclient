// 'use client'
import NetworkList from '../components/NetworkList';
import RoomsList from '../components/RoomsList';
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

export const PostsCountStat = () => {
  // const { data: posts } = useGetPostsQuery()
 
  // if (!posts) return null
 
   return (
     <Stat>
       <StatLabel>Active Games</StatLabel>
       <StatNumber>3000</StatNumber>
     </Stat>
   )
 }



export default function Lobby() {
  const [count, setCount] = useState(0);


 

 return (
  
    <Box>
      <KamNavBar currentPage = "Lobby"></KamNavBar>
      <Flex bg="#011627" p={4} color="white">
        <Box>
          <Heading size="xl">Azaria Lobby</Heading>
        </Box>
        <Spacer />
        <Box>
          <PostsCountStat />
        </Box>
      </Flex>


      <Divider />


      <p>section</p>
      <Divider />

      <Flex wrap="wrap">
        <Box flex={1} borderRight="1px solid #eee">
          <Box p={4} borderBottom="1px solid #eee">
            <Heading size="sm">Active Game Networks</Heading>
          </Box>
          <Box p={4}>
          <NetworkList></NetworkList>
          </Box>
          <Box p={4} borderBottom="1px solid #eee">
            <Heading size="sm">Selected Network</Heading>
          </Box>
          <Box p={4}>
         <RoomAddDrawer></RoomAddDrawer>
          </Box>
        </Box>
       
       <Box m={4} flex={2}>
        <RoomsList></RoomsList>
        </Box>
        
      </Flex>
    </Box>



  )
}



