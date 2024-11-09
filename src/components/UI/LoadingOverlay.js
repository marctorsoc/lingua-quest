import { View, ActivityIndicator, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={GlobalStyles.colors.textLight}
      />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
