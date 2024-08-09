import * as NavigationBar from "expo-navigation-bar";
import React, { useContext } from "react";
import { Stack } from "expo-router";
import {
  GlobalContext,
  GlobalContextProvider,
} from "../src/context/global-context";
import { StoryContextProvider } from "../src/context/stories-context";
import { PlayContextProvider } from "../src/context/play-context";
import { GlobalStyles } from "../src/constants/styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  setStatusBarHidden,
  setStatusBarTranslucent,
  StatusBar,
} from "expo-status-bar";

export default function Layout() {
  useStickyImmersive();
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <GlobalContextProvider>
          <StoryContextProvider>
            <PlayContextProvider>
              <Stack
                screenOptions={{
                  tabBarActiveTintColor:
                    GlobalStyles.colors.accent500,
                  headerStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                  },
                  headerTintColor: "white",
                }}
              >
                <Stack.Screen
                  name="(tabs)"
                  options={{ headerShown: false }}
                />
                {/* Define modals here */}
                <Stack.Screen
                  name="play/[storyId]"
                  options={{ presentation: "modal" }}
                />
                <Stack.Screen
                  name="filterLibrary"
                  options={{
                    presentation: "modal",
                    title: "Filter Library",
                  }}
                />
                <Stack.Screen
                  name="library/[parentId]"
                  options={{ presentation: "modal" }}
                />
                <Stack.Screen
                  name="manageStory/[storyId]"
                  options={{
                    presentation: "modal",
                    title: "Edit story",
                  }}
                />
              </Stack>
            </PlayContextProvider>
          </StoryContextProvider>
        </GlobalContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function useStickyImmersive() {
  const visibilityNB = NavigationBar.useVisibility();
  NavigationBar.setPositionAsync("absolute");
  NavigationBar.setVisibilityAsync("hidden");
  NavigationBar.setBehaviorAsync("inset-swipe");
  NavigationBar.setBackgroundColorAsync("#00000080"); // `rgba(0,0,0,0.5)`
  setStatusBarHidden(true, "none");
  // StatusBar.setVisibilityAsync("hidden");
  // setStatusBarTranslucent(true);

  React.useEffect(() => {
    if (visibilityNB === "visible") {
      const interval = setTimeout(() => {
        NavigationBar.setVisibilityAsync("hidden");
        // setStatusBarHidden(true, "none");
        // setStatusBarTranslucent(true);
      }, /* 3 Seconds */ 3000);

      return () => {
        clearTimeout(interval);
      };
    }
  }, [visibilityNB]);
}
