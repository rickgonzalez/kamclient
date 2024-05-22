'use client;'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { store } from '../store'
import { Provider } from 'react-redux'
import { SessionProvider } from "next-auth/react"


import { RoomProvider } from '@/components/Room/RoomContext'
//import { WebSocketProvider} from '@/components/WebSocketContext'

export default function App({Component, pageProps: { session, ...pageProps }}: AppProps) {
 
  useEffect(() => {
    import('preline')
  }, [])

  return(
    <SessionProvider session={session}>
      <Provider store = {store}>
        <RoomProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider> 
        </RoomProvider>
      </Provider>
  </SessionProvider>
)
}





