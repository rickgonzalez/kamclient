import * as React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import {
    Text,
     Box,
    VStack,
    Input,
    InputGroup,
    InputLeftElement,
    Button,
    Stack,
    Heading,
    Accordion,
    AccordionPanel,
    AccordionIcon,
    AccordionButton,
    AccordionItem,
    useColorModeValue,
    HStack,
    FormControl,
    FormLabel,
    Spacer,

  } from '@chakra-ui/react'

  //import {useRef} from 'react'
  import {useSelector, useDispatch} from 'react-redux'
  import {SET_PLAYER} from '../../services/reducers/playerSlice'
  import { EmailIcon } from '@chakra-ui/icons';
  import { v4 as uuidv4 } from 'uuid';
import { m } from 'framer-motion'

 var http = require('http');



export default function PlayerAuthChoice() {
    
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('');
    const [playername, setplayername] = React.useState('');
    const [email, setemail] = React.useState('');

    const myplayer = useSelector((state) => state.player);

    const handleplayerNameChange = (event) => setplayername(event.target.value)
    const handleEmailChange = (event) => setemail(event.target.value)


    const handleRegister = async () => {
      console.log('Registering Player');
      let myplayer = {
        playername: playername,
        email: email,
        emailValidated: false,
        credits: 0,
        stripeid: '',
        id: uuidv4()
      }

          try {
            const response = await fetch('/api/player/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(myplayer),
              });
              console.log(response);
              if (response.status == 200){
                console.log('success');
                //Take away  registration option here
                // Add player to redux
                dispatch(SET_PLAYER({
                  playername: myplayer.playername,
                  email: myplayer.email,
                  id: myplayer.id, 
                  playerip: '',
                  verToken: 'ver100001000',
                  isAuthenticated: true,  // Todo - validate email and then can login
                  emailValidated: false,
                  credits: 0  
                }));



              } 
             
        } catch (error) {
            console.log('error happened creating player!....',error)
            
        }
    };

    const handleLogin = async (myemail) => {
      console.log('Logging in Player');
          try {
            const response = await fetch('/api/player?'+ new URLSearchParams({
              email: myemail
              }));
              //MUST await the json 
              const myjson = await response.json();
            
              if (myjson){
                
                console.log('fuck me! ', myjson);
                // Add player to redux
                dispatch(SET_PLAYER({
                  playername: myjson.playername,
                  email: myjson.email,
                  id: myjson.id, 
                  playerip: '',
                  verToken: 'ver100001000',
                  isAuthenticated: true,  // Todo - validate email and then can login
                  emailValidated: myjson.emailValidated,
                  credits: myjson.credits 
                }));
              } 
             
        } catch (error) {
            console.log('error happened Logging in player!....',error)
        }
    };

    
    return (
        <>
              <VStack
                    spacing={4}
                    align='stretch'
                >
                  <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                          Register
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                Open the game and create a registration!
                <Box
                          rounded={'lg'}
                          bg={useColorModeValue('white', 'gray.700')}
                          boxShadow={'lg'}
                          p={8}>
                          <Stack spacing={4}>
                            <HStack>
                              <Box>
                                <FormControl id="firstName" isRequired>
                                  <FormLabel>Player Name</FormLabel>
                                  <Input type="text" onChange={handleplayerNameChange}/>
                                </FormControl>
                              </Box>
        
                            </HStack>
                            <FormControl id="email" isRequired>
                              <FormLabel>Email address</FormLabel>
                              <Input type="email" onChange={handleEmailChange} />
                            </FormControl>
                        
                            <Stack spacing={10} pt={2}>
                              <Button
                                loadingText="Submitting"
                                onClick={() =>  handleRegister()}
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                  bg: 'blue.500',
                                }}>
                                Sign up
                              </Button>
                            </Stack>
                          
                          </Stack>
                        </Box>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                          Login
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    <Box>
                                    <Heading size='sm'>{value}</Heading>
                                    </Box>
                                    
                                    <Box>
                                    <Text p={6}>To login, please have the game open, enter your email and select Verify.</Text>
                                    <FormControl id="email" isRequired>
                                      <FormLabel>Email address</FormLabel>
                                      <InputGroup>
                                      <InputLeftElement pointerEvents='none'>
                                        <EmailIcon color='gray.300' />
                                      </InputLeftElement>
                                      <Input type="email" onChange={handleEmailChange} placeholder='email'/>
                                      </InputGroup>
                                    </FormControl>
                                    
                                      
                            
                                    <Stack spacing={10} pt={2}>
                                    <Button
                                      loadingText="Submitting"
                                      onClick={() => handleLogin(email)}
                                      size="lg"
                                      bg={'blue.400'}
                                      color={'white'}
                                      _hover={{
                                        bg: 'blue.500',
                                      }}>
                                      Verify
                                    </Button>
                            </Stack>
                                    </Box>
                    </AccordionPanel>
                  </AccordionItem>
                  </Accordion>
                </VStack> 
        </>
      )
  }

