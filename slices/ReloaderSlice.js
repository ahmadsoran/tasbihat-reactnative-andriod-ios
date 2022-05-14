import { createSlice } from '@reduxjs/toolkit'



export const ReloaderSlice = createSlice({
    name: 'counter',
    initialState: {
        Reload: false,
        openBottomSheet: false,
        openSuraList: false,
        suraNow: '',
    },
    reducers: {
        setReload: (state, action) => {
            state.Reload = action.payload
        },
        setOpenBottomSheet: (state, action) => {
            state.openBottomSheet = action.payload
        },
        setOpenSuraList: (state, action) => {
            state.openSuraList = action.payload
        }
    },
})

export const { setReload, setOpenBottomSheet, setOpenSuraList } = ReloaderSlice.actions

export default ReloaderSlice.reducer