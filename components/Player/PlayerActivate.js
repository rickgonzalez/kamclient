
import {useSelector, useDispatch} from 'react-redux'
import {SET_PLAYER} from '../../services/reducers/playerSlice'

export default function PlayerActivate(myuser) {
    const dispatch = useDispatch();
    
    const myplayer = useSelector((state) => state.player);
    console.log('success');
    //Take away  registration option here
    // Add player to redux
    dispatch(SET_PLAYER({
      playername: myuser.playername,
      email: myuser.email,
      id: myuser.id, 
      playerip: '',
      verToken: 'ver100001000',
      stripeid: myuser.stripeid,
      isAuthenticated: true,  // Todo - validate email and then can login
      emailValidated: false,
      credits: 0  
    }));
   

    return <></>;
  }



