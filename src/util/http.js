import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import data from "../../assets/data.json";
import { loadData } from "./storage";

const BACKEND_URL =
  // "https://expense-app-30907-default-rtdb.firebaseio.com";
  "https://lingua-quest-cd8b4-default-rtdb.europe-west1.firebasedatabase.app/";

export async function fetchStories(
  props = { try_from_disk: true, userId: undefined }
) {
  const { try_from_disk, userId } = props;

  if (!try_from_disk) {
    console.log("loaded stories with default values");
    return [...data.stories];
  }
  try {
    let stories_from_disk = null;
    console.log("loading stories for user " + userId);
    const jsonValue = await loadData("stories-" + userId);
    stories_from_disk = JSON.parse(jsonValue);
    if (stories_from_disk !== null && stories_from_disk.length > 0) {
      console.log("loaded stories from disk for user " + userId);
      return stories_from_disk;
    }
  } catch (e) {
    // error reading value
  }
  console.log("loaded stories with default values");
  return [...data.stories];
}

export async function fetchSentences(
  storyId,
  LearningLanguage,
  try_from_disk = false
) {
  if (storyId === undefined)
    throw new Error("fetchSentences: storyId cannot be undefined");

  let sentencesForStory = null;
  if (try_from_disk) {
    try {
      console.log("loading sentences from disk");
      const jsonValue = await AsyncStorage.getItem(
        `sentences_${storyId}_${LearningLanguage}`
      );
      sentencesForStory = JSON.parse(jsonValue);

      if (
        sentencesForStory !== null &&
        sentencesForStory.length > 0
      ) {
        console.log("loaded sentences from disk");
        return sentencesForStory;
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  }
  console.log("loaded from mock");
  sentencesForStory = data.sentences.filter(
    (sentence) =>
      sentence.story_id === storyId &&
      sentence.learning_lc === LearningLanguage
  );

  return [...sentencesForStory];
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
