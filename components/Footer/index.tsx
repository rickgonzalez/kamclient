
import * as React from 'react'
import {Image,Flex,Spacer, Box, Container, Text, Center, Stack, Heading, HStack, useColorModeValue, SimpleGrid} from '@chakra-ui/react'




       
   export const Footer =(props: any)=>{
    
    
      return (
        <Box
        bg={useColorModeValue('black', 'black')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container as={Stack} maxW={'6xl'} py={10}>  
         
        
          <Center w={'100%'} flex={1} flexDirection={'row'} h={40}>
                
             
                       <SimpleGrid mt={20} columns={{ sm: 1, md: 1, lg: 4 }} spacing={5}>
                        <Center>
                            <Image w={['16','40','60']}  src={'https://azariaimages.s3.amazonaws.com/SINGLOGO.png'}></Image>
                        </Center>
        
                        <Center>
                            <Image w={['10','10','16']}  src={' https://azariaimages.s3.amazonaws.com/EthLogoBW.png'}></Image>
                        </Center>
                        
                        <Center>
                            <Image w={['16','40','50']}  src={'https://azariaimages.s3.amazonaws.com/fatmanlogo.png'}></Image>
                        </Center>
                        
                        <Center>
                            <Image w={['16','40','50']}  src={'https://azariaimages.s3.amazonaws.com/ColyseusBWLogo.png'}></Image>
                        </Center>
                        
                        </SimpleGrid>
            
          </Center>
         
          <Center flex={1}  flexDirection={'row'} bg={'black'} h={'40px'} w={'100%'}>
                <Stack mt='6' spacing='3'>
                 
                  <Center>
                    <Heading size='md' color={'white'}>Copyright Detomata 2024</Heading>
                    </Center>
                    <Center>
                    <Text color={'white'}>
                      Decentralized before decentralized was cool.
                    </Text>
                  </Center>
                </Stack>
          </Center>
         
          </Container>
        </Box>
      );
    
    }
      
     