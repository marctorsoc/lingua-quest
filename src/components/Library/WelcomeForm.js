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
function WelcomeForm({ onSignUp, onSignIn, defaultValues }) {
  // TODO: only show options for languages / types that are in the stories
  // TODO: add options to sort
  const [inputUserName, setInputUserName] = useState(
    defaultValues ? defaultValues.userName : "",
  );
  const [inputAppLanguage, setInputAppLanguage] = useState(
    defaultValues ? defaultValues.appLanguage : "en",
  );
  const [inputLearningLanguage, setInputLearningLanguage] = useState(
    defaultValues ? defaultValues.learningLanguage : "lt",
  );
  const [inputKnownLanguage, setInputKnownLanguage] = useState(
    defaultValues ? defaultValues.knownLanguage : "en",
  );
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // setIsFetching(true);
    getUserNames().then((users) => {
      setAllUsers(users);
    });
    // setIsFetching(false);
  }, []);

  console.log(allUsers);
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
      appLanguage: inputAppLanguage,
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
    <ScrollView style={styles.form}>
      <View style={styles.inputsRow}>
        {/* <AutocompleteInput
            label="Name"
            style={{ paddingVertical: 10 }}
            suggestions={["marc", "egle"]}
            onChangeText={setInputUserName}
            keyboardType={"default"}
            value={inputUserName}
          /> */}
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <Text style={{ color: "white" }}>Your name</Text>
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
          <>
            <PickerInput
              style={styles.picker}
              label="App language"
              onChangeText={(text) => setInputAppLanguage(text)}
              zIndex={3000}
              value={inputAppLanguage}
              options={languageOptionsProcessed}
            />
            <PickerInput
              style={styles.picker}
              label="Language to learn"
              onChangeText={(text) => setInputLearningLanguage(text)}
              zIndex={2000}
              value={inputLearningLanguage}
              options={languageOptionsProcessed}
            />
            <PickerInput
              style={styles.picker}
              label="In-game translations"
              onChangeText={(text) => setInputKnownLanguage(text)}
              zIndex={1000}
              value={inputKnownLanguage}
              options={translationOptionsProcessed}
            />
          </>
        )}
      </View>
      {(allUsers.length > 0) & !onSignIn ? (
        <View style={styles.signInSignUpLinks}>
          <Button
            style={ScreensStyles.button}
            onPress={() => {
              router.navigate("(auth)/signin");
            }}
          >
            <Text style={{ color: "white" }}>
              I already have an account
            </Text>
          </Button>
        </View>
      ) : (
        <></>
      )}
      {onSignIn && (
        <View style={styles.signInSignUpLinks}>
          <Button
            style={ScreensStyles.button}
            onPress={() => {
              router.navigate("(auth)");
            }}
          >
            <Text style={{ color: "white" }}>
              I want to create a new player
            </Text>
          </Button>
        </View>
      )}
      {onSignIn && (
        <View style={styles.buttons}>
          <Button
            style={ScreensStyles.button}
            onPress={onsignInInterim}
            disabled={!allUsers.includes(inputUserName)}
          >
            <Text style={{ color: "white" }}>Continue</Text>
          </Button>
        </View>
      )}
      {onSignUp && (
        <View style={styles.buttons}>
          <Button
            style={ScreensStyles.button}
            onPress={onsignUpInterim}
            disabled={inputUserName === ""}
          >
            <Text style={{ color: "white" }}>Continue</Text>
          </Button>
        </View>
      )}
    </ScrollView>
  );
}

export default WelcomeForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
    width: "100%",
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
  signInSignUpLinks: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -100,
    // backgroundColor: "white",
  },
  buttons: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -100,
  },
  picker: {
    width: Platform.OS === "web" ? "40%" : "45%",
    padding: 5,
  },
});
