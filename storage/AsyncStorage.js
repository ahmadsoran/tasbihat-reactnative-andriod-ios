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
    } catch (error) {
        return error.message;
    }
}
async function RemoveFromStorage(key) {
    try {
        await AsyncStorage.removeItem(key)
    } catch (error) {
        return error.message;
    }
}
async function multiSetToStorage(key1, value1, key2, value2) {
    try {
        await AsyncStorage.multiSet([[key1, value1], [key2, value2]])
    } catch (error) {
        return error.message;
    }

}
async function multiGetFromStorage(key1, key2) {
    try {
        const value = await AsyncStorage.multiGet([key1, key2])
        return value;
    } catch (error) {
        return error.message;
    }
}
export default { GetFromStorage, SetToStorage, RemoveFromStorage, multiSetToStorage, multiGetFromStorage };