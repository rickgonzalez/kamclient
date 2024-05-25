
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Stack, 
  Text
} from '@chakra-ui/react'


import { SET_PLAYER } from '@/services/reducers/playerSlice';
import { useDispatch, useSelector} from 'react-redux'
import { useSession} from "next-auth/react"

import React,{useState , useEffect} from 'react';


export default function PurchaseButton(props){
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const [productState , setProductState] = useState(props)

  const { data: session, status, update } = useSession()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
 
  useEffect(() => {
    setProductState(props);
    //need player.credits because the session value never changes
    // I don't think credit should be in session
    //console.log(player.credits);

}, [props])



  
//myuser, product, price, authenticated , mycredits


  async function buy(){
    console.log(props);
    let activeCredits = session.credits

    if(props.authenticated){
      console.log('buying: ', props.product, ' for ', props.price);
      //check balance
        if(activeCredits >= props.price){
         
          let newbalance = (activeCredits - props.price);
          //store the product
          //->Guy :)
          //update the players credits
          let player = {
            email: props.myuser.email,
            credits: newbalance
          }
          console.log('new purchase balance', player)
          
          try {
          
                  const response = await fetch('/api/player/', {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(player),
                    });
                    console.log('response from player update',response);
                    
                    if (response.status == 200){
                      console.log('success');
                      await update({ credits: newbalance })
                            dispatch(SET_PLAYER({
                              credits: newbalance,
                            }));
                          
                            update();
                            onClose();
                    }    
            } catch (error) {
                console.log('error happened updating player info!....',error)
            }
        }else{
          console.log('you do not have enough credits');
        }
    }else{
      console.log('you are not logged in');
    }
  }
   
  
 
   return (
    <>
    <Button  onClick={onOpen}  variant='solid' colorScheme='blue'>
                Purchase
    </Button>
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Complete Purchase
            </AlertDialogHeader>

            <AlertDialogBody>
              <Stack>
              <Text> Item Purchase: {props.product}</Text>
              <Text>Price: {props.price}</Text>
              </Stack>
              
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='green' onClick={buy} ml={3}>
                Buy
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
    
   
     )
   }
   