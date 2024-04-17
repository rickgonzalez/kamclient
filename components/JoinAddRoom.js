import {usePostJoinRoomMutation} from '@/services/providers'
import {usePostNewRoomMutation} from '@/services/providers'
import {  Button,Spinner } from '@chakra-ui/react'
import React, {useEffect, useState} from "react";
import {useSelector,useDispatch} from 'react-redux'

import { useRouter } from 'next/router'
import * as Colyseus from "colyseus.js"; 
import { SET_RESERVATION } from '@/services/reducers/reservationSlice';

var client = new Colyseus.Client('wss://localhost:2567'); 




export default function JoinRoom(myroomid, fname) {
    const [joinRoom,JoinmutationResult] = usePostJoinRoomMutation();
    const [addRoom, addMutationResult] = usePostNewRoomMutation();
    const [ARoom, setActiveRoom] = useState({});
    const [timestamp, setTimestamp] = useState(new Date().getTime());
    const dispatch = useDispatch();
    const myplayer = useSelector((state) => state.player);
    const router = useRouter();

    var myReservation = new Colyseus.Room;

        const joined = async function(myroomid){

            if (myplayer.isAuthenticated){  
                let mybody = new Object();
                mybody.playerId = myplayer.id;
                mybody.name = myplayer.playername;
                mybody.ip = myplayer.playerip;
                mybody.roomId = myroomid.myroomid;
                mybody.fname = myroomid.fname;
                

                console.log('looking to join room ', mybody)
               
                try {

                    console.log('...',myroomid);
                    if(mybody.roomId == 'new'){
                      await addRoom(JSON.stringify(mybody)).then(addMutationResult => {
                        myReservation = addMutationResult.data
                       
                      });
                      
                        
                      }else{
                        
                        await joinRoom(mybody).then(JoinmutationResult => {
                            myReservation = JoinmutationResult.data
                            console.log('myReservation1',myReservation);
                          });
                      }
             
                      if(myReservation){
                        console.log('myReservation2',myReservation);
                        dispatch(SET_RESERVATION({
                            clients: 0,
                            locked: false,
                            private: false,
                            maxClients: 50,
                            unlisted: false,
                            createdAt: myReservation.room.createdAt,
                            name: 'AzariaRoom',
                            processId: myReservation.room.processId,
                            publicAddress: 'us-atl-3b185468.colyseus.cloud',
                            roomId: myReservation.room.roomId,
                            sessionId: myReservation.sessionId
                        }));
                      }
                       
               
                            router.push('/Gameroom');
                             
                 
                } catch (e) {
                    console.error("join error", e);
                }

            }else {
                    console.log('player is not authenticated');
                }    
        }

   


            function handleCloseModal(){
                document.getElementById("myModal").classList.remove("show");
            }
                
      
       
           return (
            <Button onClick={() => joined(myroomid)} >Join</Button>
           )
       
        }

   
