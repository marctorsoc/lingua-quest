import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useContext, useLayoutEffect } from "react";
import { GlobalContext } from "../../context/global-context";
import { storeData } from "../../util/storage";
import {
  stories,
  setStories,
  StoryContext,
} from "../../context/stories-context";
import ErrorOverlay from "../UI/ErrorOverlay";
import { Platform } from "react-native";
import { Input, PickerInput } from "../UI/Input";
import Button from "../UI/Button";
import { GlobalStyles, ScreensStyles } from "../../constants/styles";
import { languageOptions } from "../../constants/languages";
import { storyTypeOptions } from "../../constants/story_type";

function getStoriesForFilters(stories, filters) {
  return stories.filter(
    (story) =>
      story.is_leaf &&
      // TODO: enable filtering by story type
      // story.storyType === filters.storyType.value &&
      story.learning_lc === filters.learningLanguage.value &&
      story.known_lc === filters.knownLanguage.value,
  );
}

function SortAndFilterForm({ onCancel, onSubmit, defaultValues }) {
  const { stories } = useContext(StoryContext);

  // TODO: only show options for languages / types that are in the stories
  // TODO: add options to sort
  const [inputs, setInputs] = useState({
    storyType: {
      value: defaultValues ? defaultValues.storyType : "all",
      isValid: true,
    },
    learningLanguage: {
      value: defaultValues ? defaultValues.learningLanguage : "lt",
      isValid: true,
    },
    knownLanguage: {
      value: defaultValues ? defaultValues.knownLanguage : "en",
      isValid: true,
    },
  });
  // TODO: use this below to show how many stories apply
  // before actually showing the filter
  const [numFilteredStories, setNumFilteredStories] = useState(
    getStoriesForFilters(stories, inputs).length,
  );

  // TODO: can this be solved without a useEffect?
  useEffect(() => {
    // TODO: validate input and return early if invalid
    setNumFilteredStories(
      getStoriesForFilters(stories, inputs).length,
    );
  }, [inputs]);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    const new_dict = {
      value: enteredValue,
      isValid: true,
    };
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: new_dict,
      };
    });
  }

  function onsubmitInterim() {
    const filterData = {
      storyType: inputs.storyType.value,
      learningLanguage: inputs.learningLanguage.value,
      knownLanguage: inputs.knownLanguage.value,
    };

    const storyTypeIsValid = true;
    const learningLcIsValid = true;
    const knownLcIsValid = true;

    setInputs((curInputs) => ({
      ...curInputs,
      storyType: {
        value: filterData.storyType,
        isValid: storyTypeIsValid,
      },
      learningLanguage: {
        value: filterData.learningLanguage,
        isValid: learningLcIsValid,
      },
      knownLanguage: {
        value: filterData.knownLanguage,
        isValid: knownLcIsValid,
      },
    }));
    if (!storyTypeIsValid || !learningLcIsValid || !knownLcIsValid) {
      return;
    }

    onSubmit({
      knownLanguage: filterData.knownLanguage,
      learningLanguage: filterData.learningLanguage,
      storyType: filterData.storyType,
    });
  }

  return (
    <View style={styles.form}>
      <View style={styles.inputsRow}>
        <PickerInput
          style={[styles.rowInput, styles.picker]}
          label="Story Type"
          pickerConfig={{
            onChangeText: (text) =>
              inputChangedHandler("storyType", text),
            value: inputs.storyType.value,
            options: storyTypeOptions,
          }}
        />
        <PickerInput
          style={[styles.rowInput, styles.picker]}
          label="Learning"
          pickerConfig={{
            onChangeText: (text) =>
              inputChangedHandler("learningLanguage", text),
            value: inputs.learningLanguage.value,
            options: languageOptions,
          }}
        />
        <PickerInput
          style={[styles.rowInput, styles.picker]}
          label="From"
          pickerConfig={{
            onChangeText: (text) =>
              inputChangedHandler("knownLanguage", text),
            value: inputs.knownLanguage.value,
            options: languageOptions,
          }}
        />
      </View>
      <View style={styles.buttons}>
        <Button style={ScreensStyles.button} onPress={onCancel}>
          <Text style={{ color: "white" }}>Cancel</Text>
        </Button>
        <Button
          style={ScreensStyles.button}
          onPress={onsubmitInterim}
          disabled={numFilteredStories === 0}
        >
          <Text style={{ color: "white" }}>Apply</Text>
        </Button>
      </View>
      <View style={{ alignItems: "center", padding: 10 }}>
        <Text style={{ color: "white" }}>
          Num stories: {numFilteredStories}
        </Text>
      </View>
    </View>
  );
}

export default SortAndFilterForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  inputsRow: {
    flexDirection: "column",
    alignItems: "center",
  },
  rowInput: {
    padding: 5,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    width: Platform.OS === "web" ? "20%" : "42%",
  },
});
