import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";

import { GlobalStyles } from "../../constants/styles";
import DropDownPicker from "react-native-dropdown-picker";

export function Input({
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
      <TextInput
        editable={editable}
        style={inputStyles}
        {...textInputConfig}
      />
    </View>
  );
}

export function PickerInput({
  label,
  style,
  value,
  options,
  zIndex,
  onChangeText,
  dropdownDirection = "BOTTOM",
  disabled = false,
}) {
  const showLabel = label !== undefined;
  const containerStyle = [style, styles.inputContainer];
  // const containerStyle = styles.inputContainer;
  const [open, setOpen] = useState(false);
  return (
    <>
      {showLabel && <Text style={styles.label}>{label}</Text>}
      <DropDownPicker
        open={open}
        value={value}
        items={options}
        setValue={onChangeText}
        setOpen={setOpen}
        disabled={disabled}
        disabledStyle={{
          opacity: 0.7,
        }}
        // TODO: for now we can live with adding margin to the elems after
        // this so that the unfolded dropdown does not lay behind them.
        // If we don't find a way to fix this, we'll need to move to MODAL
        //  for Android
        // listMode={Platform.OS === "android" ? "MODAL" : "SCROLLVIEW"}
        listMode={"SCROLLVIEW"}
        dropDownDirection={dropdownDirection}
        zIndex={zIndex}
        containerStyle={containerStyle}
        style={{}}
        maxHeight={20}
        labelStyle={{
          fontWeight: "bold",
        }}
        itemProps={{
          style: {
            fontSize: 6,
            color: "green",
          },
        }}
      ></DropDownPicker>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: GlobalStyles.colors.white,
    textAlign: "center",
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary50,
    color: GlobalStyles.colors.primary800,
    padding: 6,
    margin: 5,
    borderRadius: 6,
    fontSize: 14,
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
  dropdownStyle: {
    borderRadius: 12,
    borderColor: "gray",
    borderWidth: 1,
    color: GlobalStyles.colors.white,
  },
});
