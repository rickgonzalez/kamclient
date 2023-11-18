'use client;'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { store } from '../store'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
 
  useEffect(() => {
    import('preline')
  }, [])

  return(
    <Provider store = {store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider> 
    </Provider>
  )
}





