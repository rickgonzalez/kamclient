import React, { createContext, useContext, useEffect, useState} from 'react';
import { Client, Room } from "colyseus.js";
import {useSelector,useDispatch} from 'react-redux';
import {SET_ACTIVEROOM} from '../../services/reducers/roomSlice'
//import { RoomContextType, reservation} from '../components/utils/Types'
import * as Colyseus from "colyseus.js"; 


// type: 'messages', message: payload, out: true, now,
interface RoomContextType {
  myroom: Colyseus.Room | null;    //may need to add function for sending too!
  messages: string[]| null;
}
  
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

export const RoomContext = createContext<RoomContextType>({
  myroom: null,
  messages:[''],
 
});

export function useRoom() {
  return useContext(RoomContext);
}




export function RoomProvider({ children }: { children: React.ReactNode }) {
    const myPassedRoom = useSelector((state: any) => state.room);
    const [currentMessage, setCurrentMessage] = useState('');
   // const [messageitems, setmessageItems] = useState<string[]>(['test']);
    const [messages, setMessages] = useState<string[]>([]);

 
    const dispatch = useDispatch();
    var client = new Client('wss://localhost:2567');
    const [myroom, setRoom] = useState<Room | null>(null);
   
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

      var temproom = Room.prototype
      useEffect(() => {
        console.log('inside useEffect Now')   
    
    const RoomProcessor = async () => {
        console.log('reservation being consumed: -->', myReservation)   

        try { 
            temproom = await client.consumeSeatReservation(myReservation);
             console.log("joined successfully", temproom);
             var messagesText = 'You have joined the room'
             var messageArray: string[] = [messagesText];
             
             dispatch(SET_ACTIVEROOM({
             roomid: temproom.roomId,
             friendly: temproom.roomId.slice(9),
             reconnectToken: temproom.reconnectionToken, 
             roomtype: temproom.name,
             sessionid: temproom.sessionId,
             private: false
             }));

              temproom.onStateChange.once(function(state) {
                 console.log("initial temproomstate:", state);
                 
             });
                                     // new temproomstate
             temproom.onStateChange(function(state) {
                 // this signal is triggered on each patch
                 console.log('new State came -->',state)
             });
     
             // listen to patches coming from the server
             //onMessage --- for this room, update the value of the text box messagesVal
             temproom.onMessage("messages", (message) => {
             console.dir(message); 
                 if(message.hasOwnProperty('message')){
                     // messagesText = messagesText + message.message
                     setCurrentMessage(message.message);
                     setMessages(prevItems => [...prevItems, message.message]);
                  
                 }else{
                     setCurrentMessage(message);
                     setMessages(prevItems => [...prevItems, message]);
                 }
             });
            
             temproom.onMessage("chat", (message) => {
              console.dir(message); 
                      setCurrentMessage(message);
                      setMessages(prevItems => [...prevItems, message]);
                  
              });
        
         } catch (e) {console.error("join error", e);}
         setRoom(temproom);
       
         
        }
        RoomProcessor()
        .catch(console.error);;
     }, []);
     
    return (
      <RoomContext.Provider value={{myroom, messages}}>
        {children}
      </RoomContext.Provider>
    );
  }


