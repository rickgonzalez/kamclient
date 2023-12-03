import {usePostJoinRoomMutation} from '@/services/providers'


const JoinRoom = (myroomid,mybody) => {

        const [joinRoom,mutationResult] = usePostJoinRoomMutation()
        console.log('looking to join room ', myroomid)
                 // let mybody = new Object();
                    //   mybody.playerId = '88b098defB751B7401B5f6d8976F'
                    //   mybody.playerName = 'Pete'
                    //   mybody.playerIp = '10.10.0.0.9'
              try {
                joinRoom({mybody, myroomid});            
                if(mutationResult.status = 'fulfilled' && mutationResult.isSuccess){
                    console.log(JSON.parse(JSON.stringify(mutationResult)))
                    //create a post process call with the session and roomId to accept the reservation
                }
                
                } catch (e) {
                  console.error("join error", e);
                }
                return (
                    <></>
                   
                     )
   
            }
export default JoinRoom;