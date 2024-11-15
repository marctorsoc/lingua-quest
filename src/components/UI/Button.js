import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

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
        disabled && GlobalStyles.disabled,
      ]}
    >
      {children}
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
});
