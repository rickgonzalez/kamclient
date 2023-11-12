"use client"

import Image from 'next/image'
import * as Colyseus from "colyseus.js";
import React, { useState } from 'react';


export default function Lobby() {
    var [roomId] = useState('');
   
    const client = new Colyseus.Client(process.env.COLYSEUS_HOST);
   async function createRoom() {
        try {
            const room = await client.joinOrCreate("my_room", { name: "Rick"});
            roomId = room.roomId
            console.log("joined successfully", roomId);
            console.log("Object  Room ", room);
          
          } catch (e) {
            console.error("join error", e);
          }
    }
    

      async function getRooms() {
        try {
            client.getAvailableRooms("my_room").then(rooms => {
                for (var i=0; i<rooms.length; i++) {
                    console.log("living room", rooms[i].roomId);
                }
              });
          
          } catch (e) {
            console.error("error listing rooms ", e);
          } 
      }

     
      




    return (
  
     <main className='flex items-center justify-center min-h-screen from-black-100 via-teal-300 to-white-500 bg-gradient-to-br'>
    <div className='w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl'>
        <div className='max-w-md mx-auto space-y-6'>

            <div className="flex flex-col">
                <h1 className="mb-3 text-3xl font-extrabold text-center">Testing</h1>

               
                <button onClick={createRoom} className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-black-800">Join Room {roomId}</button>
                
               
                <button onClick={getRooms} className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-black-800">List Rooms</button>

               
                <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-black-800">test</button>

                
            </div>

        </div>
    </div>
</main>
    
  
  )
}



// <div>
// <button onClick={createRoom}>Click me!</button>
// <p>The room is  {roomId}</p>
// </div>