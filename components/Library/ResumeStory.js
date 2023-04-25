import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import { Pressable } from "react-native";

function ResumeStory({ stories: stories }) {
  // TODO: find story that was played the latest and surface
  // to the summary to resume
  // if never played any story, remove

  // TODO marc: compute properly
  const enabled = true;

  return (
    enabled && (
      <View style={styles.container}>
        <Pressable onPress={() => {}}>
          <Text>
            TODO: Implement to continue with the same story
          </Text>
        </Pressable>
      </View>
    )
  );
}

export default ResumeStory;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginBottom: 24,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
