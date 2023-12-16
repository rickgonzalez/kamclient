import {usePostJoinRoomMutation} from '@/services/providers'
import {usePostNewRoomMutation} from '@/services/providers'
import {  Button,Spinner } from '@chakra-ui/react'
import React, {useEffect, useState} from "react";
import {useSelector,useDispatch} from 'react-redux'
import {SET_ACTIVEROOM} from '../services/reducers/roomSlice'
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
                mybody.name = myplayer.name;
                mybody.ip = myplayer.playerip;
                mybody.roomId = myroomid.myroomid;
                mybody.fname = myroomid.fName

                console.log('looking to join room ', mybody)
               
                try {
                    if(myroomid = 'new'){
                      await addRoom(JSON.stringify(mybody)).then(addMutationResult => {
                        myReservation = addMutationResult.data
                       
                      });
                      
                        
                      }else{
                        await joinRoom(JSON.stringify(mybody)).then(JoinmutationResult => {
                            myReservation = JoinmutationResult.data
                          
                          });
                      }
             
                      if(myReservation){
                        dispatch(SET_RESERVATION({
                            clients: 0,
                            locked: false,
                            private: false,
                            maxClients: 50,
                            unlisted: false,
                            createdAt: myReservation.createdAt,
                            name: 'AzariaRoom',
                            processId: myReservation.processId,
                            publicAddress: 'us-atl-3b185468.colyseus.cloud',
                            roomId: myReservation.roomId,
                            sessionId: myReservation.sessionId
                        }));
                      }
                       
               
                            router.push('/Gameroom?reservation ='+ JSON.stringify(myReservation));
                             
                 
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
            <Button colorScheme='blue' variant='ghost' onClick={() => joined(myroomid)} >Launch</Button>
           )
       
        }

   
