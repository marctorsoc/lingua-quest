import { StyleSheet, Text, TextInput, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import { Picker } from "@react-native-picker/picker";

export function Input({ label, invalid, style, textInputConfig }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export function PickerInput({ label, invalid, style, pickerConfig }) {
  const containerStyle = {
    height: 54,
    width: "50%",
    color: GlobalStyles.colors.primary700,
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 10,
  };
  const viewStyle = {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    padding: 2,
  };
  const textStyle = {
    fontSize: 12,
    width: "100%",
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  };
  const pickerStyle = {
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 6,
    padding: 0,
    margin: 0,
    textAlignVertical: "center",
  };
  const pickerItemStyle = {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    borderRadius: 6,
    padding: 0,
    fontSize: 12,
    margin: 0,
    textAlignVertical: "center",
  };

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{label}</Text>
      <View style={viewStyle}>
        <Picker
          selectedValue={pickerConfig.value}
          style={pickerStyle}
          mode={"dropdown"}
          onValueChange={pickerConfig.onChangeText}
        >
          {pickerConfig.options.map((item, index) => (
            <Picker.Item
              style={pickerItemStyle}
              key={index}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
