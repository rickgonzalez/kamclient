import {usePostJoinRoomMutation} from '@/services/providers'
import {  Button,Spinner } from '@chakra-ui/react'
import React, {useEffect, useState} from "react";

export default function JoinRoom(myroomid) {
    const [joinRoom,mutationResult] = usePostJoinRoomMutation()

            const joined = async function(myroomid){
                let mybody = new Object();
                mybody.playerId = '88b098defB751B7401B5f6d8976F';
                mybody.playerName = 'Pete';
                mybody.playerIp = '10.10.0.0.9';
                mybody.roomId = myroomid.myroomid

                console.log('looking to join room ', myroomid)
                let myreturn = joinRoom(mybody,myroomid);
               
                //console.dir(myreturn);
                //const { data, error } = usePromise(joinRoom(mybody,myroomid));
               
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

   

  
        