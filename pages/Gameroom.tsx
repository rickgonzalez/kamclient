

import KamNavBar from '../components/Navbar';
import {
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  ListItem,
  List,
  Container,
  ListIcon,
  Icon,
  Table,
  Tbody,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { RoomPoster } from '@/components/RoomMessagePoster';
import { LuMegaphone } from "react-icons/lu";
import React, {useState,useEffect,useRef, useContext } from 'react';
import {useSelector} from 'react-redux';

import MyPlayers from '../components/RoomInfo'
import { RoomContext, useRoom } from '@/components/RoomContext';


export default function Gameroom(){
    const myPassedRoom = useSelector((state: any) => state.room);
    console.log('now calling useRoom')
    const {myroom, send} = useContext(RoomContext);
    console.log('room from context',myroom);

   

    // used to force update state
    const [word, setWord] = useState<string>('')
    const scrollRef = useRef(null);
    //used for processing inbound message
    const [currentMessage, setCurrentMessage] = useState('');
    const messagesRef = useRef(new Array())


const MessageList  = () => {
    if(currentMessage){
      messagesRef.current
      setWord('');
      const listItems = messagesRef.current.map(message => <ListItem><ListIcon as={LuMegaphone} color='green.500' />{message}</ListItem>);
        return <List>{listItems}</List>;
    }
}           
  


//================>
  const Gameheader = () => {
     return (
       <Stat m={4} p={4}>
         <StatNumber>{myPassedRoom.roomId}</StatNumber>
         <StatLabel>{myPassedRoom.sessionId}</StatLabel>
       </Stat>
     )
   }


 return (
  
    <Box>
     

      <KamNavBar currentPage = "Gameroom"></KamNavBar>
      <Flex bg="#011627" p={4} color="white">
        <Box>
          <Heading size="xl" m={4}>{(myPassedRoom.roomId).slice(9)}</Heading>
        </Box>
        <Spacer />
        <Box>
          <Gameheader />
        </Box>
      </Flex>
      <Divider />
      
      <Divider />
      <Flex wrap="wrap">
          <Box p={4} m={4} flex={4} borderRight="1px solid #eee">
          
          <Container overflow={'auto'} ref={scrollRef} maxH={200} maxW='2xl' border='1px' borderColor='gray.200' >
              <MessageList></MessageList>
          </Container>   

            <RoomPoster></RoomPoster>
               
           
          </Box>
       
        <Box flex={2} m={4} >
          <Box p={4} borderBottom="1px solid #eee">
              <Heading size="sm">Stats</Heading>
            </Box>
            <Box p={4} borderBottom="1px solid #eee">
                <Heading size="sm">Players</Heading>
                <Table size='md'>
              <Thead>
                <Tr>
                  <Th>Players</Th>
                  <Th>IP Address</Th>
                </Tr>
              </Thead>
              <Tbody>
              <MyPlayers myroomid ={myPassedRoom.roomId}></MyPlayers>
              </Tbody>
            </Table>
               
            </Box>
            
            <Box p={1}>
        
            </Box>
        </Box>
        
      </Flex>
     
    </Box>



  )
}



//messagesText,userMessage,messageArray, messageitems, messagesRef.current,setmessageItems,setUserMessage,currentMessage,currentPost,setCurrentPost