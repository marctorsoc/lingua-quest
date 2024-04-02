import { Pressable, StyleSheet, Text, View } from "react-native";

function Button({ children, onPress, onLongPress, style, disabled }) {
  return (
    <Pressable
      // disabled if disabled passed and true
      disabled={disabled === undefined ? false : disabled}
      onLongPress={() => {
        // console.log("Long Press");
        if (onLongPress !== undefined) onLongPress();
      }}
      delayLongPress={200}
      onPress={onPress}
      style={({ pressed }) => [
        style,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
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
  disabled: {
    opacity: 0.5,
  },
});
