
import {useDispatch, useSelector} from 'react-redux'
import {SET_PLAYER} from '../../services/reducers/playerSlice'
import { Alert, AlertIcon} from '@chakra-ui/react';
import React, { useEffect, useState} from 'react';


export default function PlayerAuthCheck(props) {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const [auth, setauth] = useState(false);

  function AuthError({ auth}) {
    if (!auth) {
      return (
            <Alert status='warning'>
              <AlertIcon />
                  You are not currently logged in. Some actions may not be available to you. Please click on the round icon from the navigation menu.
            </Alert>
          )
    }
    return  (<></>);
  }



  useEffect(() => {
              
            if(props.isAuthenticated){
              setauth(true);
              console.log('looks like props.isAuthenticated is true')
              
              dispatch(SET_PLAYER({
                playername: props.user.name,
                email: props.user.email,
                id: props.userid, 
                playerip: '',
                verToken: '',
                stripeid: props.stripeid,
                isAuthenticated: true,  // Todo - validate email and then can login
                emailValidated: false,
                credits: props.credits
              }));
             
          
              }
 }, []);


      return (
        <AuthError  auth = {auth}  />        
      )

  }



