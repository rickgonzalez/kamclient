


import { Box, Container, Flex, IconButton, Input, Textarea, border, color } from '@chakra-ui/react'

import { ChevronRightIcon } from "@chakra-ui/icons";
import React, { useState,useEffect,useRef } from 'react';
import { useRoom } from '@/components/Room/RoomContext';
import { useSelector, useDispatch } from "react-redux";


export function RoomPoster() {

  const room = useRoom();
  const [value, setValue] = React.useState('')
  const myplayer = useSelector((state: any) => state.player);

  const sendMessage = (mymessage: any) => {
		try {
      room.myroom?.send("chat", { message: mymessage, name: myplayer.name})
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





