import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useContext } from "react";
import { Platform } from "react-native";
import { Input, PickerInput } from "../UI/Input";
import Button from "../UI/Button";
import { GlobalStyles, ScreensStyles } from "../../constants/styles";
import { languageOptions } from "../../constants/languages";
import { storyTypeOptions } from "../../constants/story_type";
import { StoryContext } from "../../context/stories-context";
import { getUserNames, loadData } from "../../util/storage";
import { showInformativeAlert } from "../../util/alert";
import AutocompleteInput from "../UI/AutocompleteInput";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { useRouter } from "expo-router";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
function WelcomeForm({ onSignUp, onSignIn, defaultValues }) {
  // TODO: only show options for languages / types that are in the stories
  // TODO: add options to sort
  const [inputUserName, setInputUserName] = useState(
    defaultValues ? defaultValues.userName : "",
  );
  // TODO: remove if finally not used
  // const [inputAppLanguage, setInputAppLanguage] = useState(
  //   defaultValues ? defaultValues.appLanguage : "en",
  // );
  const [inputLearningLanguage, setInputLearningLanguage] = useState(
    defaultValues ? defaultValues.learningLanguage : "lt",
  );
  const [inputKnownLanguage, setInputKnownLanguage] = useState(
    defaultValues ? defaultValues.knownLanguage : "en",
  );
  const [allUsers, setAllUsers] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    // setIsFetching(true);
    getUserNames().then((users) => {
      setAllUsers(users);
    });
    // setIsFetching(false);
  }, []);

  // TODO: remove if finally not used
  // useEffect(() => {
  //   // setIsFetching(true);
  //   i18next.changeLanguage(inputAppLanguage);
  //   // setIsFetching(false);
  // }, [inputAppLanguage]);

  function onsignUpInterim() {
    if (allUsers.includes(inputUserName)) {
      showInformativeAlert(
        "Name already taken. Please choose another name.",
      );
      return;
    }
    if (inputKnownLanguage === inputLearningLanguage) {
      showInformativeAlert(
        "Learning language and language for translations cannot be the same.",
      );
      return;
    }

    onSignUp({
      userInfo: {
        userName: inputUserName,
        // this could be e.g. the hash of userName
        userId: inputUserName,
      },
      appLanguage: i18next.language,
      filters: {
        knownLanguage: inputKnownLanguage,
        learningLanguage: inputLearningLanguage,
      },
    });
  }
  function onsignInInterim() {
    onSignIn({
      userInfo: {
        userName: inputUserName,
        // this could be e.g. the hash of userName
        userId: inputUserName,
      },
    });
  }

  const languageOptionsProcessed = languageOptions.map((item) => ({
    ...item,
    label: item.longName,
  }));
  // translations only in English and Spanish for now
  const translationOptionsProcessed = languageOptionsProcessed.filter(
    (item) => ["en", "es"].includes(item.value),
  );
  const router = useRouter();

  return (
    <ScrollView
      style={styles.form}
      contentContainerStyle={styles.scrollViewContainer}
    >
      {/* each of the elements inside one below the next one */}
      <View style={styles.inputsCol}>
        {/* <AutocompleteInput
            label="Name"
            style={{ paddingVertical: 10 }}
            suggestions={["marc", "egle"]}
            onChangeText={setInputUserName}
            keyboardType={"default"}
            value={inputUserName}
          /> */}
        <View style={{ alignItems: "center", marginVertical: "5%" }}>
          <Text style={ScreensStyles.buttonLabel}>
            {t("AUTH.NAME")}
          </Text>
          <TextInput
            style={[ScreensStyles.input, { width: 150 }]}
            onChangeText={setInputUserName}
            value={inputUserName}
            // TODO marc: maybe should use keyboardType="decimal-pad"?
            inputMode="keyboard"
            maxLength={10}
          />
        </View>
        {/* <Text style={styles.errorText}>{inputUserName}</Text> */}
        {onSignUp && (
          // two (label + picker) blocks in a row, side by side
          <View style={styles.inputsRow}>
            {/* each of which in a col (label on top of a picker) */}
            <View style={styles.inputsCol}>
              <PickerInput
                style={styles.picker}
                label={t("AUTH.SIGNUP.LEARNING_LANG")}
                onChangeText={(text) =>
                  setInputLearningLanguage(text)
                }
                zIndex={2000}
                value={inputLearningLanguage}
                options={languageOptionsProcessed}
              />
            </View>
            {/* A col with label on top of a picker */}
            <View style={styles.inputsCol}>
              <PickerInput
                style={styles.picker}
                label={t("AUTH.SIGNUP.IN_GAME_TRANSLATIONS")}
                onChangeText={(text) => setInputKnownLanguage(text)}
                zIndex={1000}
                value={inputKnownLanguage}
                options={translationOptionsProcessed}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        {(allUsers.length > 0) & !onSignIn ? (
          <View style={styles.button}>
            <Button
              style={ScreensStyles.button}
              onPress={() => {
                router.navigate("(auth)/signin");
              }}
            >
              <Text style={ScreensStyles.buttonLabel}>
                {t("AUTH.SIGNUP.SIGNIN_LINK")}
              </Text>
            </Button>
          </View>
        ) : (
          <></>
        )}
        {onSignIn && (
          <View style={styles.button}>
            <Button
              style={ScreensStyles.button}
              onPress={() => {
                router.navigate("(auth)");
              }}
            >
              <Text style={ScreensStyles.buttonLabel}>
                {t("AUTH.SIGNIN.SIGNUP_LINK")}
              </Text>
            </Button>
          </View>
        )}
        {onSignIn && (
          <View style={styles.button}>
            <Button
              style={ScreensStyles.button}
              onPress={onsignInInterim}
              disabled={!allUsers.includes(inputUserName)}
            >
              <Text style={ScreensStyles.buttonLabel}>
                {t("AUTH.CONTINUE")}
              </Text>
            </Button>
          </View>
        )}
        {onSignUp && (
          <View style={styles.button}>
            <Button
              style={ScreensStyles.button}
              onPress={onsignUpInterim}
              disabled={
                inputUserName === "" ||
                inputUserName.length < 3 ||
                inputKnownLanguage === inputLearningLanguage
              }
            >
              <Text style={ScreensStyles.buttonLabel}>
                {t("AUTH.CONTINUE")}
              </Text>
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default WelcomeForm;

const styles = StyleSheet.create({
  form: {
    // marginTop: "5%",
    // alignContent: "center",
  },
  scrollViewContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: Platform.OS == "web" ? undefined : 1,
  },
  inputsCol: {
    flexDirection: "column",
    alignItems: "center",
    // marginVertical: "15%",
    zIndex: 500,
    // marginHorizontal: "5%",
    // width: "5%",
  },
  inputsRow: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 500,
    marginHorizontal: Platform.OS == "web" ? "0" : "25%",
  },
  buttonsContainer: {
    marginTop: "20%",
    minWidth: "60%",
  },
  button: {
    marginTop: "8%",
    justifyContent: "center",
  },
  picker: {
    width: Platform.OS === "web" ? "100%" : "110%",
    // padding: "5px",
  },
});
