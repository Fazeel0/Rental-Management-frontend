import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist'

const persistConfig = {
    key: "root",
    storage
}

export const store = configureStore({
    reducer: {
        user: persistReducer(persistConfig, userReducer),

    },
})