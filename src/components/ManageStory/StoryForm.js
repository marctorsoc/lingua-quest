import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { TextInput } from "../UI/TextInput";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles, ScreensStyles } from "../../constants/styles";
import { Picker } from "@react-native-picker/picker";
import { showInformativeAlert } from "../../util/alert";
import { useTranslation } from "react-i18next";
import { CancelApplyButtons } from "../UI/CancelApplyButtons";

function StoryForm({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) {
  const [inputs, setInputs] = useState({
    title: {
      value: defaultValues ? defaultValues.title.toString() : "",
      isValid: true,
    },
    // url: {
    //   value: defaultValues ? defaultValues.url?.toString() : "",
    //   isValid: true,
    // },
    languages: {
      value: JSON.stringify(
        defaultValues ? defaultValues.languages : {}
      ),
      isValid: true,
    },
    done: {
      value: JSON.stringify(defaultValues ? defaultValues.done : {}),
      isValid: true,
    },
  });
  const { t } = useTranslation();

  function inputChangedHandler(
    inputIdentifier,
    enteredValue,
    json_parse = false
  ) {
    let isValid = enteredValue.trim().length > 0;
    try {
      if (json_parse) JSON.parse(enteredValue);
    } catch (error) {
      isValid = false;
    }
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: {
          value: enteredValue,
          isValid: isValid,
        },
      };
    });
  }

  function onsubmitInterim() {
    const storyData = {
      title: inputs.title.value,
      languages: JSON.parse(inputs.languages.value),
      done: JSON.parse(inputs.done.value),
    };

    if (!inputs.title.isValid || !inputs.done.isValid) {
      showInformativeAlert(
        t("EDIT.ALERT_INVALID_STORY"),
        t("EDIT.ALERT_FIX_ERRORS")
      );
      return;
    }
    onSubmit(storyData);
  }

  return (
    <View style={styles.form}>
      <TextInput
        label={t("EDIT.TITLE")}
        invalid={!inputs.title.isValid}
        editable={false}
        style={styles.input}
        textInputConfig={{
          keyboardType: "default",
          onChangeText: (text) => inputChangedHandler("title", text),
          value: inputs.title.value,
        }}
      />
      <TextInput
        label={t("EDIT.LANGUAGES_AND_TRANSLATIONS")}
        editable={false}
        style={styles.input}
        textInputConfig={{
          keyboardType: "default",
          onChangeText: (text) =>
            inputChangedHandler("languages", text, true),
          value: inputs.languages.value,
        }}
      />
      <TextInput
        label={t("EDIT.SENTENCES_DONE")}
        invalid={!inputs.done.isValid}
        style={styles.input}
        textInputConfig={{
          keyboardType: "default",
          onChangeText: (text) =>
            inputChangedHandler("done", text, true),
          value: inputs.done.value,
        }}
      />
      <CancelApplyButtons
        onCancel={onCancel}
        onApply={onsubmitInterim}
        applyButtonLabel={submitButtonLabel}
      ></CancelApplyButtons>
    </View>
  );
}

export default StoryForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.white,
    marginVertical: 24,
    textAlign: "center",
  },
  input: {
    marginVertical: "5%",
    width: "50%",
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: "3%",
  },
});
