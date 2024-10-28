import * as NavigationBar from "expo-navigation-bar";
import React, { useContext, useEffect, useState } from "react";
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
import { fetchStories } from "../src/util/http";
import { getData } from "../src/util/storage";
import "../src/lang/i18n";
import { useTranslation } from "react-i18next";

export default function Layout() {
  useStickyImmersive();
  const { t } = useTranslation();

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <GlobalContextProvider>
          <StoryContextProvider>
            <PlayContextProvider>
              <Stack
                screenOptions={{
                  tabBarActiveTintColor: GlobalStyles.colors.accent,
                  headerStyle: {
                    backgroundColor: GlobalStyles.colors.header,
                  },
                  headerTintColor: GlobalStyles.colors.white,
                }}
              >
                <Stack.Screen
                  name="(auth)"
                  options={{ headerShown: false }}
                />
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
                    title: t("FILTER.TITLE"),
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
                    title: t("EDIT.TITLE"),
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
