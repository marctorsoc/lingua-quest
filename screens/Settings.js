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
} from "react-native";
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
    String(globalConfig.numSentencesPerGame)
  );
  const [historyLength, setHistoryLength] = useState(
    String(globalConfig.historyLength)
  );
  const [showConfirmation, setShowConfirmation] = useState(
    globalConfig.showConfirmationDialog
  );
  const [showTotals, setShowTotals] = useState(
    globalConfig.showTotals
  );

  // Function to handle changes to the number of sentences
  const handleNumSentencesChange = (text) => {
    const numSentences = parseInt(text);
    setNumSentences(numSentences);
    // set globalContext too
    setGlobalConfig({
      ...globalConfig,
      numSentencesPerGame: numSentences,
    });
  };

  // Function to handle changes to the number of sentences
  const handleHistoryLengthChange = (text) => {
    const historyLength = parseInt(text);
    setHistoryLength(historyLength);
    // set globalContext too
    setGlobalConfig({
      ...globalConfig,
      historyLength: historyLength,
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
  const handleShowTotalsToggle = (value) => {
    setShowTotals(value);
    setGlobalConfig({
      ...globalConfig,
      showTotals: value,
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
      "All data reset to their default values."
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

    // 1. validate the data
    for (let key of Object.keys(data)) {
      console.log(key);
    }
    if (!("stories" in data && "sentences" in data)) {
      console.log(
        'Either "stories" or "sentences" not found in the uploaded data.'
      );
      return;
    }
    console.log("all good!");
    return;

    // 2. save stories into storage
    storeData("stories", JSON.stringify(data.stories));

    // 3. for each story, save its sentences into storage
    data.stories.map((story) => {
      if (!story.is_leaf) return; // ignore non-leaf stories
      const storySentences = data.sentences.filter(
        (sentence) => sentence.story_id === story.id
      );
      const filename = `sentences_${story.id}`;
      console.log(
        `Saving ${storySentences.length} sentences ` +
          `for story ${story.title} with id ${story.id}` +
          ` to ${filename}`
      );
      storeData(filename, JSON.stringify(storySentences));
    });

    // 4. use setStories to update context
    // for sentences we don't have a context. We just request
    // for the sentences of the story to be played
    setStories(data.stories);

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
        <Text style={styles.label}>Number of sentences per game</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleNumSentencesChange}
          value={numSentences}
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
      {/* Option: Show totals */}
      <View style={styles.optionContainer}>
        <Text style={styles.label}>Show totals</Text>
        <Switch
          style={styles.switch}
          value={showTotals}
          onValueChange={handleShowTotalsToggle}
        />
      </View>
      {/* Manage data */}
      <View style={styles.optionContainer}>
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
      <View style={styles.optionContainer}>
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
    paddingHorizontal: "15%",
    justifyContent: "space-between",
    height: 80,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  label: {
    fontSize: 18,
    color: "white",
    paddingHorizontal: 16,
  },
  buttonLabel: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },
  input: {
    height: 40,
    width: 50,
    borderColor: "gray",
    color: "white",
    textAlign: "center",
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  switch: {
    alignSelf: "center",
    marginRight: 8,
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
