import { configureStore } from '@reduxjs/toolkit'
import ReloaderSlice from '../slices/ReloaderSlice'
export const store = configureStore({
    reducer: {
        ReloaderSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,

    }),

})