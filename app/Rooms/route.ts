import type { NextApiRequest, NextApiResponse } from 'next'
import  {Client, Room } from "colyseus.js";
import React, { useState } from 'react';
import { stat } from 'fs';


const client = new Client('https://us-atl-3b185468.colyseus.cloud');


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
    var players = {};
    const mypost = await request.json();
        let roomName = mypost.roomName;
        let playerName = mypost.playerName;
        let hostIp = mypost.playerIp;
        var room: Room;
        try {
            room = await client.create(roomName, { "ip": hostIp , "name": playerName });
            room.state.players.onAdd(function (player: { onChange: (arg0: (changes: any) => void) => void; }, sessionId: any) {
            
            player.onChange(function (changes: any) {
                console.log(player);
            });
             
          });



          } catch (e) {
            console.error  ("error listing rooms ", e);
            return Response.json({ 'erroe':e });
          } 
       
        return Response.json(room)
  }