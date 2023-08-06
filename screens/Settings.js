import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LibraryOutput from "../components/Library/LibraryOutput";
import { StoryContext } from "../context/stories-context";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import { useState } from "react";
import {
  GlobalContext,
  initialGlobalData,
} from "../context/global-context";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { storeData, cleanData } from "../util/storage";
import { fetchStories } from "../util/http";
import alert from "../util/alert";
import {
  PlayContext,
  initialPlayData,
} from "../context/play-context";

const Settings = () => {
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const { stories, setStories } = useContext(StoryContext);
  const { playData, setPlayData } = useContext(PlayContext);
  const [numSentences, setNumSentences] = useState(
    globalConfig.numSentencesPerGame
  );
  const [historyLength, setHistoryLength] = useState(
    globalConfig.historyLength
  );
  const [showConfirmation, setShowConfirmation] = useState(
    globalConfig.showConfirmationDialog
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

  async function handleResetData() {
    // set local storage stories to default stories
    const defaultStories = await fetchStories({
      try_from_disk: false,
    });
    cleanData();
    setStories(defaultStories);

    setPlayData(initialPlayData);
    setGlobalConfig(initialGlobalData);
    setNumSentences(initialGlobalData.numSentencesPerGame);
    setHistoryLength(initialGlobalData.historyLength);
    setShowConfirmation(initialGlobalData.showConfirmationDialog);

    alert(
      "Reset data",
      "All data reset to their default values.",
      [
        {
          text: "Ok",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  }

  async function handleSaveData() {
    // save settings to storage
    storeData("settings", JSON.stringify(globalConfig));

    alert(
      "Save settings",
      "Settings saved",
      [
        {
          text: "Ok",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
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

      {/* Option 2: Show confirmation */}
      <View style={styles.optionContainer}>
        <Text style={styles.label}>Show confirmation box</Text>
        <Switch
          style={styles.switch}
          value={showConfirmation}
          onValueChange={handleShowConfirmationToggle}
        />
      </View>
      {/* Manage data */}
      <View style={styles.optionContainer}>
        <Button style={styles.button} onPress={handleResetData}>
          {/*{TODO: center the text}*/}
          <Text style={styles.label}>Reset all data</Text>
        </Button>
        <Button style={styles.button} onPress={handleSaveData}>
          {/*{TODO: center the text}*/}
          <Text style={styles.label}>Save settings</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingHorizontal: "20%",
    justifyContent: "center",
    backgroundColor: GlobalStyles.colors.primary700,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "space-between",
    height: 40,
  },
  label: {
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
  },
});

export default Settings;
