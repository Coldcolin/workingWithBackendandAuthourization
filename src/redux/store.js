import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
  key: 'root',
  storage,
}


const persistedReducer = persistReducer(persistConfig, 
authReducer
)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)