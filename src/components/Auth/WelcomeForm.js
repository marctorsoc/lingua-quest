import { useCallback, useEffect, useState } from "react";
import Checkbox from "expo-checkbox";

import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Platform } from "react-native";
import Button from "../UI/Button";
import { GlobalStyles, ScreensStyles } from "../../constants/styles";
import { getUserNames } from "../../util/storage";
import { showInformativeAlert } from "../../util/alert";
import { useFocusEffect, useRouter } from "expo-router";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { GameLanguagePickers } from "../UI/GameLanguagePickers";
function WelcomeForm({ onSignUp, onSignIn, defaultValues }) {
  // TODO: only show options for languages / types that are in the stories
  // TODO: add options to sort
  const [inputUserName, setInputUserName] = useState(
    defaultValues ? defaultValues.userName : ""
  );
  // TODO: remove if finally not used
  // const [inputAppLanguage, setInputAppLanguage] = useState(
  //   defaultValues ? defaultValues.appLanguage : "en",
  // );
  const [inputLearningLanguage, setInputLearningLanguage] = useState(
    defaultValues ? defaultValues.learningLanguage : "lt"
  );
  const [inputKnownLanguage, setInputKnownLanguage] = useState(
    defaultValues ? defaultValues.knownLanguage : "en"
  );
  const [allUsers, setAllUsers] = useState([]);
  const [skipTutorial, setSkipTutorial] = useState(false);

  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      // Reset states when the screen is focused
      setInputUserName("");
      getUserNames().then((users) => {
        setAllUsers(users);
      });
    }, [])
  );

  // TODO: remove if finally not used
  // useEffect(() => {
  //   // setIsFetching(true);
  //   i18next.changeLanguage(inputAppLanguage);
  //   // setIsFetching(false);
  // }, [inputAppLanguage]);

  function onsignUpInterim() {
    console.log(allUsers);
    console.log(inputUserName);
    if (allUsers.includes(inputUserName)) {
      showInformativeAlert(t("AUTH.SIGNUP.ALERT_NAME_TAKEN"));
      return;
    }
    if (inputKnownLanguage === inputLearningLanguage) {
      showInformativeAlert(t("AUTH.SIGNUP.ALERT_LANGUAGE_CLASH"));
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
      skipTutorial: skipTutorial,
    });
  }
  function onsignInInterim(name) {
    onSignIn({
      userInfo: {
        userName: name,
        // this could be e.g. the hash of userName
        userId: name,
      },
    });
  }
  const onInputUserNameEndEditing = () => {
    // Remove leading and trailing whitespace after finish editing
    const trimmedText = inputUserName.trim();
    setInputUserName(trimmedText);
  };

  const router = useRouter();

  return (
    <ScrollView
      style={styles.form}
      contentContainerStyle={styles.scrollViewContainer}
    >
      {/* List of users to sign in */}
      {onSignIn && (
        <View>
          <View style={styles.userListContainer}>
            <Text style={styles.heading}>{t("AUTH.ALL_USERS")}</Text>
            <View style={styles.userGrid}>
              {allUsers.map((user, index) => (
                <Button
                  key={index}
                  style={styles.userButton}
                  onPress={() => {
                    onsignInInterim(user);
                  }}
                >
                  <Text style={styles.userText}>{user}</Text>
                </Button>
              ))}
            </View>
          </View>
        </View>
      )}
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
        {onSignUp && (
          <View style={styles.inputsCol}>
            <View style={{ marginBottom: "5%" }}>
              <Text style={ScreensStyles.buttonLabel}>
                {t("AUTH.NAME")}
              </Text>
              <TextInput
                style={[ScreensStyles.input, { width: 150 }]}
                onChangeText={setInputUserName}
                onEndEditing={onInputUserNameEndEditing}
                value={inputUserName}
                // TODO marc: maybe should use keyboardType="decimal-pad"?
                inputMode="keyboard"
                maxLength={10}
              />
            </View>
            {/* // two (label + picker) blocks in a row, side by side */}
            <GameLanguagePickers
              inputLearningLanguage={inputLearningLanguage}
              setInputLearningLanguage={setInputLearningLanguage}
              inputKnownLanguage={inputKnownLanguage}
              setInputKnownLanguage={setInputKnownLanguage}
            ></GameLanguagePickers>
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={skipTutorial}
                onValueChange={setSkipTutorial}
                color={
                  skipTutorial
                    ? GlobalStyles.colors.primaryButton
                    : undefined
                }
              />
              <Text style={styles.checkboxLabel}>
                {t("AUTH.SIGNUP.SKIP_TUTORIAL")}
              </Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.buttonsContainer}>
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
                {t("AUTH.SIGNUP.CONTINUE")}
              </Text>
            </Button>
          </View>
        )}
        {(allUsers.length > 0) & !onSignIn ? (
          <View style={styles.button}>
            <Text style={ScreensStyles.buttonLabel}>
              {t("AUTH.SIGNUP.ABOVE_SIGNIN_LINK_TEXT")}
            </Text>
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
            <Text style={ScreensStyles.buttonLabel}>
              {t("AUTH.SIGNIN.ABOVE_SIGNUP_LINK_TEXT")}
            </Text>
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
  },
  inputsCol: {
    flexDirection: "column",
    alignItems: "center",
    zIndex: 500,
  },
  buttonsContainer: {
    marginTop: "10%",
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

  userListContainer: {
    backgroundColor: "#DBC2E5", // Light purple background from your palette
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    alignSelf: "center",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    elevation: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A115F", // Darker purple for the heading
    textAlign: "center",
    marginBottom: 10,
  },
  userGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  userButton: {
    backgroundColor: "#83389f", // Main purple color for user buttons
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.3)",
    elevation: 4,
  },
  userText: {
    color: "#f2f2f2", // White text for readability
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: GlobalStyles.colors.blackText,
  },
});
