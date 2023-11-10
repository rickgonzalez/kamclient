import type { NextApiRequest, NextApiResponse } from 'next'
import  {Client, Room, RoomAvailable } from "colyseus.js";
import React, { useState } from 'react';
import *  as Core from '@colyseus/core';
import { matchMaker } from "@colyseus/core";


const client = new Client('https://us-atl-3b185468.colyseus.cloud');

var mystate: unknown;

var myRoomObject: any = {};
var myroom : any; 

//Get Room info and players
export async function GET(request: Request, {params}:{params:{roomid:string}}) {
  var myroom: Room;

  client.getAvailableRooms().then(rooms => {
      rooms.forEach((myroom) => { 
        if (myroom.roomId == params.roomid){
            myRoomObject.name = myroom.name;
            myRoomObject.id = myroom.roomId;
            myRoomObject.clients = myroom.clients;
            } 
      });
  
  }).catch(e => {
    console.error(e);
    return Response.json({ 'error':e });
  });

  return Response.json({ myRoomObject });
 }  
 
 

//Player Joins Game


  export async function POST(request: Request, {params}:{params:{roomid:string}}): Promise<Response> {
   
    const mypost = await request.json();
    
    var newroom: Room;
    
    let roomid = params.roomid;
    
    let playerName = mypost.playerName;
    let playerId = mypost.playerId;
    let hostIp = mypost.playerIp;


        try {
           newroom =  await client.joinById(roomid, { ip: hostIp , name: playerName, playerId: playerId });
            
          } catch (e) {
            console.error  ("error joining room ", e);
            return Response.json({ 'error':e });
          } 

          
        return Response.json(newroom.state.toJSON())
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

  