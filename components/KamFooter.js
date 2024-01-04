
import * as React from 'react'
import {Image,Flex,Spacer, Box, Container, Text, Center, Stack, Heading, HStack} from '@chakra-ui/react'




       
   export const Footer =()=>{
    
    
      return (
        <Box  bg={'#0a0909'} h={['150','300','600']} >
         <Center flex={1} flexDirection={'row'} bg={'black'} h={40}>
                
                <Stack spacing='24px'>
                      <Center flexDirection={'row'}>
                       
                        <Image w={['12','40','60']} m={['2','3','5']} src={'https://azariaimages.s3.amazonaws.com/SINGLOGO.png'}></Image>
                        
                        <Image w={['12','40','60']} m={['2','3','5']} src={'https://azariaimages.s3.amazonaws.com/fatmanlogo.png'}></Image>

                        <Image w={['12','40','60']} m={['2','3','5']} src={'https://azariaimages.s3.amazonaws.com/ColyseusBWLogo.png'}></Image>
                      </Center>
                </Stack>
            
          </Center>
          
         
         
         <Center flexDirection={'row'} bg={'black'}>
             
            

            <Flex flex={1} m={2} p={20} flexDirection={'column'} bg={'black'} h={['40','100','300']}></Flex>
            <Flex flex={1} m={2} p={20} flexDirection={'column'} bg={'black'} h={['40','100','300']}></Flex>
            

          </Center> 
          
          <Center flex={1}  flexDirection={'row'} bg={'black'} h={40}>
                <Stack mt='6' spacing='3'>
                  <Heading size='md' color={'white'}>Copyright Detomata 2024</Heading>
                  <Center>
                    <Text color={'white'}>
                      All rights reserved
                    </Text>
                  </Center>
                </Stack>
          </Center>
        </Box>
      );
    
    }
      
       
  //   <Box mx={16} my={10} py={2} flex={1} flexDirection={'column'} bg='#444444' h='5'>
  //   </Box> 
 
   
