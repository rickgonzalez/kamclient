
import { Client, Room } from "colyseus.js";

import { Box, Container, Flex, IconButton, Input, Textarea, border, color } from '@chakra-ui/react'

import { ChevronRightIcon } from "@chakra-ui/icons";
import React, { useState,useEffect,useRef } from 'react';
import { useRoom } from '@/components/RoomContext';


export function RoomPoster() {
  
  const room = useRoom();
  const [value, setValue] = React.useState('')

  // const [state, setState] = useState(room.state && room.state.toJSON());
  // const hasState = (room.state !== null);

  const sendMessage = (mymessage: any) => {
		try {
			// const now = new Date();
			// //const payload = JSON.parse(mymessage || "{}");
      // let mymessageobj = new Object();
      // mymessageobj = {
      //   'message': mymessage
      // }

      // const payload = JSON.stringify(mymessageobj);
			// const newMessage = { type: 'messages', message: payload, out: true, now, };

      // console.log(payload);
      //room.myroom?.send(JSON.parse(JSON.stringify(payload)));
       
      room.myroom?.send("messages", { message: mymessage})


     //  room.myroom?.send(JSON.stringify(newMessage));
       //?? room.send(JSON.stringify(mymessageobj));
      

		} catch (e: any) {
			console.log(e.message);
		}
	}

  function handleChange(event: any): void {
   // console.log(event.target.value);
    setValue(event.target.value);
  }
  return (
           <Container overflow={'auto'} maxH={300} maxW='2xl' border='1px' borderColor='gray.200' >
             <Flex color='white'>
                < Box flex='2' >
                <Input 
                  color={'black'} 
                  mt={4} 
                  placeholder='New Post'
                  onChange={handleChange}
                  size='sm'
                  />
                </Box>
                < Box flex='1' >
                <IconButton
                  m={4}
                  variant='outline'
                  colorScheme='teal'
                  aria-label='Send Room Post'
                  icon={<ChevronRightIcon/>}
                  onClick={() => sendMessage(value)}
                />
                </Box>
              </Flex>
            </Container>   
  )    
         
} 





