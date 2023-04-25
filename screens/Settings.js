import { useContext } from "react";

import LibraryOutput from "../components/Library/LibraryOutput";
import { StoryContext } from "../context/stories-context";
import { StyleSheet, Text, View } from "react-native";

function Settings() {
  const expensesCtx = useContext(StoryContext);
  // let stories= expensesCtx.expenses
  let stories = [];
  return (
    <View>
      <Text> A</Text>
    </View>
    // stories={stories}
    // expensesPeriod="Total"
    // fallbackText="No registered expensessss found!"
  );
}

export default Settings;
