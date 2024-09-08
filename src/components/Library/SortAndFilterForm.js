import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { Platform } from "react-native";
import { PickerInput } from "../UI/Input";
import Button from "../UI/Button";
import { GlobalStyles, ScreensStyles } from "../../constants/styles";
import { languageOptions } from "../../constants/languages";
import { storyTypeOptions } from "../../constants/story_type";
import { StoryContext } from "../../context/stories-context";

function getStoriesForFilters(stories, filters) {
  return stories.filter(
    (story) =>
      story.is_leaf &&
      // TODO: enable filtering by story type
      // story.storyType === filters.storyType.value &&
      Object.keys(story.languages).includes(
        filters.learningLanguage,
      ) &&
      story.languages[filters.learningLanguage].includes(
        filters.knownLanguage,
      ),
  );
}

function SortAndFilterForm({ onCancel, onSubmit, defaultValues }) {
  const { stories } = useContext(StoryContext);

  // TODO: only show options for languages / types that are in the stories
  // TODO: add options to sort
  const [inputStoryType, setInputStoryType] = useState(
    defaultValues ? defaultValues.storyType : "subtitle",
  );
  const [inputLearningLanguage, setInputLearningLanguage] = useState(
    defaultValues ? defaultValues.learningLanguage : "lt",
  );
  const [inputKnownLanguage, setInputKnownLanguage] = useState(
    defaultValues ? defaultValues.knownLanguage : "en",
  );
  const inputs = {
    storyType: inputStoryType,
    learningLanguage: inputLearningLanguage,
    knownLanguage: inputKnownLanguage,
  };
  // TODO: why we cannot do it like this? the picker
  // stops setting value 🤷‍♂️
  // const [inputs, setInputs] = useState({
  //   learningLanguage: defaultValues
  //     ? defaultValues.learningLanguage
  //     : "lt",
  //   knownLanguage: defaultValues ? defaultValues.knownLanguage : "en",
  //   storyType: defaultValues ? defaultValues.storyType : "all",
  // });

  const [numFilteredStories, setNumFilteredStories] = useState(
    getStoriesForFilters(stories, inputs).length,
  );

  // TODO: can this be solved without a useEffect?
  useEffect(() => {
    setNumFilteredStories(
      getStoriesForFilters(stories, inputs).length,
    );
  }, [inputs]);

  function onsubmitInterim() {
    const filterData = {
      storyType: inputs.storyType,
      learningLanguage: inputs.learningLanguage,
      knownLanguage: inputs.knownLanguage,
    };

    onSubmit({
      knownLanguage: filterData.knownLanguage,
      learningLanguage: filterData.learningLanguage,
      storyType: filterData.storyType,
    });
  }
  const languageOptionsProcessed = languageOptions.map((item) => ({
    ...item,
    label: item.longName,
  }));
  // translations only in English and Spanish
  const translationOptionsProcessed = languageOptionsProcessed.filter(
    (item) => ["en", "es"].includes(item.value),
  );

  return (
    <View style={styles.form}>
      <View style={styles.inputsRow}>
        <PickerInput
          style={styles.picker}
          label="Story Type"
          onChangeText={(text) => setInputStoryType(text)}
          zIndex={3000}
          value={inputStoryType}
          options={storyTypeOptions}
          disabled={true}
        />
        <PickerInput
          style={styles.picker}
          label="Learning"
          onChangeText={(text) => setInputLearningLanguage(text)}
          zIndex={2000}
          value={inputLearningLanguage}
          options={languageOptionsProcessed}
        />
        <PickerInput
          style={styles.picker}
          label="Translations"
          onChangeText={(text) => setInputKnownLanguage(text)}
          zIndex={1000}
          value={inputKnownLanguage}
          options={translationOptionsProcessed}
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
    zIndex: 500,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -100,
  },
  picker: {
    width: Platform.OS === "web" ? "32%" : "45%",
    padding: 5,
  },
});
