import { useContext, useEffect } from "react";
import { StoryContext } from "../../src/context/stories-context";
import {
  FileUpload,
  JsonDownload,
} from "../../src/components/UI/FileManagement";

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
import { GlobalContext } from "../../src/context/global-context";
import {
  GlobalStyles,
  ScreensStyles,
} from "../../src/constants/styles";
import Button from "../../src/components/UI/Button";
import {
  storeData,
  getUserNames,
  cleanData,
  loadData,
} from "../../src/util/storage";
import { showInformativeAlert } from "../../src/util/alert";
import { PlayContext } from "../../src/context/play-context";
import { useRouter } from "expo-router";
import i18next from "i18next";
import DataRestoreModal from "../../src/components/Settings/DataRestoreModal";
import { useTranslation } from "react-i18next";
import TutorialOverlay from "../../src/components/UI/TutorialOverlay";
import { TUTORIAL_STAGES } from "../../src/constants/tutorial_stages";
// import OptionModal from "../components/UI/Modal";

const Settings = () => {
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const { playData } = useContext(PlayContext); // just used for debugging
  const [showRestoreModal, setShowRestoreModal] = useState(false);

  const [numSentences, setNumSentences] = useState(
    globalConfig.numSentencesPerGame
  );
  const router = useRouter();
  const { t } = useTranslation();
  const [historyLength, setHistoryLength] = useState(
    globalConfig.historyLength
  );

  const [readingMode, setReadingMode] = useState(
    globalConfig.readingMode
  );

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getUserNames().then((users) => {
      setAllUsers(users);
    });
    setNumSentences(globalConfig.numSentencesPerGame);
    setHistoryLength(globalConfig.historyLength);
    setReadingMode(globalConfig.readingMode);

    // enabling this creates an infinite loop. Careful!
    // setInputAppLanguage(globalConfig.appLanguage);

    if (i18next.language != globalConfig.appLanguage) {
      i18next.changeLanguage(globalConfig.appLanguage);
    }

    // setIsFetching(false);
  }, [globalConfig]);
  // console.log("allUsers: ", allUsers);

  // Function to handle changes to the number of sentences
  const handleNumSentencesChange = (text) => {
    setNumSentences(text);
    // console.log(text);
    // console.log(typeof text);
    if (text === "") {
      return;
    }
    let number = NaN;
    try {
      number = parseInt(text);
    } catch (error) {
      console.log(error);
      showInformativeAlert(
        "Error",
        "Please enter a valid number for the number of sentences."
      );
      return;
    }
    // check if nan
    if (isNaN(number)) {
      showInformativeAlert(
        "Error",
        "Please enter a valid number for the number of sentences."
      );
      return;
    }

    setNumSentences(number);

    // set globalContext too
    setGlobalConfig({
      ...globalConfig,
      numSentencesPerGame: number,
    });
  };

  // Function to handle changes to the number of sentences
  const handleHistoryLengthChange = (text) => {
    setHistoryLength(text);
    // console.log(text);
    // console.log(typeof text);
    if (text === "") {
      return;
    }
    let number = NaN;
    try {
      number = parseInt(text);
    } catch (error) {
      console.log(error);
      showInformativeAlert(
        "Error",
        "Please enter a valid number for the history length."
      );
      return;
    }
    // check if nan
    if (isNaN(number)) {
      showInformativeAlert(
        "Error",
        "Please enter a valid number for the history length."
      );
      return;
    }

    setHistoryLength(number);

    // set globalContext too
    setGlobalConfig({
      ...globalConfig,
      historyLength: number,
    });
  };

  const handleReadingModeToggle = (value) => {
    setReadingMode(value);
    setGlobalConfig({
      ...globalConfig,
      readingMode: value,
    });
  };

  // async function handleRestoreData() {
  //   // TODO: continue here to reset data with modal
  //   // console.log("Resetting data");
  //   // return;

  //   // set local storage stories to default stories
  //   const defaultStories = await fetchStories({
  //     try_from_disk: false,
  //   });
  //   cleanData();
  //   setStories(defaultStories);

  //   setPlayData(initialPlayData);
  //   setGlobalConfig(initialGlobalData);
  //   setNumSentences(String(initialGlobalData.numSentencesPerGame));
  //   setHistoryLength(String(initialGlobalData.historyLength));

  //   // TOOD: update this message to be default if it is default
  //   // or the user name if it is not default
  //   showInformativeAlert(
  //     "Restore data",
  //     "All data reset to their default values.",
  //   );
  //   // TODO: navigate to / only if factory reset.
  //   // otherwise, to library
  //   router.navigate("/");
  // }

  const handleRestoreOption = (selectedOption) => {
    // Restore from selected storage key

    const currentUser = globalConfig.userId;
    if (selectedOption == currentUser) {
      return;
    }
    loadData("globalConfig-" + selectedOption)
      .then((globalConfigFromDisk) => {
        const parsedConfig = JSON.parse(globalConfigFromDisk);
        setGlobalConfig(parsedConfig);
        storeData("lastUser", selectedOption);
      })
      .then(() => {
        showInformativeAlert(
          t("SETTINGS.ALERT_RESTORED_DATA_FOR") + selectedOption
        );
        setShowRestoreModal(false);
      })
      .catch((error) => {
        console.error("Error restoring data:", error);
        showInformativeAlert(t("SETTINGS.ALERT_ERROR_RESTORING"));
      });
  };

  const handleDeleteData = (selectedOption) => {
    // TODO: continue here to reset data with modal
    // console.log("Resetting data");
    // return;
    const currentUser = globalConfig.userId;
    if (selectedOption == currentUser) {
      showInformativeAlert(t("SETTINGS.ALERT_ERROR_DELETING"));
      return;
    }

    cleanData("globalConfig-" + selectedOption);
    cleanData("stories-" + selectedOption);
    setAllUsers(allUsers.filter((user) => user !== selectedOption));
    showInformativeAlert(
      t("SETTINGS.ALERT_DELETED_DATA_FOR") + selectedOption
    );
    setShowRestoreModal(false);
  };

  async function handleRestoreData() {
    setShowRestoreModal(true);
  }

  async function handleSaveData() {
    // save settings to storage
    storeData(
      "globalConfig-" + globalConfig.userId,
      JSON.stringify(globalConfig)
    );
    showInformativeAlert(
      t("SETTINGS.ALERT_SETTINGS_SAVED_FOR") +
        globalConfig.userId +
        "`"
    );
  }

  async function handleWatchTutorial() {
    setGlobalConfig({
      ...globalConfig,
      tutorialStage: 0,
    });
    router.navigate("library");
  }

  // for tutorial
  const highlightStyle = {
    borderColor: GlobalStyles.colors.error,
    borderWidth: 1,
    paddingVertical: 5,
    paddingLeft: "3%",
    marginLeft: "8%",
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DataRestoreModal
        isVisible={showRestoreModal}
        onClose={() => setShowRestoreModal(false)}
        onRestore={handleRestoreOption}
        onDelete={handleDeleteData}
        options={allUsers}
        currentOption={globalConfig.userId}
      />
      {/* Option: Number of sentences per game */}
      <View
        style={[
          styles.optionContainer,
          globalConfig.tutorialStage ==
            TUTORIAL_STAGES.SENTS_PER_ROUND && highlightStyle,
        ]}
      >
        <Text style={styles.optionLabel}>
          {t("SETTINGS.SENTENCES_PER_ROUND")}
        </Text>
        <TextInput
          style={[ScreensStyles.input, ScreensStyles.numericInput]}
          onChangeText={handleNumSentencesChange}
          value={String(numSentences)}
          // TODO marc: maybe should use keyboardType="decimal-pad"?
          keyboardType="number-pad"
          inputMode="numeric"
          // maxLength={2}
        />
      </View>
      {/* Option: History length */}
      <View
        style={[
          styles.optionContainer,
          globalConfig.tutorialStage ==
            TUTORIAL_STAGES.HISTORY_LENGTH && highlightStyle,
        ]}
      >
        <Text style={styles.optionLabel}>
          {t("SETTINGS.HISTORY_LENGTH")}
        </Text>
        <TextInput
          style={[ScreensStyles.input, ScreensStyles.numericInput]}
          onChangeText={handleHistoryLengthChange}
          value={String(historyLength)}
          inputMode="numeric"
          maxLength={2}
        />
      </View>

      {/* Option: Reading mode */}
      <View
        style={[
          styles.optionContainer,
          globalConfig.tutorialStage ==
            TUTORIAL_STAGES.READING_MODE && highlightStyle,
        ]}
      >
        <Text style={styles.optionLabel}>
          {t("SETTINGS.READING_MODE")}
        </Text>
        <Switch
          style={styles.switch}
          value={readingMode}
          // trackColor={GlobalStyles.colors.lightGray}
          trackColor={{
            false: "#767577",
            true: "#767577",
          }}
          // web
          activeThumbColor={
            readingMode ? GlobalStyles.colors.accent : "#f4f3f4"
          }
          // android
          thumbColor={
            readingMode ? GlobalStyles.colors.accent : "#f4f3f4"
          }
          onValueChange={handleReadingModeToggle}
        />
      </View>
      {/* <View style={styles.optionContainer}>
        <View>
          <Text style={styles.optionLabel}>
            {t("SETTINGS.APP_LANGUAGE")}
          </Text>
        </View>
        <View
          style={{
            marginRight: "2.5%",
            width: Platform.OS == "web" ? "15%" : "18%",
          }}
        >
          <PickerInput
            onChangeText={(text) => setInputAppLanguage(text)}
            zIndex={2000}
            value={inputAppLanguage}
            options={LanguageOptionsNoLabel}
          />
        </View>
      </View> */}
      {/* Manage data */}
      {/* height: "auto" is needed to overwrite optionContainer height */}
      <View
        style={[
          styles.optionContainer,
          { height: "auto", marginTop: "5%", zIndex: 0 },
        ]}
      >
        <Button
          style={[ScreensStyles.button, styles.button]}
          onPress={handleRestoreData}
        >
          {/*{TODO: center the text}*/}
          <Text style={ScreensStyles.buttonLabel}>
            {t("SETTINGS.RESTORE_DATA")}
          </Text>
        </Button>
        <Button
          style={[ScreensStyles.button, styles.button]}
          onPress={handleSaveData}
        >
          {/*{TODO: center the text}*/}
          <Text style={ScreensStyles.buttonLabel}>
            {t("SETTINGS.SAVE_DATA")}
          </Text>
        </Button>
      </View>
      <View
        style={[
          styles.optionContainer,
          {
            height: "auto",
            marginTop: "-2%",
            justifyContent: "center",
          },
        ]}
      >
        <Button
          style={[ScreensStyles.button, styles.button]}
          onPress={handleWatchTutorial}
        >
          {/*{TODO: center the text}*/}
          <Text style={ScreensStyles.buttonLabel}>
            {t("SETTINGS.WATCH_TUTORIAL")}
          </Text>
        </Button>
        {/* <Button
          style={[ScreensStyles.button, styles.button]}
          onPress={handleSaveData}
        >
          <Text style={ScreensStyles.buttonLabel}>
            {t("SETTINGS.SAVE_DATA")}
          </Text>
        </Button> */}
      </View>
      {/* For debugging purposes, show global config */}
      {/* <ScrollView
        style={{
          marginLeft: "5%",
          marginRight: "5%",
        }}
      >
        <View>
          <Text>Global config</Text>
          <Text>{JSON.stringify(globalConfig, null, 2)}</Text>
        </View>
        <View>
          <Text>Play data</Text>
          <Text>{JSON.stringify(playData, null, 2)}</Text>
        </View>
      </ScrollView> */}
      {/* up to here */}
      {globalConfig.tutorialStage != null && (
        <TutorialOverlay
          previousButtonDisabled={
            globalConfig.tutorialStage ==
            TUTORIAL_STAGES.WELCOME_SETTINGS
          }
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: "2%",
    flexDirection: "column",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "10%",
    justifyContent: "space-between",
    height: "8%",
    zIndex: 1000,
    marginVertical: "1%",
  },
  optionLabel: {
    fontSize: 18,
    color: GlobalStyles.colors.blackText,
  },
  switch: {
    // TODO: not clear to me why we need 5.5 to align with
    // the input. I would expect 5%.
    marginRight: Platform.OS == "web" ? "5.5%" : "2.5%",
    // backgroundColor: "red",
  },
  pickerView: {
    // marginLeft: "40%",
  },
  button: {
    fontSize: 18,
    margin: 16,
    width: "40%",
  },
});

export default Settings;
