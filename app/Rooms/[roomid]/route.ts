import type { NextApiRequest, NextApiResponse } from 'next'
import  {Client, Room, RoomAvailable } from "colyseus.js";
import React, { useState } from 'react';
import *  as Core from '@colyseus/core';
import { matchMaker } from "@colyseus/core";
import { NextResponse } from 'next/server'

const client = new Client(process.env.COLYSEUS_HOST);

var mystate: unknown;

var myRoomObject: any = {};
var players: any;
var revisedPlayers: any = {};
var matchroom: any;

//Get Room info and players
export async function GET(request: Request, {params}:{params:{roomid:string}}) {
 
  var room: Room;
  let roomid = params.roomid;
  let playerid = '000';
  let playerName = 'auditor';
 
      try {
         room =  await client.joinById(roomid, { name: playerName, playerId: playerid });
         room.state.players.onAdd(function (player: any , sessionId: string) {       
         players = room.state.players;
         room.leave();
         // revisedPlayers = players.filter((item: { name: string; }) => player.name !== "auditor");
         //  const revisedPlayers = players.filter(((player: any) => player.name !== "auditor"));
         //  console.log(revisedPlayers);
          // var key = sessionId;
          // delete players[key];
       
           });
       
           return NextResponse.json({players});
        
          } catch (e) {
          console.error  ("error joining room ", e);
          return Response.json({ 'error':e });
        } 



 }  
 
 

//Player Joins Game
 export async function POST(request: Request, {params}:{params:{roomid:string}}): Promise<Response> {
   
    const mypost = await request.json();
    var room: Room;
    let roomid = params.roomid;
    let playerid = mypost.playerId;
    let playerName = mypost.playerName;
    let hostIp = mypost.playerIp;


        try {
           room =  await client.joinById(roomid, { ip: hostIp , name: playerName, playerId: playerid });
           room.state.players.onAdd(function (player: any , sessionId: string) {
           players = room.state.players;
            // add your player entity to the game world!
            // add via redux to some object?
            });

              room.state.players.onRemove((player: any, sessionId: string) => {
              //console.log(player, "has been removed at", sessionId);
               delete player[sessionId];
           
               // remove your player entity from the game world!
             });
          
             return NextResponse.json({players});
          
            } catch (e) {
            console.error  ("error joining room ", e);
            return Response.json({ 'error':e });
          } 

          
       
  }



//   //Remove Specific Game

//   export async function DELETE(request: Request, {params}:{params:{roomid:string}}) {
//     try {
//       newroom = await client.close();
//    } catch (e) {
//      console.error  ("error joining room ", e);
//      return Response.json({ 'error':e });
//    } 
//  return Response.json({ newroom })
//   }



  
  // client.getAvailableRooms().then(rooms => {
   
   
   
  //   rooms.forEach((room) => {
      
  //     if (room.roomId == params.roomid){
  //          myRoomObject.name = room.name;
  //          myRoomObject.id = room.roomId;
  //          myRoomObject.clients = room.clients;
  //          myRoomObject.state = room.metadata;
  //         } 
  //   });

  