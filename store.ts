import { setupListeners } from '@reduxjs/toolkit/query'
import { providersApi} from './services/providers'
import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './services/reducers/playerSlice'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [providersApi.reducerPath]: providersApi.reducer,
    player: playerReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(providersApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

