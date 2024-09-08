import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Input, PickerInput } from "../UI/Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles, ScreensStyles } from "../../constants/styles";
import { Picker } from "@react-native-picker/picker";
import { showInformativeAlert } from "../../util/alert";

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
        defaultValues ? defaultValues.languages : {},
      ),
      isValid: true,
    },
    done: {
      value: JSON.stringify(defaultValues ? defaultValues.done : {}),
      isValid: true,
    },
  });

  function inputChangedHandler(
    inputIdentifier,
    enteredValue,
    json_parse = false,
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
        "Invalid story",
        "Please fix the errors above.",
      );
      return;
    }
    onSubmit(storyData);
  }

  return (
    <View style={styles.form}>
      <Input
        label="Title"
        invalid={!inputs.title.isValid}
        textInputConfig={{
          keyboardType: "default",
          onChangeText: (text) => inputChangedHandler("title", text),
          value: inputs.title.value,
        }}
      />
      {/* <Input
        label="Caption Url" // previously Description
        invalid={!inputs.url.isValid}
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
          onChangeText: inputChangedHandler.bind(this, "url"),
          value: inputs.url.value,
        }}
      /> */}
      <Input
        label="Languages"
        editable={false}
        textInputConfig={{
          keyboardType: "default",
          onChangeText: (text) =>
            inputChangedHandler("languages", text, true),
          value: inputs.languages.value,
        }}
      />
      {/* <View style={styles.inputsRow}>
        <PickerInput
          style={[styles.rowInput, { width: "45%" }]}
          label="Learning"
          pickerConfig={{
            onChangeText: (text) =>
              inputChangedHandler("learning_lc", text),
            value: inputs.learning_lc.value,
            options: languageOptions,
          }}
        />
        <PickerInput
          style={[styles.rowInput, { width: "45%" }]}
          label="From"
          pickerConfig={{
            onChangeText: (text) =>
              inputChangedHandler("known_lc", text),
            value: inputs.known_lc.value,
            options: languageOptions,
          }}
        />
      </View> */}
      <Input
        label="Sentences done"
        invalid={!inputs.done.isValid}
        textInputConfig={{
          keyboardType: "default",
          onChangeText: (text) =>
            inputChangedHandler("done", text, true),
          value: inputs.done.value,
        }}
      />
      <View style={styles.buttons}>
        <Button style={ScreensStyles.button} onPress={onCancel}>
          <Text style={{ color: "white" }}>Cancel</Text>
        </Button>
        <Button
          style={ScreensStyles.button}
          onPress={onsubmitInterim}
        >
          <Text style={{ color: "white" }}>{submitButtonLabel}</Text>
        </Button>
      </View>
    </View>
  );
}

export default StoryForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    padding: 6,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
