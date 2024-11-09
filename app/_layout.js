import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";

import { Stack } from "expo-router";
import { Platform, UIManager } from "react-native";
import { GlobalContextProvider } from "../src/context/global-context";
import { StoryContextProvider } from "../src/context/stories-context";
import { PlayContextProvider } from "../src/context/play-context";
import { GlobalStyles } from "../src/constants/styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  setStatusBarHidden,
  setStatusBarStyle,
  StatusBar,
} from "expo-status-bar";
import "../src/lang/i18n";
import { useTranslation } from "react-i18next";

export default function Layout() {
  // Enable layout animation for Android
  if (Platform.OS === "android") {
    useStickyImmersive();
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const { t } = useTranslation();

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <GlobalContextProvider>
          <StoryContextProvider>
            <PlayContextProvider>
              <StatusBar style="light" />
              <Stack
                screenOptions={{
                  tabBarActiveTintColor: GlobalStyles.colors.accent,
                  headerStyle: {
                    backgroundColor: GlobalStyles.colors.header,
                  },
                  headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 20,
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
                  name="changeLanguages"
                  options={{
                    presentation: "modal",
                    title: t("CHANGE_LANGUAGES.TITLE"),
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
  // NavigationBar.setBackgroundColorAsync("#fff"); // `rgba(0,0,0,0.5)`
  // StatusBar.setco("#fff"); // `rgba(0,0,0,0.5)`
  // setStatusBarBackgroundColor("#fff"); // `rgba(0,0,0,0.5)`
  setStatusBarStyle("light");
  setStatusBarHidden(true, "none");
  // StatusBar.setVisibilityAsync("hidden");
  // setStatusBarTranslucent(true);

  useEffect(() => {
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
