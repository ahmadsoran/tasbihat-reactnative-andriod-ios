import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Drk = async () => {
    try {

        return await AsyncStorage.getItem('isDarkMode')

    } catch (e) {
        console.log(e)
    }
}
const initialState = {
    Drk,
}

export const DarkModeSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setDarkMode: (state, action) => {
            state.isDarkMode = action.payload
            async () => {
                try {
                    await AsyncStorage.setItem('isDarkMode', state.isDarkMode);

                } catch (error) {
                    console.log(error)
                }
            }
        },
    },
})

export const { setDarkMode } = DarkModeSlice.actions

export default DarkModeSlice.reducer