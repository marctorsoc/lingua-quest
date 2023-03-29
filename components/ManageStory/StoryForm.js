import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Input, PickerInput } from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
import { Picker } from "@react-native-picker/picker";

// TODO: move to global constants
const languageOptions = [
  { label: "English", value: "en" },
  { label: "Lithuanian", value: "lt" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
];

function StoryForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    name: {
      value: defaultValues ? defaultValues.name.toString() : "",
      isValid: true,
    },
    url: {
      // value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      value: defaultValues ? defaultValues.url.toString() : "",
      isValid: true,
    },
    learning_lc: {
      value: defaultValues ? defaultValues.learning_lc.toString() : "lt",
      isValid: true,
    },
    from_lc: {
      value: defaultValues ? defaultValues.from_lc.toString() : "en",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      name: +inputs.name.value,
      // date: new Date(inputs.date.value),
      url: inputs.url.value,
    };

    // const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const nameIsValid = expenseData.name.trim().length > 0;
    // TODO: check how to validate urls
    const urlIsValid = expenseData.url.toString() !== "Invalid Url";

    if (!nameIsValid || !urlIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          name: { value: curInputs.name.value, isValid: nameIsValid },
          url: { value: curInputs.url.value, isValid: urlIsValid },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid = !inputs.name.isValid || !inputs.url.isValid;

  return (
    <View style={styles.form}>
      {/* <Text style={styles.title}>Your Story</Text> */}
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Name" // previously Amount
          invalid={!inputs.name.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "name"),
            value: inputs.name.value,
          }}
        />
      </View>
      <Input
        label="Caption Url" // previously Description
        invalid={!inputs.url.isValid}
        textInputConfig={{
          // multiline: true,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
          onChangeText: inputChangedHandler.bind(this, "url"),
          value: inputs.url.value,
        }}
      />
      <View style={styles.inputsRow}>
        <PickerInput
          style={styles.rowInput}
          label="Learning"
          invalid={!inputs.learning_lc.isValid}
          pickerConfig={{
            onChangeText: inputChangedHandler.bind(this, "learning_lc"),
            value: inputs.learning_lc.value,
            options: languageOptions,
          }}
        />
        <PickerInput
          style={styles.rowInput}
          label="From"
          invalid={!inputs.from_lc.isValid}
          pickerConfig={{
            onChangeText: inputChangedHandler.bind(this, "from_lc"),
            value: inputs.from_lc.value,
            options: languageOptions,
          }}
        />
      </View>
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={onCancel}>
          <Text style={{ color: "white" }}>Cancel</Text>
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
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
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 12,
  },
});
