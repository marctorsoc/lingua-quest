import React, { createContext, useReducer } from "react";

// Define the initial state for the stories
const initialState = {
  stories: [],
};

// Create the context
export const StoryContext = createContext(initialState);

// Define the reducer function
const storiesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        stories: [...state.stories, action.payload],
      };
    case "SET":
      return {
        ...state,
        stories: action.payload,
      };
    case "UPDATE":
      return {
        ...state,
        stories: state.stories.map((story) =>
          story.id === action.payload.id ? action.payload : story
        ),
      };
    case "DELETE":
      return {
        ...state,
        stories: state.stories.filter(
          (story) => story.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

// Create the StoriesProvider component
export const StoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storiesReducer, initialState);

  // Define action creators
  const addStory = (story) => {
    dispatch({ type: "ADD", payload: story });
  };

  const setStories = (stories) => {
    dispatch({ type: "SET", payload: stories });
  };

  const updateStory = (story) => {
    dispatch({ type: "UPDATE", payload: story });
  };

  const deleteStory = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  return (
    <StoryContext.Provider
      value={{
        stories: state.stories,
        addStory,
        setStories,
        updateStory,
        deleteStory,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

// export const StoryContext = createContext({
//   stories: [],
//   addStory: ({ name, learning_lc, known_lc }) => {},
//   setStories: (stories) => {},
//   deleteStory: (id) => {},
//   updateStory: (id, { name, learning_lc, known_lc, done }) => {},
// });

// function storyReducer(state, action) {
//   switch (action.type) {
//     case "ADD":
//       return [action.payload, ...state];
//     case "SET":
//       // TODO marc: what's happening here?
//       // const inverted = action.payload.reverse();
//       // return inverted;
//       return [...action.payload];
//     case "UPDATE":
//       const updatableStoryIndex = state.findIndex(
//         (story) => story.id === action.payload.id
//       );
//       const updatableStory = state[updatableStoryIndex];
//       const updatedItem = {
//         ...updatableStory,
//         ...action.payload.data,
//       };
//       const updatedStories = [...state]; // make a copy of the state
//       updatedStories[updatableStoryIndex] = updatedItem;
//       return updatedStories;
//     case "DELETE":
//       return state.filter((story) => story.id !== action.payload);
//     default:
//       return state;
//   }
// }

// export function StoryContextProvider({ children }) {
//   const [storyState, dispatch] = useReducer(storyReducer, []);

//   function addStory(storyData) {
//     dispatch({ type: "ADD", payload: storyData });
//   }

//   function setStories(stories) {
//     dispatch({ type: "SET", payload: stories });
//   }

//   function deleteStory(id) {
//     dispatch({ type: "DELETE", payload: id });
//   }

//   function updateStory(id, storyData) {
//     dispatch({
//       type: "UPDATE",
//       payload: { id: id, data: storyData },
//     });
//   }

//   const value = {
//     stories: storyState,
//     setStories: setStories,
//     addStory: addStory,
//     deleteStory: deleteStory,
//     updateStory: updateStory,
//   };

//   return (
//     <StoryContext.Provider value={value}>
//       {children}
//     </StoryContext.Provider>
//   );
// }

// export default StoryContextProvider;
