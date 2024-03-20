

import KamNavBar from '../components/NaviBar';
import {ImageTrain} from '../components/ImageWelcome';
import{Footer} from '../components/Footer';
import { Flex, Square, Text, Center, Box,Spacer, Image, Heading, ListItem, UnorderedList, Button, useColorModeValue } from '@chakra-ui/react';


export default function Home() {
 return (
<section className="Hero relative h-screen w-screen bg-[#000000] bg-opacity-100">
  
  <KamNavBar children = '' currentPage = "/"></KamNavBar>
  
     


<Flex flexDirection={{base: 'column', md: 'column', lg:'row'  }}>
  <Center flex='2'  bg={useColorModeValue('gray.300', 'black')}>
      <div className="h-full">
      <Text  mt={8} ml={10} fontSize={['12px','16px','24px']} fontWeight='bold' color={useColorModeValue('gray.800', 'gray.300')}>CHAPTER 1:</Text>
       <ImageTrain></ImageTrain>
      </div>
  </Center>

  <Center flex='1' flexDirection={'column'}  bg={useColorModeValue('gray.300', 'black')}>
      <Center p={4} m={[0,0,8]} h={['100','200','380']} bgImage={{base: '', md: '', lg:"url('https://azariaimages.s3.amazonaws.com/frame1.png')" }}
              bgPosition="center"
              bgRepeat="no-repeat"
              backgroundSize="contain"
              >
                <Center flexDirection={'column'}>
                 <Text  m={8} fontSize={['12px','16px','20px']} color={useColorModeValue('gray.800', 'gray.300')}>
                  Come discover lost treasure, restore ancient artifacts and 
                  unravel mysteries long forgotten. Enter the beautifully bizzare world of Azaria
                  and claim your destiny.</Text>
                <Button color={'gray.600'}>Sign Up for Beta2</Button>
                </Center>
      </Center>
      

      <Center p={4} m={[0,0,8]} h={['100','200','380']} bgImage={{base: '', md: '', lg:"url('https://azariaimages.s3.amazonaws.com/frame1.png')" }}
              bgPosition="center"
              bgRepeat="no-repeat"
              backgroundSize="contain"
              >
                 
                 
                 <Text  m={8} fontSize={['12px','16px','20px']} color={useColorModeValue('gray.800', 'gray.300')}>
                  Recently remastered from its 1997 designs, 
                  Azaria brings a simple originality to adventure gaming. It is approachable, mysterious and loads of fun.</Text>
      </Center>
  </Center>
  </Flex>

  <Box   bg={useColorModeValue('gray.300', 'black')} h={['150','300','800']}>
   <Flex flexDirection={{base: 'column', md: 'column', lg:'row'  }}>
                  <UnorderedList fontSize={['12px','16px','24px']} color={useColorModeValue('gray.800', 'gray.300')} p={[0,0,14]}>
                  <Text fontSize={['12px','16px','24px']} fontWeight={'bold'} color={'gray.600'}>Gameplay:</Text>
                    <ListItem>Unique First Person MMORPG - Supports dozens of players in a game instance</ListItem>
                    <ListItem>Collaborative puzzle solving and micro competition</ListItem>
                    <ListItem>Resource Management of both natural resources and currency</ListItem>
                    <ListItem>Spell and item creation system - Drop evil spells and bombs on your friends</ListItem>
                  </UnorderedList>
   </Flex>
      
    
    <Flex my={20} flexDirection={{base: 'column', md: 'column', lg:'row'  }}>
        <Center mb={20} py={2} flexDirection={'row'}>
          <Image src={'https://azariaimages.s3.amazonaws.com/strip.png'}></Image>
        </Center>
      </Flex>  
  </Box>

 
  <Footer></Footer>




  
</section>
  )
}

