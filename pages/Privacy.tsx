
import KamNavBar from '../components/NaviBar';
import {ImageTrain} from '../components/ImageWelcome';
import{Footer} from '../components/Footer';
import SubscribeForm from '../components/emailsubscribe';
import { Flex, Square, Text, Center, Box,Spacer, Image, Heading, ListItem, UnorderedList, Button, useColorModeValue, List } from '@chakra-ui/react';
// Import the functions you need from the SDKs you need

//Authentication Imports





export default function Privacy() {
 return (
<section className="Hero relative h-screen w-screen bg-[#000000] bg-opacity-100">
  
  <KamNavBar currentPage = "Privacy"></KamNavBar>
     


<Flex flexDirection={{base: 'column', md: 'column', lg:'row'  }}>
  

<Center flex='1' flexDirection={'column'}  bg={useColorModeValue('gray.300', 'black')}>
     
<Center flexDirection={'column'}>
                
               
                <Heading size={"lg"} m={10}>Privacy Policy Effective Date: Thursday, November 14 2024</Heading> 

                <Text  m={2} p={10} fontSize={['12px','16px','20px']} color={useColorModeValue('gray.800', 'gray.300')}>
 This Privacy Policy explains how information is collected, stored, and managed in our app. 
 By using this app, you agree to the practices outlined here. 


 <Heading my={4} size="md">1. Information Shared During Gameplay</Heading>

<Text fontWeight={'bold'} my={4}>To facilitate peer-to-peer gameplay, the following information is shared among participants: </Text>   

<Text fontWeight={'bold'}>Public IP Address:</Text> Each participant's public IP address is temporarily shared with other players to enable connectivity.
<Text fontWeight={'bold'} my={2}>Game State and Player Actions:</Text> The current game state and any actions you perform are visible to other players to ensure smooth and synchronized gameplay.
<Text fontWeight={'bold'} my={2}>Text and Voice Messages:</Text> Any text or voice messages sent during gameplay are shared with other players.

<Heading mt={6} size="md">2. Data Storage and Persistence</Heading>

The game state, along with a complete transaction log, is stored on all participating devices. This data is persisted on each device to enable stopping and resuming gameplay in the future. Each transaction is digitally signed with a unique public/private key pair automatically generated on your device. This signature allows all transactions and messages to be irrefutably traced back to the originating player.


<Heading mt={6} size="md">3. Security and Data Integrity</Heading>
Each transaction and message is digitally signed, ensuring that all activity during gameplay is securely verified. These signatures ensure data integrity and traceability, preventing any tampering with the game history or transactions.

<Heading mt={6} size="md">4. Third-Party Access</Heading>

No third parties have access to any information shared or stored during gameplay. All game-related data is transmitted solely among game participants and stored on their devices.

<Heading mt={6} size="md">5. Data Retention</Heading>

Game data, including the transaction log, is retained on your device as long as the game remains installed. You may delete this data by uninstalling the app.

<Heading mt={6} size="md">6. Changes to this Privacy Policy</Heading>

We may update this policy from time to time. When we make changes, we will update the effective date at the top of this page. Your continued use of the app following any changes indicates your acceptance of the updated policy.

<Heading mt={6} size="md">7. Contact Us</Heading>

If you have any questions about this policy, please contact us at support@iometics.info.

</Text>
              
  </Center>     
  </Center>
  </Flex>

  

 
  <Footer></Footer>




  
</section>
  )
}
