import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import data from "../assets/data_2023_06_26";

const BACKEND_URL =
  // "https://expense-app-30907-default-rtdb.firebaseio.com";
  "https://caption-master-cd8b4-default-rtdb.europe-west1.firebasedatabase.app/";

export async function fetchStories(props = { try_from_disk: true }) {
  const { try_from_disk } = props;
  try {
    let stories_from_disk = null;
    if (try_from_disk) {
      console.log("loading stories from disk");
      const jsonValue = await AsyncStorage.getItem("stories");
      stories_from_disk = JSON.parse(jsonValue);
    }
    if (stories_from_disk !== null && stories_from_disk.length > 0) {
      console.log("loaded stories from disk");
      return stories_from_disk;
    }
  } catch (e) {
    // error reading value
  }
  console.log("loaded from mock");
  return [...data.stories];
}

// export async function storeExpense(expenseData) {
//   const response = await axios.post(
//     BACKEND_URL + "/expenses.json",
//     expenseData
//   );
//   const id = response.data.name;
//   return id;
// }

// export async function fetchExpenses() {
//   // const response = await axios.get(BACKEND_URL + "/expenses.json");

//   const expenses = [];
//   return expenses;

//   for (const key in response.data) {
//     const expenseObj = {
//       id: key,
//       amount: response.data[key].amount,
//       date: new Date(response.data[key].date),
//       description: response.data[key].description,
//     };
//     expenses.push(expenseObj);
//   }

//   return expenses;
// }

// export function updateExpense(id, expenseData) {
//   return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
// }

// export function deleteExpense(id) {
//   return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
// }
