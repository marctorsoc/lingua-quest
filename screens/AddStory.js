// TODO: this is supposed to get the stories list from
// Google Drive, and download each story file
// atm, it's still old from when I planned to use
// the Google Drive API

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
import useGoogleSignIn from "../util/google_auth";
import Button from "../components/UI/Button";
import { Text } from "react-native";

function AddStory({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const { userInfo, promptAsync } = useGoogleSignIn();

  const { stories, setStories } = useContext(StoryContext);
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);

  const editedStoryId = route.params?.storyId;
  const isEditing = editedStoryId !== undefined;
  const selectedStory = stories.find(
    (story) => story.id === editedStoryId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add Story",
    });
  }, [navigation, isEditing]);

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
        : story,
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
  // console.log(userInfo);
  return (
    <View style={styles.container}>
      {/* If not signed in, show button to do so */}
      {userInfo ? (
        <Text style={{ color: "white", width: "60%" }}>
          Signed in as
          {JSON.stringify(userInfo)}
        </Text>
      ) : (
        <Button
          style={[ScreensStyles.button, { height: "10%" }]}
          onPress={() => promptAsync()}
        >
          <Text style={ScreensStyles.buttonLabel}>
            Sign in with Google
          </Text>
        </Button>
      )}
    </View>
  );
}

export default AddStory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
