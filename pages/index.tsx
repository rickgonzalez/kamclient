

import KamNavBar from '../components/Navbar';
import {ImageTrain} from '../components/ImageWelcome';
import{Footer} from '../components/KamFooter'
import { Flex, Square, Text, Center, Box,Spacer, Image } from '@chakra-ui/react'



export default function Home() {
 return (
<section className="Hero relative h-screen w-screen bg-[#000000] bg-opacity-100">
  <KamNavBar currentPage = "/"></KamNavBar>
  <div className="h-[90%]">
    <div className="ContentArea relative h-full">
      
     


<Flex flexDirection={{base: 'column', md: 'column', lg:'row'  }}>
  <Box flex='3' bg='black'>
      <div className="h-full">
      <Text  mt={8} ml={5} fontSize='24px' color='white'>CHAPTER 1:</Text>
       <ImageTrain></ImageTrain>
      </div>
  </Box>

  <Center flex='1' flexDirection={'column'}  bg='black'>
      <Center p={4} mr={[0,0,30]} h={['100','200','300']} bgImage={{base: '', md: '', lg:"url('https://azariaimages.s3.amazonaws.com/frame1.png')" }}
              bgPosition="center"
              bgRepeat="no-repeat"
              backgroundSize="contain"
              bg=''
              >
                 <Text  m={8} fontSize='16px' color='white'>Kamioza is the parent planet of 7 moons 
                  Chapter 1: Azaria is the beginning  of an epic adventure.
                  Come discover lost treasure, restore ancient artifacts and 
                  unravel mysteries long forgotten.</Text>
      </Center>

      <Center p={4} mr={[0,0,30]} h={['100','200','300']} bgImage={{base: '', md: '', lg:"url('https://azariaimages.s3.amazonaws.com/frame1.png')" }}
              bgPosition="center"
              bgRepeat="no-repeat"
              backgroundSize="contain"
              >
                  <Text  m={8} fontSize='16px' color='white'>Gameplay: 
                    Unique First Person MMORPG
                    Collaborative puzzle solving
                    Resource Management 
                    Spell and item creation system</Text>
      </Center>
  </Center>
  </Flex>
  <Flex flexDirection={'row'}>
  <Footer></Footer>
  </Flex>








     
    </div>
  </div>
</section>
  )
}

