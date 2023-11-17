

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Provider } from 'react-redux'
//import type { providers } from './types'

interface provider {
  id:number
  providerName: string
  providerId: string
  providerUrl: string
  providerPort: number
} 

//const providerRespone: provider[];


// Define a service using a base URL and expected endpoints
export const providersApi = createApi({
  reducerPath: 'providersApi',
  
  baseQuery: fetchBaseQuery({ baseUrl: 'https://us-atl-3b185468.colyseus.cloud/' }),
  endpoints: (builder) => ({
    getProvidersByName: builder.query<provider[],string>({
      query: (name) => `kam/${name}`,
    }),
    // getPosts: build.query<PostsResponse, void>({
    //     query: () => ({ url: 'posts' }),
    //     providesTags: (result = []) => [
    //       ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
    //       { type: 'Posts' as const, id: 'LIST' },
    //     ],
    //   }),
  }),
  
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProvidersByNameQuery } = providersApi