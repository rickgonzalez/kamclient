
import {useSelector, useDispatch} from 'react-redux'
import {SET_PLAYER} from '../../services/reducers/playerSlice'
import { Alert, AlertIcon} from '@chakra-ui/react';



export default function PlayerAuthCheck(props) {


if(props.isAuthenticated){

  console.log('looks like props.isAuthenticated is true')
  const dispatch = useDispatch();
    
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
  const myplayer = useSelector((state) => state.player);
  
  if(!myplayer.isAuthenticated){

    return (
      <Alert status='warning'>
        <AlertIcon />
            You must have an active logged in account to purchase. Please click on the round icon from the navigation menu.
      </Alert>
    )
  }else{
    return (
      <></>
    )
  }
    return <></>;
  }



