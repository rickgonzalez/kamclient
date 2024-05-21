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

//Authentication Imports
import type { InferGetServerSidePropsType} from 'next'
import { authOptions } from "../pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import PlayerAuthCheck from '../components/Player/PlayerAuthCheck'


//---------------------------------
// getServerSideProps needs to be a part of each session protected page
// in order to get the session properties and authentication from the session
// callback from [...nextauth].ts

export async function getServerSideProps(context: any) {
  
  const session = await getServerSession(context.req, context.res, authOptions)
  var localplayer:any;

        if (!session) {
          console.log('No sesseion');
          return {
            redirect: {
              destination: "",
              permanent: false,
            },
          }
        }
       // console.log('session is',session)
        localplayer = session;
        return {
          props: {
            user: localplayer.user,
            userid: localplayer.id,
            isAuthenticated: localplayer.isAuthenticated,
            stripeid: localplayer.stripeid
          },
        }
}




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


 

 export default function Lobby({
  //these are the props from getServerSideProps
  user, userid, isAuthenticated, stripeid
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

 return (
  
    <Box bg={useColorModeValue('gray.300', 'black')}>
      <KamNavBar currentPage="Lobby"></KamNavBar>
     
      <Flex bg={useColorModeValue('gray.400', 'gray.800')} p={4} color="white">
        <Box>
          <Heading color={useColorModeValue('gray.800', 'gray.300')} size="xl">Azaria Lobby</Heading>
        </Box>
        <Spacer />
        <Box>
          <PostsCountStat />
        </Box>
      </Flex>
      <PlayerAuthCheck user = {user} userid = {userid} isAuthenticated = {isAuthenticated} stripeid = {stripeid}></PlayerAuthCheck>


      

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



