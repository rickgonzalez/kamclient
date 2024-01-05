

import KamNavBar from '../components/Navbar';

import{Footer} from '../components/KamFooter';
import { Flex, Square, Text, Center, Box,Spacer, Image, Heading, ListItem, UnorderedList, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Stack, SimpleGrid } from '@chakra-ui/react';



export default function Apothecary() {
 return (
<Box   w='100%' h='100%' bg={'black'}>

<KamNavBar currentPage = "Apothecary"></KamNavBar>

<Flex w='100%' bg={'black'} flex={1} m={2} flexDirection={'column'}>
 
  

<Flex flex={1} bg={'black'} h={['150','300','800']} flexDirection={{base: 'column', md: 'column', lg:'row'  }}>

    <Box m={3} flex={1}>
    <Text  mt={8} ml={10} fontSize={['12px','16px','24px']} fontWeight='bold' color='white'>Rathe's Apothecary:</Text>
      <Image w={['150','300','400']} src='https://azariaimages.s3.amazonaws.com/bigRathe.png' alt='Rathe' />
    </Box>
    <Box my={8}  mx={6} flex={2}>

    <Box mr={[5,10,20]} flex={2}>
    <Text  mt={8} mx={2} fontSize={['12px','16px','24px']} fontWeight='bold' color='white'>App Items:</Text>
        <Text  mt={2} mx={2} fontSize={['12px','16px','16px']} fontWeight='bold' color='white'>
        Kamioza Azaria is free to play and we have built it for you to be able to play all the way
        through with items available in the world. These items are here for added game play and are
        not required to play the game.  To purchase any of these items, you must use Nystrom as 
        Rathe is not interested in your money.
        </Text>
        <Box mr={[5,10,20]} h={['50','75','120']}>
        <Center>

        </Center>
        </Box>

    </Box>

    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(220px, 1fr))'>
    <Card bg={'#dbd2d2'} color={'teal'} maxW='sm'>
      <CardBody>
        <Image
          src='https://azariaimages.s3.amazonaws.com/Gopabrew.png'
          alt='Gopa 3 vials'
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>3 Vials of Gopa</Heading>
          <Text>
            Sweet, restorative Gopa!
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            10 Scoops
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='blue'>
          Purchase
          </Button>
        
        </ButtonGroup>
      </CardFooter>
    </Card>
    {/*******---------------------------------- */}
    <Card bg={'#dbd2d2'} color={'teal'} maxW='sm'>
      <CardBody>
        <Image
          src='https://azariaimages.s3.amazonaws.com/Gopabrew.png'
          alt='Gopa 3 vials'
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>3 Vials of Gopa</Heading>
          <Text>
            Sweet, restorative Gopa!
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            10 Scoops
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='blue'>
          Purchase
          </Button>
        
        </ButtonGroup>
      </CardFooter>
    </Card>
    {/*******---------------------------------- */}
    <Card bg={'#dbd2d2'} color={'teal'} maxW='sm'>
      <CardBody>
        <Image
          src='https://azariaimages.s3.amazonaws.com/Gopabrew.png'
          alt='Gopa 3 vials'
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>3 Vials of Gopa</Heading>
          <Text>
            Sweet, restorative Gopa!
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            10 Scoops
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='blue'>
          Purchase
          </Button>
        
        </ButtonGroup>
      </CardFooter>
    </Card>
    {/*******---------------------------------- */}
    <Card bg={'#dbd2d2'} color={'teal'} maxW='sm'>
      <CardBody>
        <Image
          src='https://azariaimages.s3.amazonaws.com/Gopabrew.png'
          alt='Gopa 3 vials'
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>3 Vials of Gopa</Heading>
          <Text>
            Sweet, restorative Gopa!
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            10 Scoops
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='blue'>
          Purchase
          </Button>
        
        </ButtonGroup>
      </CardFooter>
    </Card>
    {/*******---------------------------------- */}
    </SimpleGrid>  
    </Box>

</Flex>


<Center w={'100%'} flexDirection={'row'} bg={'black'}>
  <Footer></Footer>
</Center>

</Flex> 




</Box>
 
  )
}

