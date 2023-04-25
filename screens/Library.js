import { useContext, useEffect, useLayoutEffect, useState } from "react";

import LibraryOutput from "../components/Library/LibraryOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { StoryContext } from "../context/stories-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import { storiesSample } from "../assets/mocks";

function Library(navigation, route) {
  // TODO marc: see example for this in https://reactnative.dev/docs/network
  const [isFetching, setIsFetching] = useState(true);

  // TODO: this library is a mock, but should be
  // retrieved from the API
  const { stories, setStories } = useContext(StoryContext);

  const [error, setError] = useState();

  // const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getStories() {
      setIsFetching(true);
      try {
        // const expenses = await fetchExpenses();
        const RequestedStories = [...storiesSample];
        setStories(RequestedStories);
        // TODO: save a copy to disk for offline use?
      } catch (error) {
        // setError("Could not fetch expenses!");
        console.log("Could not fetch stories!");
      }
      setIsFetching(false);
    }

    getStories();
  }, []);

  const parentId = navigation.route.params?.parentId;

  useLayoutEffect(() => {
    // console.log(parentId);
    const title =
      parentId !== undefined
        ? stories.find((story) => story.id === parentId).title
        : "Library";
    // console.log(title);
    navigation.navigation.setOptions({
      title: title,
      // TODO: this is a big hack
      // headerTitleStyle: ScreensStyles.headerTitleStyle,
    });
  }, [navigation]);

  // if (error && !isFetching) {
  //   return <ErrorOverlay message={error} />;
  // }

  // if (isFetching) {
  //   return <LoadingOverlay />;
  // }

  // const library = expensesCtx.expenses.filter((expense) => {
  //   const today = new Date();
  //   const date7DaysAgo = getDateMinusDays(today, 7);

  //   return expense.date >= date7DaysAgo && expense.date <= today;
  // });
  // console.log("route.params");
  // console.log(route.params);
  // // console.log(navigation);
  // if (navigation.route.params?.filterByParentId) {
  //   console.log("route.params.filterByParentId");
  //   console.log(navigation.route.params.filterByParentId);
  // }

  return (
    <LibraryOutput
      stories={stories}
      fallbackText="No stories added yet."
      parentId={parentId}
    />
  );
}

export default Library;
