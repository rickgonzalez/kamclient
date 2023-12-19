

import KamNavBar from '../components/Navbar';
import { useSearchParams } from 'next/navigation';

import {
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  Textarea,
  Text,
  Input,
  IconButton,
  Wrap,
  WrapItem,
  OrderedList,
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


import { LuMegaphone } from "react-icons/lu";

import { ChevronRightIcon } from '@chakra-ui/icons';
import React, { useState,useEffect,useRef } from 'react';
import {useSelector,useDispatch} from 'react-redux';

import {SET_ACTIVEROOM} from '../services/reducers/roomSlice'

import * as Colyseus from "colyseus.js"; 


import MyPlayers from '../components/RoomInfo'

var client = new Colyseus.Client('wss://localhost:2567');

//var myReservation = new Colyseus.Room(AzariaRoom:any);
//import { Connection, roomsBySessionId, messageTypesByRoom } from "../components/utils/Types"

interface reservation {
  room:{
    clients: number,
    locked: boolean,
    private: boolean,
    maxClients: number,
    unlisted: boolean,
    createdAt: string,
    name: string,
    processId: string,
    publicAddress: string,
    roomId: string,
}, sessionId: string
} 

interface messageProperties {
  message: string;
}

export default function Gameroom(){

const searchParams = useSearchParams();
const myActiveRoom = useSelector((state: any) => state.activeRoom);
const myplayer = useSelector((state: any) => state.player);

const [userMessage, setUserMessage] = useState(''); 
const [messageitems, setmessageItems] = useState<messageProperties[]>([]);
const [currentMessage, setCurrentMessage] = useState('');
const [currentPost, setCurrentPost] = useState('New Post');



const dispatch = useDispatch();
const myPassedRoom = useSelector((state: any) => state.room);
const ActiveRoomRef = useRef({});

var messagesText = 'You have joined the room'
var messageArray: string[] = [messagesText];
const messagesRef = useRef(new Array())

const [ReservationProcessed, setReservationProcessed] = useState(false)

const [word, setWord] = useState<string>('')

const scrollRef = useRef(null);


let ActiveRoom: Colyseus.Room

                    useEffect(() => {
                    
                      let myReservation : reservation = {
                        room:{
                          clients: myPassedRoom.clients,
                          locked: false,
                          private: false,
                          maxClients: 50,
                          unlisted: false,
                          createdAt: myPassedRoom.createdAt,
                          name: 'AzariaRoom',
                          processId: myPassedRoom.processId,
                          publicAddress: myPassedRoom.publicAddress,
                          roomId: myPassedRoom.roomId,
                        },
                        sessionId: myPassedRoom.sessionId
                      };
                      if(!ReservationProcessed){
                              console.log('reservation: ', myReservation);
                              const procReservation = async () => {
                            
                              try {
                                ActiveRoom = await client.consumeSeatReservation(myReservation);
                                console.log("joined successfully", ActiveRoom);
                                setReservationProcessed(true);
                                ActiveRoomRef.current = ActiveRoom
                                dispatch(SET_ACTIVEROOM({
                                  roomid: ActiveRoom.roomId,
                                  friendly: ActiveRoom.roomId.slice(9),
                                  reconnectToken: ActiveRoom.reconnectionToken, 
                                  roomtype: ActiveRoom.name,
                                  sessionid: ActiveRoom.sessionId,
                                  private: false
                                  }));
                                      ActiveRoom.onStateChange.once(function(state) {
                                          console.log("initial room state:", state);
                                          console.log(state.players);
                                          console.log(state.roomdetail);
                                      });
                                                              // new room state
                                      ActiveRoom.onStateChange(function(state) {
                                        // this signal is triggered on each patch
                                      
                                      });
                    
                                      // listen to patches coming from the server
                                      //onMessage --- for this room, update the value of the text box messagesVal
                                      ActiveRoom.onMessage("messages", (message) => {
                                      console.log(message); 
                                          if(message.hasOwnProperty('message')){
                                          // messagesText = messagesText + message.message
                                          messageArray.push(message.message);
                                          setCurrentMessage(message.message);
                                          }else{
                                            console.log('executing')
                                            messageArray.push(message);
                                            setCurrentMessage(message);
                                          }
                                      messagesRef.current = messageArray;
                                      setmessageItems( messagesRef.current);
                                      });
                                      const PostCurrentPost  = () => {
                                        if(currentPost){
                                          console.log('sending...', currentPost);
                                          ActiveRoom.send("message", currentPost);
                                        }
                                      } 
                                      PostCurrentPost();
                                      
                              } catch (e) {
                                console.error("join error", e);
                              }
                             
                            }
                              
                            procReservation();
  
                      }
                      
                     
                    }, [messagesText,userMessage,messageArray, messageitems, messagesRef.current,setmessageItems,setUserMessage,currentMessage,currentPost,setCurrentPost]);


const MessageList  = () => {
    if(currentMessage){
      messagesRef.current
      setWord('');
      const listItems = messagesRef.current.map(message => <ListItem><ListIcon as={LuMegaphone} color='green.500' />{message}</ListItem>);
        return <List>{listItems}</List>;
    }
}           
  
const PostPost  = (post:string) => {
  console.log('setting Current Post ', post);
  setCurrentPost(post);
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

   const messageUpdate = () => {
    return (
      <>...</>
    )
  }

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setCurrentPost(event.target.value)


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

          <Container overflow={'auto'} maxH={300} maxW='2xl' border='1px' borderColor='gray.200' >
             <Flex color='white'>
                < Box flex='2' >
                <Input color={'black'} mt={4} placeholder='Post' defaultValue={currentPost} />
                </Box>
                < Box flex='1' >
                <IconButton
                  m={4}
                  variant='outline'
                  colorScheme='teal'
                  aria-label='Send Room Post'
                  icon={<ChevronRightIcon/>}
                  onClick={() => PostPost(currentPost)}
                />
                </Box>
              </Flex>
            </Container>     
               
           
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



