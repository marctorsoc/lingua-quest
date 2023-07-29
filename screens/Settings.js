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
  const [showConfirmation, setShowConfirmation] = useState(
    globalConfig.showConfirmationDialog
  );

  // Function to handle changes to the number of sentences
  const handleNumSentencesChange = (text) => {
    setNumSentences(text);
    // set globalContext too
    setGlobalConfig({ ...globalConfig, numSentencesPerGame: text });
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Option 1: Number of sentences per game */}
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

      {/* Option 2: Show confirmation */}
      <View style={styles.optionContainer}>
        <Text style={styles.label}>Show confirmation box</Text>
        <Switch
          style={styles.switch}
          value={showConfirmation}
          onValueChange={handleShowConfirmationToggle}
        />
      </View>
      {/* Option 3: Reset games */}
      <View style={styles.optionContainer}>
        <Text style={styles.label}>Reset games</Text>
        <Button style={styles.button} onPress={handleResetData}>
          {/*{TODO: center the "Go!" text}*/}
          <Text style={styles.label}>Go!</Text>
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
    width: 60,
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
  },
});

export default Settings;
