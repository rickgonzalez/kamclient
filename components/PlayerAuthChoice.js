import * as React from 'react'

import {
    Text,
     Box,
    VStack,
    Input,
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
    FormLabel

  } from '@chakra-ui/react'

  //import {useRef} from 'react'
  import {useSelector, useDispatch} from 'react-redux'
  import {SET_PLAYER} from '../services/reducers/playerSlice'
 var http = require('http');



export default function PlayerAuthChoice() {
    
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('');
    const [playername, setplayername] = React.useState('');

    const [email, setemail] = React.useState('');
    const myplayer = useSelector((state) => state.player);



    const handleChange = (event) => setValue(event.target.value)
    const handleplayerNameChange = (event) => setplayername(event.target.value)
  
    const handleEmailChange = (event) => setemail(event.target.value)


    const handleSubmit = async () => {
      console.log('Registering Player');
      let myplayer = {
        playername: playername,
        email: email
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
                  id: '', 
                  playerip: '',
                  verToken: 'ver100001000',
                  isAuthenticated: true,  // Todo - validate email and then can login
                  emailValidated: false
                }));



              } 
             
        } catch (error) {
            console.log('error happened!....',error)
            setEmail('oops please try again');
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
                                onClick={() =>  handleSubmit()}
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
                                    <Text fontSize='sm'>{myplayer.name}</Text>
                                    </Box>
                                   
                                    <Box>
                                    <Text  fontSize='sm'>{myplayer.playerip}</Text>
                                    </Box>
                                    <Box>
                                    <Input value={value} onChange={handleChange}  placeholder='Name' />
                                    </Box>
                    </AccordionPanel>
                  </AccordionItem>
                  </Accordion>
                </VStack> 
        </>
      )
  }

