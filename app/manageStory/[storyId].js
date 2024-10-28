import { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { GlobalStyles } from "../../src/constants/styles";
import { useLocalSearchParams, useRouter } from "expo-router";
import StoryForm from "../../src/components/ManageStory/StoryForm";
import { StoryContext } from "../../src/context/stories-context";
import { GlobalContext } from "../../src/context/global-context";
import { showInformativeAlert } from "../../src/util/alert";
import { storeData } from "../../src/util/storage";
import { useTranslation } from "react-i18next";

function ManageStory() {
  const { stories, setStories } = useContext(StoryContext);
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const router = useRouter();
  const { t } = useTranslation();

  const { storyId } = useLocalSearchParams();
  const isEditing = storyId !== undefined;

  const selectedStory = stories.find((story) => story.id === storyId);

  //   useLayoutEffect(() => {
  //     navigation.setOptions({
  //       title: isEditing ? "Edit Story" : "Add Story",
  //     });
  //   }, [navigation, isEditing]);

  function goBack() {
    setGlobalConfig({
      ...globalConfig,
      storyLongPressed: undefined,
    });
    router.back();
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
      story.id === storyId
        ? {
            ...story,
            ...storyData,
          }
        : story,
    );
    setStories(updatedStories);
    storeData(
      "stories-" + globalConfig.userId,
      JSON.stringify(updatedStories),
    );

    showInformativeAlert(t("EDIT.ALERT_STORY_UPDATED"));
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

  // if (error && !isSubmitting) {
  //   return <ErrorOverlay message={error} />;
  // }

  // if (isSubmitting) {
  //   return <LoadingOverlay />;
  // }

  return (
    <View style={styles.container}>
      <StoryForm
        submitButtonLabel={
          isEditing ? t("GLOBAL.APPLY") : t("GLOBAL.ADD")
        }
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
