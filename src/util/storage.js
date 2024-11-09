import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeData(key, value) {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    // saving error
    console.error("Error storing with AsyncStorage:", error);
  }
}

export async function loadData(key) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    // saving error
    console.error(`Error getting ${key} with AsyncStorage:`, error);
  }
}

export async function cleanAllData() {
  try {
    await AsyncStorage.clear();
    // console.log('AsyncStorage is cleaned.');
  } catch (error) {
    console.error("Error cleaning AsyncStorage:", error);
  }
}

export async function cleanData(key) {
  try {
    await AsyncStorage.removeItem(key);
    // console.log('AsyncStorage is cleaned.');
  } catch (error) {
    console.error(
      "Error cleaning key " + key + "from AsyncStorage:",
      error,
    );
  }
}

export async function getUserNames() {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const userNames = keys.filter((key) =>
      key.startsWith("globalConfig-"),
    );
    return userNames.map((key) => key.replace("globalConfig-", ""));
  } catch (error) {
    console.error("Error getting user names:", error);
    return [];
  }
}
