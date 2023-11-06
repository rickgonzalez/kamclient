import type { NextApiRequest, NextApiResponse } from 'next'
 
 // Request Available Networks   /providers
        // Get Rooms                    /rooms
        // Creating a game room         /rooms
        // Joining a game               /rooms/{roomId}
        // Deleting a Room              /rooms/{roomId}
        // Getting Player Information   /players/{playerId}
        // Exit Player from room        /rooms/{roomId}/{playerId}
        // Messaging                    message/rooms/{roomId}  /message/players/{playerId}
        
        // app.get("/providers", async(req, res) => {
        //    // res.send(JSON.stringify(providerdata));
        //    res.json(providerdata);
        // });

        // app.get("/rooms", async(req, res) => {
        //     const rooms = await matchMaker.query({ name: "AzariaRoom" });
        //     res.json(rooms);
        // });

        // app.post('/rooms', async(req, res) => {
        //     let mypost = Object(req.body);
        //     let roomName = mypost["roomName"];
        //     let playerName = mypost["playerName"];
        //     let hostIp = mypost["playerIp"]
        //     const room = await matchMaker.joinOrCreate(roomName, { ip: hostIp , name: playerName });
        //     console.log(room);
        //     res.json(room);


type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}