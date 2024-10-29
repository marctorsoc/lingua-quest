import { Pressable, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { forwardRef } from "react";

const IconButton = forwardRef(
  ({ icon, size, disabled, color, onPress, containerStyle }, ref) => (
    <Pressable
      ref={ref}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View
        style={[
          containerStyle,
          styles.buttonContainer,
          disabled && styles.disabled,
        ]}
      >
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  )
);
IconButton.displayName = "IconButton";

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
  disabled: {},
});
