import {
  StyleSheet,
  Text,
  TextInput as RN_TextInput,
  View,
} from "react-native";

import { GlobalStyles } from "../../constants/styles";

export function TextInput({
  label,
  invalid,
  style,
  textInputConfig,
  editable = true,
}) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline)
    inputStyles.push(styles.inputMultiline);

  if (invalid) inputStyles.push(styles.invalidInput);

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <RN_TextInput
        editable={editable}
        style={
          editable
            ? inputStyles
            : [inputStyles, GlobalStyles.disabled]
        }
        {...textInputConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
    height: 20,
    padding: 15, // use this when no text for each option
  },
  label: {
    fontSize: 16,
    color: GlobalStyles.colors.gray,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: GlobalStyles.colors.interactiveItem,
    padding: 6,
    margin: 5,
    borderRadius: 6,
    fontSize: 14,
    color: GlobalStyles.colors.white,
  },
  inputMultiline: {
    minHeight: 100,
    verticalAlign: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
