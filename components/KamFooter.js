
import * as React from 'react'
import {Image,Flex,Spacer, Box, Container, Text, Center, Stack, Heading, HStack} from '@chakra-ui/react'




       
   export const Footer =()=>{
    
    
      return (
        <Box flex={1} bg={'black'} h={['150','300','600']} w={'100%'}>
        
         
         
         <Center flexDirection={'row'} bg={'black'}>
             
            

            <Flex flex={1} p={20} mt={5} w={'100%'} flexDirection={'column'} bg={'black'} h={['60','100','300']}></Flex>
           
            

          </Center> 
          <Center w={'100%'} flex={1} flexDirection={'row'} bg={'black'} h={40}>
                
                <Stack spacing='24px'>
                      <Center flexDirection={'row'}>
                       
                        <Image w={['16','40','60']} m={['2','3','5']} src={'https://azariaimages.s3.amazonaws.com/SINGLOGO.png'}></Image>

                        <Image w={['10','20','20']} m={['2','3','5']} src={' https://azariaimages.s3.amazonaws.com/EthLogoBW.png'}></Image>
                        
                        <Image w={['16','40','60']} m={['2','3','5']} src={'https://azariaimages.s3.amazonaws.com/fatmanlogo.png'}></Image>

                        <Image w={['16','40','60']} m={['2','3','5']} src={'https://azariaimages.s3.amazonaws.com/ColyseusBWLogo.png'}></Image>
                      </Center>
                </Stack>
            
          </Center>
         
          <Center flex={1}  flexDirection={'row'} bg={'black'} h={'40px'} w={'100%'}>
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
 
   
