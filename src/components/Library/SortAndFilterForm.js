import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { GlobalStyles } from "../../constants/styles";
import { StoryContext } from "../../context/stories-context";
import { useTranslation } from "react-i18next";
import { GameLanguagePickers } from "../UI/GameLanguagePickers";
import { CancelApplyButtons } from "../UI/CancelApplyButtons";

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
  const { t } = useTranslation();

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

  return (
    <View style={styles.form}>
      <GameLanguagePickers
        inputLearningLanguage={inputLearningLanguage}
        setInputLearningLanguage={setInputLearningLanguage}
        inputKnownLanguage={inputKnownLanguage}
        setInputKnownLanguage={setInputKnownLanguage}
      ></GameLanguagePickers>
      <CancelApplyButtons
        onCancel={onCancel}
        onApply={onsubmitInterim}
        applyButtonLabel={t("GLOBAL.APPLY")}
      ></CancelApplyButtons>
      <View style={{ alignItems: "center", padding: 10 }}>
        <Text style={{ color: GlobalStyles.colors.gray500 }}>
          {t("FILTER.NUM_STORIES")}: {numFilteredStories}
        </Text>
      </View>
    </View>
  );
}

export default SortAndFilterForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    alignItems: "center",
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
    zIndex: -100,
  },
});
