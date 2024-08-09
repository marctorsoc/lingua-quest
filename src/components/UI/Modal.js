import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  CheckBox,
  Modal,
} from "react-native";
import Button from "./Button";

export default function OptionModal({ title, names, propsSetter }) {
  const [modalVisible, setModalVisible] = useState(false);
  // stat with all unchecked
  const [options, setOptions] = useState(
    names.reduce((acc, name) => {
      acc[name] = false;
      return acc;
    }, {}),
  );

  const toggleOption = (option) => {
    setOptions({
      ...options,
      [option]: !options[option],
    });
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = () => {
    // Handle the selected options here
    // (e.g., save to state or send to a server).
    // console.log("Selected Options:", options);
    propsSetter(options);

    // Close the modal
    setModalVisible(false);
  };

  return (
    <View>
      <Button style={styles.button} onPress={openModal}>
        {/*{TODO: center the text}*/}
        <Text style={styles.buttonLabel}>{title}</Text>
      </Button>

      <Modal isVisible={modalVisible}>
        <View>
          <Text>{title}</Text>
          {names.map((name) => (
            <CheckBox
              key={name}
              title={name}
              checked={options[name]}
              onPress={() => toggleOption(name)}
            />
          ))}
          <Button title="Submit" onPress={handleSubmit} />
          <Button title="Cancel" onPress={closeModal} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonLabel: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },
  button: {
    fontSize: 18,
    color: "white",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    margin: 16,
    width: "100%",
  },
});
