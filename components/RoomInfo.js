

import * as React from 'react'
import {
  Tr,
  Td} from '@chakra-ui/react'

import {useGetRoomInfoQuery} from '@/services/providers'


    export default function MyPlayers(myroomid){
      console.log('RoomInfo get', myroomid.myroomid)
        const { data, error, isLoading  } = useGetRoomInfoQuery(myroomid.myroomid,{
          pollingInterval: 6000,
        })
        if(!isLoading && !error){
          const myPlayers = Object.entries(data.state.players).map(e => e[1]);
         // console.log (myPlayers);
          //thought to add key to 
         // const myKeys =  Object.keys(data.state.players);
    
          return(
            myPlayers && myPlayers.map(({session, connected, playerName}) => {
              return <Tr key={session} >
                <Td >{playerName}</Td>
                <Td >{connected}</Td>
                </Tr>
                })
            )
          } 
       }
   
   
  