import { Ionicons } from "@expo/vector-icons";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import { GlobalStyles } from "../../constants/styles";
import DropDownPicker from "react-native-dropdown-picker";

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
  // check if the options have non-empty labels
  const showOptionLabels = options.some(
    (option) => option.label !== ""
  );
  const containerStyle = [styles.pickerInputContainer, style];
  const [open, setOpen] = useState(false);
  return (
    <View style={getLabelAndPickerContainerStyle(showLabel, zIndex)}>
      {showLabel && (
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
      )}
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
        style={{
          minHeight: "0%",
          borderColor: GlobalStyles.colors.lightGray,
        }}
        containerStyle={containerStyle}
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
        labelStyle={{
          fontSize: 14,
        }}
        // this is for the object showing the options (shown after clicking)
        dropDownContainerStyle={
          {
            // width: "50%",
            // height: "auto",
            // alignSelf: "auto",
            // alignContent: showLabel ? "" : "",
            // alignItems: "center",
          }
        }
        listParentContainerStyle={{
          // backgroundColor: "green",
          paddingLeft: showLabel ? undefined : "10%",
          flexDirection: "row",
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
          backgroundColor: GlobalStyles.colors.accent,
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

const getLabelAndPickerContainerStyle = (showLabel, zIndex) => {
  return {
    zIndex: zIndex,
    marginHorizontal: showLabel
      ? Platform.OS == "web"
        ? "40px"
        : "10%"
      : "0%",
    padding: Platform.OS == "web" ? "0%" : "5%",
    // backgroundColor: "green",
  };
};

const styles = StyleSheet.create({
  pickerInputContainer: {
    // marginVertical: "5%",
    // minHeight: "0%",
    // padding: 0, // use this when no text for each option
    // color: "red",
    // backgroundColor: "red",
  },
  label: {
    fontSize: 16,
    color: GlobalStyles.colors.gray,
    textAlign: "center",
  },
});
