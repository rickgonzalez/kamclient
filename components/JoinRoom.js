import {usePostJoinRoomMutation} from '@/services/providers'
import {  Button,Spinner } from '@chakra-ui/react'
import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux'
import { useRouter } from 'next/router'

import * as Colyseus from "colyseus.js"; 

var client = new Colyseus.Client('ws://localhost:2567'); 

export async function ConsumeReservation(reservation){
    try {
      const room = await client.consumeSeatReservation(reservation);
      console.log("joined successfully", room);
    
    } catch (e) {
      console.error("join error", e);
    }
  }


export default function JoinRoom(myroomid) {
    const [joinRoom,mutationResult] = usePostJoinRoomMutation();
    const myplayer = useSelector((state) => state.player);
    const router = useRouter();

        const joined = async function(myroomid){

            if (myplayer.isAuthenticated){  
                let mybody = new Object();
                mybody.playerId = myplayer.id;
                mybody.name = myplayer.name;
                mybody.ip = myplayer.playerip;
                mybody.roomId = myroomid.myroomid

                console.log('looking to join room ', myroomid)
               
                try {
                    let myResponse = await joinRoom(mybody,myroomid);
                    let myReservation = myResponse.data;
                console.dir(myReservation);
                await ConsumeReservation(myReservation);
                router.push('/Gameroom?id='+ {myroomid})
                 
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
                
       //if(mutationResult.status != 'fulfilled' && !mutationResult.isSuccess ){
        //    console.log(JSON.parse(JSON.stringify(mutationResult)))
           //create a post process call with the session and roomId to accept the reservation
       
           return (
            <Button variant='ghost' onClick={() => joined(myroomid)} >Launch</Button>
           )
        // }else{

        //     return (
        //         <Spinner
        //         thickness='4px'
        //         speed='0.65s'
        //         emptyColor='gray.200'
        //         color='blue.500'
        //         size='xl'
        //       />
        //          )
        
        }

   

  
        // if (myplayer.isAuthenticated){
        //     let playerId = myplayer.id
        //     let name = myplayer.name
        //     let ip = myplayer.playerip
        //     let roomName = 'AzariaRoom'
        //     let fname = aroom
        //     let roomType = 'public'
        //     let roomMaxPlayers = 50
                
        //         try {
    
        //             let myResponse = await addRoom({playerId,name,ip,fname,roomName,roomType,roomMaxPlayers})
        //             let myReservation = myResponse.data;
        //             console.dir(myReservation);
        //             await ConsumeReservation(myReservation);
    
        //                   //-----> I think when we create a new room and swallow the reservation,
        //                   // we should then go immediately to the room view!
              
        //         } catch (e) {
        //           console.error("join error", e);
        //         }
                  
        //   }else {
        //     console.log('player is not authenticated');
        //     // Statusbar =  <Alert status='error'>
        //     //                   <AlertIcon />
        //     //                   <AlertTitle>You Are Not Authenticated</AlertTitle>
        //     //                   <AlertDescription>Please authenticate using your profile icon in the header bar.</AlertDescription>
        //     //                 </Alert>
            
        //     // return(
        //     //   statusbar
        //     // )
        //   }