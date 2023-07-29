import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeData(key, value) {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
}

export async function cleanData() {
  try {
    await AsyncStorage.clear();
    // console.log('AsyncStorage is cleaned.');
  } catch (error) {
    console.error("Error cleaning AsyncStorage:", error);
  }
}
