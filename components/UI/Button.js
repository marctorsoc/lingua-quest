import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Button({ children, onPress, onLongPress, style }) {
  return (
    <Pressable
      onLongPress={() => {
        // console.log("Long Press");
        if (onLongPress !== undefined) onLongPress();
      }}
      delayLongPress={200}
      onPress={onPress}
      style={({ pressed }) => [style, pressed && styles.pressed]}
    >
      <View style={styles.buttonView}>{children}</View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  flat: {
    backgroundColor: "transparent",
  },
  buttonView: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.5,
  },
});
