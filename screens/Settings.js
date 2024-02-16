import { useContext } from "react";
import { StoryContext } from "../context/stories-context";
import {
  FileUpload,
  JsonDownload,
} from "../components/UI/FileManagement";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import { PickerInput } from "../components/UI/Input";
import { languageOptions } from "../constants/languages";
import { useState } from "react";
import {
  GlobalContext,
  initialGlobalData,
} from "../context/global-context";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { storeData, cleanData } from "../util/storage";
import { fetchSentences, fetchStories } from "../util/http";
import { showInformativeAlert } from "../util/alert";
import {
  PlayContext,
  initialPlayData,
} from "../context/play-context";
// import OptionModal from "../components/UI/Modal";

const Settings = () => {
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const { stories, setStories } = useContext(StoryContext);
  const { playData, setPlayData } = useContext(PlayContext);
  const [numSentences, setNumSentences] = useState(
    String(globalConfig.numSentencesPerGame),
  );
  const [historyLength, setHistoryLength] = useState(
    String(globalConfig.historyLength),
  );
  const [showConfirmation, setShowConfirmation] = useState(
    globalConfig.showConfirmationDialog,
  );
  const [readingMode, setReadingMode] = useState(
    globalConfig.readingMode,
  );
  const [learningLanguage, setLearningLanguage] = useState(
    globalConfig.learningLanguage,
  );
  const [knownLanguage, setKnownLanguage] = useState(
    globalConfig.knownLanguage,
  );

  // Function to handle changes to the number of sentences
  const handleNumSentencesChange = (text) => {
    // TODO: remove setting globalContext here and only do it
    // when clicking on "Save settings". And only if validation passes
    setNumSentences(text);
    if (text === "") return;
    let number = NaN;
    try {
      number = parseInt(text);
    } catch (error) {
      console.log(error);
      return;
    }
    // check if nan
    if (isNaN(number)) return;

    // set globalContext too
    setGlobalConfig({
      ...globalConfig,
      numSentencesPerGame: number,
    });
  };

  // Function to handle changes to the number of sentences
  const handleHistoryLengthChange = (text) => {
    // TODO: remove setting globalContext here and only do it
    // when clicking on "Save settings". And only if validation passes
    setHistoryLength(text);
    if (text === "") return;
    setHistoryLength(text);
    let number = NaN;
    try {
      number = parseInt(text);
    } catch (error) {
      console.log(error);
      return;
    }
    // check if nan
    if (isNaN(number)) return;

    // set globalContext too
    setGlobalConfig({
      ...globalConfig,
      historyLength: number,
    });
  };

  // Function to handle the "Show confirmation" switch toggle
  const handleShowConfirmationToggle = (value) => {
    setShowConfirmation(value);
    setGlobalConfig({
      ...globalConfig,
      showConfirmationDialog: value,
    });
  };
  const handleReadingModeToggle = (value) => {
    setReadingMode(value);
    setGlobalConfig({
      ...globalConfig,
      readingMode: value,
    });
  };
  const handleLearningLanguageChange = (value) => {
    setLearningLanguage(value);
    setGlobalConfig({
      ...globalConfig,
      learningLanguage: value,
    });
  };
  const handleKnownLanguageChange = (value) => {
    setKnownLanguage(value);
    setGlobalConfig({
      ...globalConfig,
      knownLanguage: value,
    });
  };

  async function handleResetData() {
    // TODO: continue here to reset data with modal
    // console.log("Resetting data");
    // return;

    // set local storage stories to default stories
    const defaultStories = await fetchStories({
      try_from_disk: false,
    });
    cleanData();
    setStories(defaultStories);

    setPlayData(initialPlayData);
    setGlobalConfig(initialGlobalData);
    setNumSentences(String(initialGlobalData.numSentencesPerGame));
    setHistoryLength(String(initialGlobalData.historyLength));
    setShowConfirmation(initialGlobalData.showConfirmationDialog);

    showInformativeAlert(
      "Reset data",
      "All data reset to their default values.",
    );
  }

  async function handleSaveData() {
    // save settings to storage
    storeData("settings", JSON.stringify(globalConfig));
    showInformativeAlert("Settings saved");
  }

  async function handleUploadStories() {
    // overwrite data in context with uploaded file,
    // and save to storage
    const data = await FileUpload();

    if (data === null || data === undefined) {
      console.log(
        "handleUploadStories exiting since data is null or undefined",
      );
    }

    // 1. validate the data
    for (let key of Object.keys(data)) {
      console.log(key);
    }
    if (!("stories" in data && "sentences" in data)) {
      console.log(
        'Either "stories" or "sentences" not found in the uploaded data.',
      );
      return;
    }
    console.log("all good!");

    // 2. save stories into storage
    storeData("stories", JSON.stringify(data.stories));

    // 3. use setStories to update context
    // for sentences we don't have a context. We just request
    // for the sentences of the story to be played
    setStories(data.stories);

    // 4. for each story, save its sentences into storage
    if (Platform.OS === "web") {
      console.log(
        "For web we don't have enough space to save sentences. " +
          "So this won't work.",
      );
    } else {
      data.stories.map((story) => {
        if (!story.is_leaf) return; // ignore non-leaf stories
        const storySentences = data.sentences.filter(
          (sentence) => sentence.story_id === story.id,
        );
        const filename = `sentences_${story.id}`;
        console.log(
          `Saving ${storySentences.length} sentences ` +
            `for story ${story.title} with id ${story.id}` +
            ` to ${filename}`,
        );
        storeData(filename, JSON.stringify(storySentences));
      });
    }

    showInformativeAlert("Data uploaded");
  }

  async function handleDownloadStories() {
    // TODO: this won't work now since fetchSentences requires a storyId
    const sentences = fetchSentences({ try_from_disk: true });
    console.log(sentences);
    JsonDownload({ stories: stories, sentences: sentences });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Option: Number of sentences per game */}
      <View style={styles.optionContainer}>
        <Text style={styles.label}>Sentences per round</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleNumSentencesChange}
          value={numSentences}
          // TODO marc: maybe should use keyboardType="decimal-pad"?
          inputMode="numeric"
          maxLength={2}
        />
      </View>
      {/* Option: History length */}
      <View style={styles.optionContainer}>
        <Text style={styles.label}>History Length</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleHistoryLengthChange}
          value={historyLength}
          inputMode="numeric"
          maxLength={2}
        />
      </View>

      {/* Option: Show confirmation */}
      <View style={styles.optionContainer}>
        <Text style={styles.label}>Show confirmation box</Text>
        <Switch
          style={styles.switch}
          value={showConfirmation}
          onValueChange={handleShowConfirmationToggle}
        />
      </View>
      {/* Option: Reading mode */}
      <View style={styles.optionContainer}>
        <Text style={styles.label}>Reading mode</Text>
        <Switch
          style={styles.switch}
          value={readingMode}
          onValueChange={handleReadingModeToggle}
        />
      </View>
      <View style={[styles.optionContainer]}>
        <Text style={styles.label}>Learning language</Text>
        <PickerInput
          style={[styles.languagePicker]}
          pickerConfig={{
            onChangeText: handleLearningLanguageChange,
            value: learningLanguage,
            options: languageOptions,
          }}
        />
      </View>
      <View style={[styles.optionContainer, styles]}>
        <Text style={styles.label}>Known language</Text>
        <PickerInput
          style={[styles.languagePicker]}
          pickerConfig={{
            onChangeText: handleKnownLanguageChange,
            value: knownLanguage,
            options: languageOptions,
          }}
        />
      </View>
      {/* Manage data */}
      {/* height: "auto" is needed to overwrite optionContainer height */}
      <View
        style={[
          styles.optionContainer,
          { height: "auto", marginTop: "5%" },
        ]}
      >
        {/* TODO: continue here to use modal
        <OptionModal
          title={"Reset data"}
          names={["Stories", "Sentences"]}
          onConfirm={handleResetData}
        ></OptionModal> */}
        <Button style={styles.button} onPress={handleResetData}>
          {/*{TODO: center the text}*/}
          <Text style={styles.buttonLabel}>Reset Data</Text>
        </Button>
        <Button style={styles.button} onPress={handleSaveData}>
          {/*{TODO: center the text}*/}
          <Text style={styles.buttonLabel}>Save settings</Text>
        </Button>
      </View>
      {/* height: "auto" is needed to overwrite optionContainer height */}
      <View
        style={[
          styles.optionContainer,
          { height: "auto", marginVertical: "0" },
        ]}
      >
        <Button style={styles.button} onPress={handleUploadStories}>
          <Text style={styles.buttonLabel}>Upload stories</Text>
        </Button>
        <Button style={styles.button} onPress={handleDownloadStories}>
          <Text style={styles.buttonLabel}>Download stories</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: "2%",
    backgroundColor: GlobalStyles.colors.primary700,
    flexDirection: "column",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "10%",
    justifyContent: "space-between",
    height: 50,
    // backgroundColor: GlobalStyles.colors.error50,
    marginVertical: "1%",
  },
  label: {
    fontSize: 18,
    color: "white",
    width: "60%",
  },
  input: {
    height: 30,
    width: "10%",
    borderColor: "gray",
    color: "white",
    textAlign: "center",
    borderWidth: 1,
    // backgroundColor: "red",
    marginRight: "5%",
  },
  switch: {
    width: "10%",
    // TODO: not clear to me why we need 5.5 to align with
    // the input. I would expect 5%.
    marginRight: "5.5%",
    // backgroundColor: "red",
  },
  buttonLabel: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },
  languagePicker: {
    width: Platform.OS === "web" ? "20%" : "42%",
  },
  button: {
    fontSize: 18,
    color: "white",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    margin: 16,
    width: "40%",
  },
});

export default Settings;
