import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Button({ children, onPress, style }) {
  return (
    <Pressable
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
