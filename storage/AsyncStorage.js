import AsyncStorage from '@react-native-async-storage/async-storage'
async function GetFromStorage(req) {
    try {
        const value = await AsyncStorage.getItem(req);
        return value;
    } catch (error) {
        return error.message;

    }
}
async function SetToStorage(key, value) {
    try {
        await AsyncStorage.setItem(key, value)
        console.log(`${key} is set to ${value}`);
    } catch (error) {
        return error.message;
    }
}
async function RemoveFromStorage(key, value) {
    try {
        await AsyncStorage.removeItem(key)
        console.log(`${key} is removed`);
    } catch (error) {
        return error.message;
    }
}

export default { GetFromStorage, SetToStorage, RemoveFromStorage };