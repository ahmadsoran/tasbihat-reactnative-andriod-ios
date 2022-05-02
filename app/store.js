import { configureStore } from '@reduxjs/toolkit'
import DarkModeSlice from '../slices/DarkModeSlice'
export const store = configureStore({
    reducer: {
        DarkModeSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,

    }),

})