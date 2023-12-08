


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//import type { providers } from './types'

interface provider {
  id:number
  providerName: string
  providerId: string
  providerUrl: string
  providerPort: number
} 


  interface roomsById {
          room:{
            roomId: string
            name: string
            createdAt: string
            maxClients: number
            clients: number
            private: boolean
            locked: boolean
          }
        }
       
        interface newroom {
          playerId: string
          playerName: string
          playerIp: string
          fname: string
        } 
             
        interface joinroom {
          playerId: string
          playerName: string
          ip: string
          roomId:string
        } 



//const providerRespone: provider[];


// Define a service using a base URL and expected endpoints
export const providersApi = createApi({
  reducerPath: 'providersApi',
  
  baseQuery: fetchBaseQuery({ baseUrl: 'https://us-atl-3b185468.colyseus.cloud/' }),
  tagTypes: ['Rooms', 'RoomDetail'],
  endpoints: (builder) => ({
    getProvidersByName: builder.query<provider[],string>({
      query: (name) => `kam/${name}`,
    }),
    getRooms: builder.query<roomsById, string>({
        query: (resource) => `${resource}`,
        providesTags: ['Rooms'],
    }),
    getRoomInfo: builder.query<any, string>({
      query: (roomid) => `/colyseus/api/room?roomId=${roomid}`,
      providesTags: ['RoomDetail'],
    }),
    postNewRoom: builder.mutation<newroom, string>({
     query: (body) => ({
        url: '/matchmake/create/AzariaRoom',
        method: 'POST',
        body,
    }),
      invalidatesTags: ['Rooms'],
    }),
    postJoinRoom: builder.mutation<joinroom, Partial<joinroom> & Pick<joinroom, 'roomId'>>({
      query: ({ roomId, ...mybody }) => ({
         url: `/matchmake/joinById/${roomId}`,
         method: 'POST',
         body: mybody,
     }),
       invalidatesTags: ['RoomDetail'],
     }),
  }),
  
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProvidersByNameQuery, useGetRoomsQuery, useGetRoomInfoQuery, usePostNewRoomMutation, usePostJoinRoomMutation} = providersApi

// {{base_url}}/colyseus/api/room?roomId=cv-pceGeZ

// `/matchmake/joinById/`,
//${body.roomId}