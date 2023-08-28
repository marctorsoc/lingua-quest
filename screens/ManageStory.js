import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import StoryForm from "../components/ManageStory/StoryForm";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles, ScreensStyles } from "../constants/styles";
import { StoryContext } from "../context/stories-context";
import { GlobalContext } from "../context/global-context";
import { storeData } from "../util/storage";
import { showInformativeAlert } from "../util/alert";

function ManageStory({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const { stories, setStories } = useContext(StoryContext);
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);

  const editedStoryId = route.params?.storyId;
  const isEditing = editedStoryId !== undefined;

  const selectedStory = stories.find(
    (story) => story.id === editedStoryId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Story" : "Add Story",
      // TODO: this is a big hack
      // headerTitleStyle: ScreensStyles.headerTitleStyle,
    });
  }, [navigation, isEditing]);

  async function deleteStoryHandler() {
    //   setIsSubmitting(true);
    //   try {
    //     await deleteExpense(editedExpenseId);
    //     expensesCtx.deleteStory(editedExpenseId);
    //     navigation.goBack();
    //   } catch (error) {
    //     setError("Could not delete story - please try again later!");
    //     setIsSubmitting(false);
    //   }
  }

  function goBack() {
    setGlobalConfig({
      ...globalConfig,
      showLibraryBackButton: false,
      storyLongPressed: undefined,
    });
    navigation.goBack();
  }
  function cancelHandler() {
    goBack();
  }

  async function submitHandler(storyData) {
    if (!isEditing) {
      console.log("adding new story not implemented yet");
      return;
    }
    // save to context and local storage
    const updatedStories = stories.map((story) =>
      story.id === editedStoryId
        ? {
            ...story,
            ...storyData,
          }
        : story
    );
    setStories(updatedStories);
    storeData("stories", JSON.stringify(updatedStories));

    showInformativeAlert("Story updated");
    goBack();

    // setIsSubmitting(true);
    // try {
    //   if (isEditing) {
    //     expensesCtx.updateStory(editedExpenseId, expenseData);
    //     await updateExpense(editedExpenseId, expenseData);
    //   } else {
    //     const id = await storeExpense(expenseData);
    //     expensesCtx.addStory({ ...expenseData, id: id });
    //   }
    //   navigation.goBack();
    // } catch (error) {
    //   setError("Could not save data - please try again later!");
    //   setIsSubmitting(false);
    // }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <StoryForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={submitHandler}
        onCancel={cancelHandler}
        defaultValues={selectedStory}
      />
    </View>
  );
}

export default ManageStory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
