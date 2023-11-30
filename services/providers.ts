

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
          roomName: string
          roomType: string
          roomMaxPlayers: number
        } 
             

//const providerRespone: provider[];


// Define a service using a base URL and expected endpoints
export const providersApi = createApi({
  reducerPath: 'providersApi',
  
  baseQuery: fetchBaseQuery({ baseUrl: 'https://us-atl-3b185468.colyseus.cloud/' }),
  tagTypes: ['Rooms'],
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
    }),
    postNewRoom: builder.mutation<newroom, string>({
     query: (body) => ({
        url: '/matchmake/create/AzariaRoom',
        method: 'POST',
        body,
    }),
      invalidatesTags: ['Rooms'],
    }),

  }),
  
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProvidersByNameQuery, useGetRoomsQuery, useGetRoomInfoQuery, usePostNewRoomMutation} = providersApi

// {{base_url}}/colyseus/api/room?roomId=cv-pceGeZ