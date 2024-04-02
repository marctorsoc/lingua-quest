import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Input, PickerInput } from "../UI/Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles, ScreensStyles } from "../../constants/styles";
import { Picker } from "@react-native-picker/picker";
import {
  languageOptions,
  lang_label_to_value,
  lang_value_to_label,
} from "../../constants/languages";
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
    learning_lc: {
      value: defaultValues ? defaultValues.learning_lc : "lt",
      isValid: true,
    },
    known_lc: {
      value: defaultValues ? defaultValues.known_lc : "en",
      isValid: true,
    },
    done: {
      value: String(defaultValues ? defaultValues.done : 0),
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: {
          value: enteredValue,
          isValid: true,
        },
      };
    });
  }

  function onsubmitInterim() {
    const storyData = {
      title: inputs.title.value,
      learning_lc: inputs.learning_lc.value,
      known_lc: inputs.known_lc.value,
      done:
        inputs.done.value.trim().length > 0
          ? Number(inputs.done.value)
          : undefined,
    };

    const titleIsValid = storyData.title.trim().length > 0;
    const doneIsValid =
      !isNaN(storyData.done) && storyData.done <= defaultValues.total;
    // console.log(storyData);
    setInputs((curInputs) => ({
      ...curInputs,
      title: {
        value: curInputs.title.value,
        isValid: titleIsValid,
      },
      done: {
        value: curInputs.done.value,
        isValid: doneIsValid,
      },
    }));
    if (!titleIsValid || !doneIsValid) {
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
      <View style={styles.inputsRow}>
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
      </View>
      <Input
        label="Sentences done"
        invalid={!inputs.done.isValid}
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: (text) => inputChangedHandler("done", text),
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
  // TODO marc: remove this if stays empty
  rowInput: {
    // flex: 1,
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
