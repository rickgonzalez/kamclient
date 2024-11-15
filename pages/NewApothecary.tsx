

import KamNavBar from '../components/NaviBar';

import{Footer} from '../components/Footer';
import { Flex, Text, Box,Image, Heading, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Stack, SimpleGrid, useColorModeValue, HStack, VStack} from '@chakra-ui/react';
import StripeOrder from '../components/StripeOrder'

//Authentication Imports
import type { InferGetServerSidePropsType} from 'next'
import { authOptions } from "./api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import PlayerAuthCheck from '../components/Player/PlayerAuthCheck'
import ItemList from '@/components/Shop/ItemList';


//---------------------------------
// getServerSideProps needs to be a part of each session protected page
// in order to get the session properties and authentication from the session
// callback from [...nextauth].ts

 export async function getServerSideProps(context: any) {
  
  

  const session = await getServerSession(context.req, context.res, authOptions)
 
  var localplayer:any;

        if (!session) {
          console.log('No sesseion');
          return {
            redirect: {
              destination: "",
              permanent: false,
            },
          }
        }
       // console.log('session is',session)
        localplayer = session;
      return {
          props: {
            user: localplayer.user,
            userid: localplayer.id,
            isAuthenticated: localplayer.isAuthenticated,
            stripeid: localplayer.stripeid,
            credits: localplayer.credits,
          },
        }
}





export default function Apothecary({
  
  //these are the props from getServerSideProps
  user, userid, isAuthenticated, stripeid, credits
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
 
 return (
<Box   w='100%' h='100%' bg={useColorModeValue('gray.400', 'gray.800')}>

<KamNavBar currentPage="Apothecary"></KamNavBar>
<PlayerAuthCheck user = {user} userid = {userid} isAuthenticated = {isAuthenticated} stripeid = {stripeid} credits={credits}></PlayerAuthCheck>

    <Flex flex={2} flexDirection={{base: 'column', md: 'column', lg:'row'  }}>
    
    <Box  mt={8} ml={10}>
    <Text  fontSize={['12px','16px','24px']} fontWeight='bold' color={useColorModeValue('gray.800', 'gray.300')}>Rathe&apos;s Apothecary is under construction</Text>
    <Image w={['150','300','400']} src='https://azariaimages.s3.amazonaws.com/bigRathe.png' alt='Rathe' />
    </Box>
    
   
    <Box  mt={8} ml={10}>
    <Box m={[5,10,20]}>
              
                      <Card bg={'#dbd2d2'} color={'teal'} maxW='md' >
                          <CardBody>
                            <HStack mt='6' spacing='3'>
                            <Image
                             boxSize='150px'
                             objectFit='cover'
                              src='https://azariaimages.s3.amazonaws.com/items/coins.png'
                              alt='Gopa 3 vials'
                              borderRadius='lg'
                            />
                             <VStack>
                             <Heading size='md'>Minted Nystrom <br></br> Rathe's favorite currency</Heading>
                             <Text fontSize='sm'>Not a crypto coin: Use Nystrom Coins to pay for our digital objects.</Text>
                             </VStack>
                             
                            
                            </HStack>
                          </CardBody>
                          <Divider />
                          <CardFooter>
                           <HStack>
                              <VStack px={4}>
                                <Text fontSize='lg' fontWeight={'bold'} >400 Coins</Text>  
                                <Text fontWeight={'bold'}>$5</Text>  
                                <StripeOrder productId = {1} price = {500}></StripeOrder>
                              </VStack>
                              <VStack px={4}>
                                <Text fontSize='lg' fontWeight={'bold'} >900 Coins</Text>  
                                <Text fontWeight={'bold'}>$10</Text>  
                                <StripeOrder productId = {2} price = {1000}></StripeOrder>
                              </VStack>
                              <VStack px={4}>
                                <Text fontSize='lg' fontWeight={'bold'} >2200 Coins</Text>  
                                <Text fontWeight={'bold'}>$20</Text>  
                                <StripeOrder productId = {3} price = {2000}></StripeOrder>
                              </VStack>
                              
                           </HStack>
                            
                           
                          </CardFooter>
                          <Text p={4} fontSize='xs'>When you buy Nystrom Coins you receive only a limited, non-refundable, non-transferable, revocable license to use Nystrom Coins, which have no value in real currency.</Text>
                        </Card>



      <Text  mt={8} mx={2} fontSize={['12px','16px','24px']} fontWeight='bold' color={useColorModeValue('gray.800', 'gray.300')}>App Items:</Text>
        <Text  mt={2} mx={2} fontSize={['12px','16px','16px']} fontWeight='bold' color={useColorModeValue('gray.800', 'gray.300')}>
        Kamioza Azaria is free to play and we have built it for you to be able to play all the way
        through with items available in the world. These items are here for added game play and are
        not required to play the game - but they could make it more fun!
      </Text>
    </Box>
    </Box>



    </Flex>
  <ItemList user={user} isAuthenticated = {isAuthenticated}></ItemList>
  <Footer></Footer>



</Box>

 
  )
}

{/* <Text fontSize='xs'>When you buy Nystrom Coins you receive only a limited, non-refundable, non-transferable, revocable license to use Nystrom Coins, which have no value in real currency.</Text> */}
