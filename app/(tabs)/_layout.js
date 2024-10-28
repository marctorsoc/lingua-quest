import React, { useContext } from "react";
import { Tabs } from "expo-router";
import { GlobalStyles } from "../../src/constants/styles";
import { Ionicons } from "@expo/vector-icons";
import {
  HeaderLeft as LibraryHeaderLeft,
  HeaderRight as LibraryHeaderRight,
} from "../../src/components/Library/Header";
import { HeaderRight as SettingsHeaderRight } from "../../src/components/Settings/Header";
import { GlobalContext } from "../../src/context/global-context";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: GlobalStyles.colors.accent, // Accent color for active icon
        tabBarInactiveTintColor: GlobalStyles.colors.gray, // Gray or subdued color for inactive icon
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.tabBar, // Background color of the tab bar
          padding: 5, // Add margin at the bottom of the tab bar
        },
        headerStyle: {
          backgroundColor: GlobalStyles.colors.header,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerTintColor: GlobalStyles.colors.white,
      }}
      screenListeners={{
        tabPress: () => {
          // reset storyLongPressed when a tab is pressed
          setGlobalConfig({
            ...globalConfig,
            storyLongPressed: undefined,
          });
        },
      }}
    >
      <Tabs.Screen
        name="library"
        options={{
          title: "LinguaQuest",
          tabBarLabel: t("TABS.PLAY"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="library-outline"
              size={size}
              color={color}
            />
          ),
          headerLeft: ({ tintColor }) => (
            <LibraryHeaderLeft tintColor={tintColor} />
          ),
          headerRight: ({ tintColor }) => (
            <LibraryHeaderRight tintColor={tintColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="catalog"
        options={{
          title: t("TABS.CATALOG"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("TABS.SETTINGS"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={color}
            />
          ),
          headerRight: ({ tintColor }) => (
            <SettingsHeaderRight tintColor={tintColor} />
          ),
        }}
      />
    </Tabs>
  );
}
