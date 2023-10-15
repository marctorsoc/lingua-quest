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
// import { ToastProviderWrapper } from "./util/toast";

// import ToastProvider from "react-native-toast-notifications";

import {
  GlobalContext,
  GlobalContextProvider,
} from "./context/global-context";

import { useContext } from "react";
import { Alert, View } from "react-native";
import { StoryContextProvider } from "./context/stories-context";
import { PlayContextProvider } from "./context/play-context";
import BackButton from "./components/UI/BackButton";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function MainNavigator() {
  const navigation = useNavigation();
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);

  function headerRight(tintColor) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {addStoryHandler(tintColor)}
        {sortAndFilterHandler(tintColor)}
      </View>
    );
  }
  function addStoryHandler(tintColor) {
    return (
      <IconButton
        icon={globalConfig.storyLongPressed ? "build-outline" : "add"}
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
    );
  }
  function sortAndFilterHandler(tintColor) {
    return (
      <IconButton
        icon="funnel-outline"
        size={24}
        color={tintColor}
        containerStyle={ScreensStyles.headerButtonsContainers}
        onPress={() => {
          console.log("TODO: implement");
          Alert.alert("TODO: implement");
        }}
      />
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
        options={{
          title: "Library",
          tabBarLabel: "Library",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="library-outline"
              size={size}
              color={color}
            />
          ),
          headerRight: ({ tintColor }) => headerRight(tintColor),
        }}
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
        name="PlayStory"
        component={PlayStory}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <GlobalContextProvider>
        <StoryContextProvider>
          <PlayContextProvider>
            {/* <ToastProvider> */}
            <NavigationContainer>
              <AppStack />
            </NavigationContainer>
            {/* </ToastProvider> */}
          </PlayContextProvider>
        </StoryContextProvider>
      </GlobalContextProvider>

      {/* </ToastProviderWrapper> */}
    </>
  );
}
