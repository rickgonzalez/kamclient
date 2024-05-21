
import {useDispatch} from 'react-redux'
import {SET_PLAYER} from '../../services/reducers/playerSlice'
import { Alert, AlertIcon} from '@chakra-ui/react';
import React, { useEffect, useState} from 'react';


export default function PlayerAuthCheck(props) {
  const dispatch = useDispatch();
  const [auth, setauth] = useState(false);

  function AuthError({ auth}) {
    if (!auth) {
      return (
            <Alert status='warning'>
              <AlertIcon />
                  You must have an active, logged in account to participate on this page. Please click on the round icon from the navigation menu.
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
                emailValidated: false
              }));
             
          
              }
 }, []);


      return (
        <AuthError  auth = {auth}  />        
      )

  }



