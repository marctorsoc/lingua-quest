import React from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  StyleSheet, // Import StyleSheet
  Pressable,
} from "react-native";
import { GlobalStyles, ScreensStyles } from "../../constants/styles";
import Button from "../UI/Button";
import { AntDesign } from "@expo/vector-icons"; // Import icon library
import IconButton from "../UI/IconButton";
import Animated, { LinearTransition } from "react-native-reanimated";

const DataRestoreModal = ({
  isVisible,
  onClose,
  onRestore,
  onDelete,
  options,
  disabledOption,
}) => {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
    >
      <Pressable
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.popupContainer}>
          <Text style={styles.title}>Restore Data</Text>
          <View style={styles.separator} />
          {options.length > 0 && (
            <View style={styles.flatList}>
              <Animated.FlatList
                data={[...options]}
                keyExtractor={(item, idx) => idx}
                renderItem={({ item }) => (
                  <View style={styles.rowContainer}>
                    <Button
                      style={styles.button}
                      onPress={() => onRestore(item)}
                      disabled={item == disabledOption}
                    >
                      <Text style={styles.buttonLabel}>{item}</Text>
                    </Button>
                    {
                      <IconButton
                        icon={"trash-outline"}
                        size={20}
                        // color={"red"}
                        disabled={item == disabledOption}
                        onPress={() => {
                          onDelete(item);
                        }}
                      />
                    }
                  </View>
                )}
                itemLayoutAnimation={LinearTransition}
              />
            </View>
          )}
          {options.length == 0 && (
            <Text style={styles.noDataText}>No data to restore</Text>
          )}
          <View style={styles.separator} />
          <Button
            style={[styles.button, styles.closeButton]}
            onPress={() => onClose()}
          >
            <Text
              style={[styles.buttonLabel, styles.closeButtonLabel]}
            >
              Close
            </Text>
          </Button>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent backdrop
  },
  popupContainer: {
    backgroundColor: GlobalStyles.colors.primary800,
    borderColor: GlobalStyles.colors.textLight,
    borderWidth: 1,
    paddingTop: 20,
    marginBottom: 0,
    marginHorizontal: 50,
    borderRadius: 8,

    // Add shadow for Android
    elevation: 5,
    // Add shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    justifyContent: "center", // Center vertically
    alignSelf: "center", // Center horizontally
    alignItems: "center",
  },
  title: {
    fontSize: 18, // Increased font size
    fontWeight: "bold",
    marginBottom: 15, // Increased margin
    textAlign: "center", // Center the title
    color: GlobalStyles.colors.textLight,
  },
  separator: {
    height: 1, // Use height for cross-platform compatibility
    width: "100%",
    backgroundColor: GlobalStyles.colors.textLight, // Customize color as needed
  },
  noDataText: {
    fontSize: 14,
    color: GlobalStyles.colors.textLight,
    textAlign: "center",
    padding: 20,
  },
  flatList: {
    padding: 15,
  },
  rowContainer: {
    marginVertical: 5, // Adjust spacing between items as needed
    flexDirection: "row",
    alignItems: "center", // Align items vertically
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    fontSize: 18,
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary500,
    color: GlobalStyles.colors.textLight,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 10,
    minWidth: 100,
  },
  closeButton: {
    // backgroundColor: GlobalStyles.colors.primary500,
    backgroundColor: "transparent",
    paddingTop: 10,
    marginBottom: 5,
    width: "100%",
  },
  buttonLabel: {
    color: GlobalStyles.colors.textLight,
    textAlign: "center",
  },
  closeButtonLabel: {
    fontSize: 14,
  },
});

export default DataRestoreModal;
