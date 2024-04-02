import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ManageStory from "./screens/ManageStory";
import Library from "./screens/Library";
import Settings from "./screens/Settings";
import { GlobalStyles, ScreensStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import PlayStory from "./screens/PlayStory";
import SortAndFilterLibrary from "./screens/SortAndFilterLibrary";
import React from "react";

import * as NavigationBar from "expo-navigation-bar";
import { setStatusBarHidden } from "expo-status-bar";

import {
  GlobalContext,
  GlobalContextProvider,
} from "./context/global-context";

import { useContext } from "react";
import { View, Platform } from "react-native";
import { showConfirmation, showInformativeAlert } from "./util/alert";
import {
  StoryContext,
  StoryContextProvider,
} from "./context/stories-context";
import { PlayContextProvider } from "./context/play-context";
import BackButton from "./components/UI/BackButton";
import AddStory from "./screens/AddStory";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function MainNavigator() {
  const navigation = useNavigation();
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const { deleteStory } = useContext(StoryContext);

  function headerRight(tintColor) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {manageStoryHandler(tintColor)}
        {addAndRemoveStoryHandler(tintColor)}
        {sortAndFilterHandler(tintColor)}
      </View>
    );
  }
  function addAndRemoveStoryHandler(tintColor) {
    function deleteThisStory() {
      deleteStory(globalConfig.storyLongPressed);
      showInformativeAlert("Story removed successfully!");
    }
    return (
      <IconButton
        icon={globalConfig.storyLongPressed ? "trash-outline" : "add"}
        size={24}
        color={tintColor}
        containerStyle={ScreensStyles.headerButtonsContainers}
        onPress={() => {
          // if clicked with a story long pressed, delete it
          if (globalConfig.storyLongPressed) {
            try {
              // TODO: right now, only showing confirmation for web
              if (Platform.OS != "web") deleteThisStory();
              else if (showConfirmation("Remove story?"))
                deleteThisStory();
            } catch (error) {
              let msg =
                "Could not delete story - please try again later!";
              console.log(msg);
              showInformativeAlert(msg);
            }
            // update globalConfig.storyLongPressed
            setGlobalConfig({
              ...globalConfig,
              storyLongPressed: undefined,
              showLibraryBackButton: false,
            });
            return;
          }
          // otherwise, open modal to add story
          setGlobalConfig({
            ...globalConfig,
            showLibraryBackButton: true,
          });
          navigation.navigate("AddStory");
        }}
      />
    );
  }
  function manageStoryHandler(tintColor) {
    return (
      globalConfig.storyLongPressed && (
        <IconButton
          icon={"build-outline"}
          size={24}
          color={tintColor}
          containerStyle={ScreensStyles.headerButtonsContainers}
          onPress={() => {
            setGlobalConfig({
              ...globalConfig,
              showLibraryBackButton: true,
            });
            navigation.navigate("ManageStory", {
              storyId: globalConfig.storyLongPressed,
            });
          }}
        />
      )
    );
  }
  function sortAndFilterHandler(tintColor) {
    return (
      <View>
        <IconButton
          icon="funnel-outline"
          size={24}
          color={tintColor}
          containerStyle={ScreensStyles.headerButtonsContainers}
          onPress={() => {
            if (globalConfig.storyLongPressed) {
              showInformativeAlert(
                "Ignoring due to story long pressed",
              );
              return;
            }
            setGlobalConfig({
              ...globalConfig,
              showLibraryBackButton: true,
            });
            navigation.navigate("FilterLibrary");
          }}
        />
      </View>
    );
  }

  function headerLeft(tintColor) {
    return BackButton({ tintColor: tintColor, newPage: "Library" });
  }
  function bottomTabListener(tabName) {
    // TODO: not ideal but needed to remove back button
    // when pressing the tab
    return {
      tabPress: (e) => {
        // Prevent default action
        e.preventDefault();
        // set showLibraryBackButton to false
        setGlobalConfig({
          ...globalConfig,
          showLibraryBackButton: false,
          storyLongPressed: undefined,
        });
        // navigate to Library without param i.e. top-level
        navigation.navigate(tabName);
      },
    };
  }

  return (
    <BottomTabs.Navigator
      // TODO: remove this navigation if the hook works
      screenOptions={() => ({
        // TODO: move all these styles out
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTitleStyle: {
          marginLeft: 30,
        },
        headerTintColor: "white",
        tabBarStyle: ScreensStyles.tabBarStyle,
        // up to here
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerLeft: ({ tintColor }) => headerLeft(tintColor),
      })}
    >
      <BottomTabs.Screen
        name="Library"
        component={Library}
        listeners={() => bottomTabListener("Library")}
        options={({ route }) => ({
          title: route.params?.parentTitle || "Library",
          tabBarLabel: "Library",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="library-outline"
              size={size}
              color={color}
            />
          ),
          headerRight: ({ tintColor }) => headerRight(tintColor),
        })}
      />
      <BottomTabs.Screen
        name="Settings"
        component={Settings}
        listeners={() => bottomTabListener("Settings")}
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="options" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="MainNavigator"
        component={MainNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageStory"
        component={ManageStory}
        options={{
          presentation: "modal",
          headerLeft: (props) =>
            BackButton({ ...props, newPage: "Library" }),
        }}
      />
      <Stack.Screen
        name="AddStory"
        component={AddStory}
        options={{
          presentation: "modal",
          headerLeft: (props) =>
            BackButton({ ...props, newPage: "Library" }),
        }}
      />
      <Stack.Screen
        name="FilterLibrary"
        component={SortAndFilterLibrary}
        title="Filter Library"
        options={{
          presentation: "modal",
          headerLeft: (props) =>
            BackButton({ ...props, newPage: "Library" }),
        }}
      />
      <Stack.Screen
        name="PlayStory"
        component={PlayStory}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

function useStickyImmersive() {
  const visibility = NavigationBar.useVisibility();
  NavigationBar.setPositionAsync("absolute");
  NavigationBar.setVisibilityAsync("hidden");
  NavigationBar.setBehaviorAsync("inset-swipe");
  NavigationBar.setBackgroundColorAsync("#00000080"); // `rgba(0,0,0,0.5)`
  setStatusBarHidden(true, "none");

  React.useEffect(() => {
    if (visibility === "visible") {
      const interval = setTimeout(() => {
        NavigationBar.setVisibilityAsync("hidden");
      }, /* 3 Seconds */ 3000);

      return () => {
        clearTimeout(interval);
      };
    }
  }, [visibility]);
}

export default function App() {
  useStickyImmersive();
  return (
    <>
      <StatusBar style="light" />

      <GlobalContextProvider>
        <StoryContextProvider>
          <PlayContextProvider>
            <NavigationContainer>
              <AppStack />
            </NavigationContainer>
          </PlayContextProvider>
        </StoryContextProvider>
      </GlobalContextProvider>
    </>
  );
}
