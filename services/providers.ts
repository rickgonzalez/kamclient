


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



//const providerRespone: provider[];


// Define a service using a base URL and expected endpoints
export const providersApi = createApi({
  reducerPath: 'providersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://us-atl-3b185468.colyseus.cloud/' }),
  tagTypes: ['Rooms', 'RoomDetail'],
  endpoints: (builder) => ({
   
  }),
  
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { } = providersApi

// {{base_url}}/colyseus/api/room?roomId=cv-pceGeZ

// `/matchmake/joinById/`,
//${body.roomId}