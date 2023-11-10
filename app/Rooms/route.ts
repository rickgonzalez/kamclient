


import  {Client, Room} from "colyseus.js";
import { NextResponse } from 'next/server'
var players: any;



const client = new Client('https://us-atl-3b185468.colyseus.cloud');
//const [state, setState] = useState(room.state && room.state);

  export async function GET(request: Request) {
    var rooms;
     try {
         rooms = await client.getAvailableRooms();
       } catch (e) {
         console.error("error listing rooms ", e);
         return Response.json({ 'error listing rooms':e });
       } 
     return Response.json({ rooms });
   }




  //Create a new game
  export async function POST(request: Request) {
   
  
    var room: Room;

    const mypost = await request.json();
        let roomName = mypost.roomName;
        let playerid = mypost.playerId;
        let playerName = mypost.playerName;
        let hostIp = mypost.playerIp;
        
       
        
        room = await client.joinOrCreate(roomName, { "ip": hostIp , "name": playerName , "playerId":playerid});
           
            room.state.players.onAdd(function (player: any , sessionId: string) {
              console.log(player, "has been added at", sessionId);
              
              room.state.players.forEach((Player: any) => console.log(Player.toJSON()));
              players = room.state.players;
              console.log('fuck',players);
              // add your player entity to the game world!
              // add via redux to some object?
               });

               room.state.players.onRemove((player: any, sessionId: string) => {
                console.log(player, "has been removed at", sessionId);
                delete player[sessionId];
            
                // remove your player entity from the game world!
              });
           
              return NextResponse.json({players});
           
  }