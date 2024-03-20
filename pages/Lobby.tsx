// 'use client'
import NetworkList from '../components/NetworkList';
import RoomsList from '../components/RoomsList';
import KamNavBar from '../components/NaviBar';
import RoomAddDrawer from '../components/RoomAddDrawer';
import{Footer} from '../components/Footer';


import {
  Alert,
  AlertIcon,
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';



//const myplayer = useSelector((state: any) => state.player);



export const PostsCountStat = () => {
  // const { data: posts } = useGetPostsQuery()
 
  // if (!posts) return null
 
   return (
     <Stat>
       <StatLabel color={useColorModeValue('gray.800', 'gray.300')} >Active Games</StatLabel>
       <StatNumber></StatNumber>
     </Stat>
   )
 }


 export function AuthError(){
 
  const myplayer = useSelector((state: any) => state.player);
  if(!myplayer.isAuthenticated){
    return (
      <Alert status='warning'>
        <AlertIcon />
            You are not currently logged in. Please click on the round icon from the navigation menu.
      </Alert>
    )
  }else{
    return (
      <></>
    )
  }
 }


export default function Lobby() {
  const [count, setCount] = useState(0);
 


 

 return (
  
    <Box bg={useColorModeValue('gray.300', 'black')}>
      <KamNavBar currentPage="Lobby" children={undefined}></KamNavBar>
      <Flex bg={useColorModeValue('gray.400', 'gray.800')} p={4} color="white">
        <Box>
          <Heading color={useColorModeValue('gray.800', 'gray.300')} size="xl">Azaria Lobby</Heading>
        </Box>
        <Spacer />
        <Box>
          <PostsCountStat />
        </Box>
      </Flex>
   
      <AuthError></AuthError>
      

      <Flex bg={useColorModeValue('gray.350', 'black')} wrap="wrap">
        <Box flex={1} borderRight="1px solid #eee">
          <Box p={4} borderBottom="1px solid #eee">
            <Heading color={useColorModeValue('gray.800', 'gray.300')} size="sm">Active Game Networks</Heading>
          </Box>
          <Box p={4}>
          <NetworkList></NetworkList>
          </Box>
          <Box p={4} borderBottom="1px solid #eee">
            <Heading color={useColorModeValue('gray.800', 'gray.300')} size="sm">Selected Network: Kamserver Development</Heading>
          </Box>
          <Box p={4}>
         <RoomAddDrawer></RoomAddDrawer>
          </Box>
        </Box>
       
       <Box bg={useColorModeValue('gray.300', 'black')} m={['2','8','12']} flex={2}>
        
        <RoomsList></RoomsList>
        </Box>
        
      </Flex>
      <Footer></Footer>
    </Box>



  )
}



