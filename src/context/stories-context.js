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
          story.id === action.payload.id ? action.payload : story,
        ),
      };
    case "DELETE":
      return {
        ...state,
        stories: state.stories.filter(
          (story) => story.id !== action.payload,
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
