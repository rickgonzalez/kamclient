import { setupListeners } from '@reduxjs/toolkit/query'
import { providersApi} from './services/providers'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './services/reducers/userSlice'
import docReducer from './services/reducers/docSlice'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [providersApi.reducerPath]: providersApi.reducer,
    user: userReducer,
    doc: docReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(providersApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

