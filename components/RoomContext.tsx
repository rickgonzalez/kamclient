import React, { createContext, useContext, useEffect, useState,useRef } from 'react';
import { Client, Room } from "colyseus.js";
import {useSelector,useDispatch} from 'react-redux';
import {SET_ACTIVEROOM} from '../services/reducers/roomSlice'
import {newMessage, RoomContextType, messageProperties, reservation} from '../components/utils/types'

// type: 'messages', message: payload, out: true, now,

  

export const RoomContext = createContext<RoomContextType>({
  myroom: null,
  send:() => { }
});

export function useRoom() {
  return useContext(RoomContext);
}


export function RoomProvider({ children }: { children: React.ReactNode }) {
    const myPassedRoom = useSelector((state: any) => state.room);
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageitems, setmessageItems] = useState<messageProperties[]>([]);
    const messagesRef = useRef(new Array())
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

      console.log('reservation being consumed: -->', myReservation)   

           var temproom = Room.prototype
            
            const RoomProcessor = async () => { 
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
                            
                        setRoom(temproom);
                        
                            
                        } catch (e) {
                            console.error("join error", e);
                        }
            }  
            
            RoomProcessor();
         



    return (
      <RoomContext.Provider value={{myroom,send(_message) {},}}>
        {children}
      </RoomContext.Provider>
    );
  }



//   useEffect(() => {
//     // RoomProcessor();
    
                
     
//      const RoomProcessor = async () => { 
//          try { 
//                      const room = await client.consumeSeatReservation(myReservation);
//                      console.log("joined successfully", room);
//                      var messagesText = 'You have joined the room'
//                      var messageArray: string[] = [messagesText];
                     
//                      dispatch(SET_ACTIVEROOM({
//                      roomid: room.roomId,
//                      friendly: room.roomId.slice(9),
//                      reconnectToken: room.reconnectionToken, 
//                      roomtype: room.name,
//                      sessionid: room.sessionId,
//                      private: false
//                      }));
             
                     
//                      room.onStateChange.once(function(state) {
//                          console.log("initial room state:", state);
                         
//                      });
//                                              // new room state
//                      room.onStateChange(function(state) {
//                          // this signal is triggered on each patch
//                          console.log('new State came -->',state)
                     
//                      });
             
//                      // listen to patches coming from the server
//                      //onMessage --- for this room, update the value of the text box messagesVal
//                      room.onMessage("messages", (message) => {
//                      console.log(message); 
//                          if(message.hasOwnProperty('message')){
//                              // messagesText = messagesText + message.message
//                              messageArray.push(message.message);
//                              setCurrentMessage(message.message);
//                          }else{
//                              console.log('executing')
//                              messageArray.push(message);
//                              setCurrentMessage(message);
//                          }
//                      messagesRef.current = messageArray;
//                      setmessageItems( messagesRef.current);
//                      });
                     
//                  setRoom(room || null);
//                  console.log('myroom',myroom);
                     
//                  } catch (e) {
//                      console.error("join error", e);
//                  }
//      }  
     
//      RoomProcessor();
//      }, []);