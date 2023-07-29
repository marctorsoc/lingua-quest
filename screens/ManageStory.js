import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import StoryForm from "../components/ManageStory/StoryForm";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles, ScreensStyles } from "../constants/styles";
import { StoryContext } from "../context/stories-context";
// import {
//   storeExpense,
//   updateExpense,
//   deleteExpense,
// } from "../util/http";

function ManageStory({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const expensesCtx = useContext(StoryContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.stories.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Story" : "Add Story",
      // TODO: this is a big hack
      headerTitleStyle: ScreensStyles.headerTitleStyle,
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
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

  function cancelHandler() {
    // TODO: extract this into a method with
    // const navigation = useNavigation();
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
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
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
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
