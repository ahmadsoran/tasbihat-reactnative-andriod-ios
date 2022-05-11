import { createSlice } from '@reduxjs/toolkit'



export const ReloaderSlice = createSlice({
    name: 'counter',
    initialState: {
        Reload: false,
        openBottomSheet: false,
    },
    reducers: {
        setReload: (state, action) => {
            state.Reload = action.payload
        },
        setOpenBottomSheet: (state, action) => {
            state.openBottomSheet = action.payload
        }
    },
})

export const { setReload, setOpenBottomSheet } = ReloaderSlice.actions

export default ReloaderSlice.reducer