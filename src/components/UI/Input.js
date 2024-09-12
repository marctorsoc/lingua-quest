import { Ionicons } from "@expo/vector-icons";
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
  const containerStyle = [styles.pickerInputContainer, style];
  const [open, setOpen] = useState(false);
  return (
    <View
      style={{
        zIndex: zIndex,
        marginHorizontal: showLabel
          ? Platform.OS == "web"
            ? "40px"
            : "10%"
          : "0%",
        padding: "0%",
        // backgroundColor: "red",
      }}
    >
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
        ArrowDownIconComponent={({ style }) => (
          <Ionicons
            name="chevron-down-outline"
            size={10}
            color={"black"}
          />
        )}
        ArrowUpIconComponent={({ style }) => (
          <Ionicons
            name="chevron-up-outline"
            size={10}
            color={"black"}
          />
        )}
        TickIconComponent={({ style }) =>
          showLabel && (
            <Ionicons
              name="checkmark-outline"
              size={10}
              color={"black"}
            />
          )
        }
        style={{
          minHeight: "0%",
          minWidth: "30%",
          padding: 0,
          margin: 0,
        }}
        containerStyle={containerStyle}
        // containerStyle={{
        //   marginVertical: "5%",
        //   minHeight: "5%",
        //   padding: 0, // use this when no text for each option
        // }}
        // dropDownContainerStyle={{ height: 100 }}
        labelStyle={{
          fontSize: 14,
        }}
        // this is for the object showing the options (shown after clicking)
        dropDownContainerStyle={
          {
            // height: "auto",
            // alignSelf: "auto",
            // alignContent: showLabel ? "" : "",
            // alignItems: "center",
          }
        }
        listParentContainerStyle={{
          // backgroundColor: "green",
          paddingLeft: showLabel ? undefined : "30%",
          flexDirection: showLabel ? "row" : "row",
        }}
        listItemContainerStyle={{
          height: "",
          padding: 0,
          margin: 0,
          flexDirection: showLabel ? "row" : "",
          alignContent: "center",
        }}
        // itemSeparator={true} // TODO: remove
        listItemLabelStyle={{
          fontSize: 14,
        }}
        // this is the icon before showing the options
        iconContainerStyle={{
          // height: "0%",
          padding: 0,
          margin: 0,
          marginRight: showLabel ? "10%" : "0",
          // backgroundColor: "red",
          // minHeight: "5%",
        }}
        showTickIcon={true}
        selectedItemContainerStyle={{
          margin: 0,
          padding: 0,
          backgroundColor: GlobalStyles.colors.primary200,
          flexDirection: "row",
        }}
        selectedItemLabelStyle={{}}
        arrowIconContainerStyle={{
          // paddingHorizontal: showLabel ? "5%" : "0px",
          marginLeft: showLabel ? "5%" : "15%",
          paddingRight: showLabel ? "20px" : "15%",
        }}
      ></DropDownPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
    height: 20,
    padding: 15, // use this when no text for each option
  },
  pickerInputContainer: {
    marginVertical: "5%",
    minHeight: "0%",
    padding: 0, // use this when no text for each option
  },
  label: {
    fontSize: 16,
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
});
