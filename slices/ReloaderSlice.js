import { createSlice } from '@reduxjs/toolkit'



export const ReloaderSlice = createSlice({
    name: 'counter',
    initialState: {
        Reload: false,
    },
    reducers: {
        setReload: (state, action) => {
            state.Reload = action.payload
        }
    },
})

export const { setReload } = ReloaderSlice.actions

export default ReloaderSlice.reducer