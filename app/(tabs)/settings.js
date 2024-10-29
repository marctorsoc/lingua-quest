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
import {
  GlobalContext,
  initialGlobalData,
} from "../../src/context/global-context";
import {
  GlobalStyles,
  LanguagePickers,
  ScreensStyles,
} from "../../src/constants/styles";
import Button from "../../src/components/UI/Button";
import {
  storeData,
  cleanAllData,
  getUserNames,
  cleanData,
  loadData,
} from "../../src/util/storage";
import { fetchSentences, fetchStories } from "../../src/util/http";
import { showInformativeAlert } from "../../src/util/alert";
import {
  PlayContext,
  initialPlayData,
} from "../../src/context/play-context";
import { useRouter } from "expo-router";
import i18next, { use } from "i18next";
import DataRestoreModal from "../../src/components/Settings/DataRestoreModal";
import { useTranslation } from "react-i18next";
import { PickerInput } from "../../src/components/UI/PickerInput";
import {
  languageOptions,
  LanguageOptionsLongNames,
  LanguageOptionsNoLabel,
} from "../../src/constants/languages";
// import OptionModal from "../components/UI/Modal";

const Settings = () => {
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const { stories, setStories } = useContext(StoryContext);
  const { playData, setPlayData } = useContext(PlayContext);
  const [showRestoreModal, setShowRestoreModal] = useState(false);

  const [numSentences, setNumSentences] = useState(
    String(globalConfig.numSentencesPerGame)
  );
  const router = useRouter();
  const { t } = useTranslation();
  const [historyLength, setHistoryLength] = useState(
    String(globalConfig.historyLength)
  );

  const [readingMode, setReadingMode] = useState(
    globalConfig.readingMode
  );

  const [inputAppLanguage, setInputAppLanguage] = useState(
    i18next.language ? i18next.language : "en"
  );

  const [allUsers, setAllUsers] = useState([]);
  // let allUsers = [];

  useEffect(() => {
    getUserNames().then((users) => {
      setAllUsers(users);
    });
    setNumSentences(globalConfig.numSentencesPerGame);
    setHistoryLength(globalConfig.historyLength);
    setReadingMode(globalConfig.readingMode);

    // allUsers = getUserNamesWrapper();
    // setIsFetching(false);
  }, [globalConfig]);
  // console.log("allUsers: ", allUsers);

  useEffect(() => {
    // setIsFetching(true);
    i18next.changeLanguage(inputAppLanguage);
    // setIsFetching(false);
  }, [inputAppLanguage]);

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

  // async function handleUploadStories() {
  //   // overwrite data in context with uploaded file,
  //   // and save to storage
  //   const data = await FileUpload();

  //   if (data === null || data === undefined) {
  //     console.log(
  //       "handleUploadStories exiting since data is null or undefined",
  //     );
  //   }

  //   // 1. validate the data
  //   for (let key of Object.keys(data)) {
  //     console.log(key);
  //   }
  //   if (!("stories" in data && "sentences" in data)) {
  //     console.log(
  //       'Either "stories" or "sentences" not found in the uploaded data.',
  //     );
  //     return;
  //   }
  //   console.log("all good!");

  //   // 2. save stories into storage
  //   storeData("stories", JSON.stringify(data.stories));

  //   // 3. use setStories to update context
  //   // for sentences we don't have a context. We just request
  //   // for the sentences of the story to be played
  //   setStories(data.stories);

  //   // 4. for each story, save its sentences into storage
  //   if (Platform.OS === "web") {
  //     console.log(
  //       "For web we don't have enough space to save sentences. " +
  //         "So this won't work.",
  //     );
  //   } else {
  //     data.stories.map((story) => {
  //       if (!story.is_leaf) return; // ignore non-leaf stories
  //       const storySentences = data.sentences.filter(
  //         (sentence) => sentence.story_id === story.id,
  //       );
  //       const filename = `sentences_${story.id}`;
  //       console.log(
  //         `Saving ${storySentences.length} sentences ` +
  //           `for story ${story.title} with id ${story.id}` +
  //           ` to ${filename}`,
  //       );
  //       storeData(filename, JSON.stringify(storySentences));
  //     });
  //   }

  //   showInformativeAlert("Data uploaded");
  // }

  // async function handleDownloadStories() {
  //   // TODO: this won't work now since fetchSentences requires a storyId
  //   const sentences = fetchSentences({ try_from_disk: true });
  //   console.log(sentences);
  //   JsonDownload({ stories: stories, sentences: sentences });
  // }
  // console.log(globalConfig);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DataRestoreModal
        isVisible={showRestoreModal}
        onClose={() => setShowRestoreModal(false)}
        onRestore={handleRestoreOption}
        onDelete={handleDeleteData}
        options={allUsers}
        disabledOption={globalConfig.userId}
      />
      {/* Option: Number of sentences per game */}
      <View style={styles.optionContainer}>
        <Text style={styles.optionLabel}>
          {t("SETTINGS.SENTENCES_PER_ROUND")}
        </Text>
        <TextInput
          style={[ScreensStyles.input, ScreensStyles.numericInput]}
          onChangeText={handleNumSentencesChange}
          value={numSentences}
          // TODO marc: maybe should use keyboardType="decimal-pad"?
          inputMode="numeric"
          maxLength={2}
        />
      </View>
      {/* Option: History length */}
      <View style={styles.optionContainer}>
        <Text style={styles.optionLabel}>
          {t("SETTINGS.HISTORY_LENGTH")}
        </Text>
        <TextInput
          style={[ScreensStyles.input, ScreensStyles.numericInput]}
          onChangeText={handleHistoryLengthChange}
          value={historyLength}
          inputMode="numeric"
          maxLength={2}
        />
      </View>

      {/* Option: Reading mode */}
      <View style={styles.optionContainer}>
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
          activeThumbColor={
            readingMode ? GlobalStyles.colors.accent : "#f4f3f4"
          }
          onValueChange={handleReadingModeToggle}
        />
      </View>
      <View style={styles.optionContainer}>
        {/* <View>
          <Text style={styles.label}>
            {t("SETTINGS.APP_LANGUAGE")}
          </Text>
        </View>
        <View style={{ marginRight: "2.5%" }}>
          <PickerInput
            onChangeText={(text) => setInputAppLanguage(text)}
            zIndex={2000}
            value={inputAppLanguage}
            options={LanguageOptionsNoLabel}
          />
        </View> */}
      </View>
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
