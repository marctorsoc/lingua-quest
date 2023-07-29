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
import {
  GlobalContext,
  GlobalContextProvider,
} from "./context/global-context";
import { useContext } from "react";
import { Alert, View } from "react-native";
import { StoryContextProvider } from "./context/stories-context";
import { PlayContextProvider } from "./context/play-context";

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
        icon="add"
        size={24}
        color={tintColor}
        containerStyle={ScreensStyles.headerButtonsContainers}
        onPress={() => {
          navigation.navigate("ManageStory");
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
    return (
      globalConfig.showLibraryBackButton && (
        <IconButton
          icon="arrow-back-outline"
          size={24}
          color={tintColor}
          containerStyle={{
            margin: 0,
            padding: 0,
            top: 13,
            left: 10,
          }}
          onPress={() => {
            setGlobalConfig({
              ...globalConfig,
              showLibraryBackButton: false,
            });
            navigation.navigate("Library");
          }}
        />
      )
    );
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
        headerTintColor: "white",
        tabBarStyle: ScreensStyles.tabBarStyle,
        // up to here
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerLeft: ({ tintColor }) => headerLeft(tintColor),
        headerRight: ({ tintColor }) => headerRight(tintColor),
      })}
    >
      <BottomTabs.Screen
        name="Library"
        component={Library}
        listeners={() => bottomTabListener("Library")}
        options={{
          title: "Library",
          headerTitleStyle: {
            marginLeft: 30,
          },
          tabBarLabel: "Library",
          tabBarIcon: ({ color, size }) => (
            // check icons at https://ionic.io/ionicons
            <Ionicons
              name="library-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Settings"
        component={Settings}
        listeners={() => bottomTabListener("Settings")}
        options={{
          title: "Settings",
          headerTitleStyle: {
            marginLeft: 30,
          },
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
  const navigation = useNavigation();
  function playGameHeaderRight(tintColor) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          margin: 10,
        }}
      >
        {moveChapterHandler(tintColor, "back")}
        {moveChapterHandler(tintColor, "next")}
      </View>
    );
  }
  function moveChapterHandler(tintColor, direction) {
    const icon = direction == "back" ? "arrow-undo" : "arrow-redo";
    // TODO: compute this properly
    const enabled = true;
    return (
      <IconButton
        icon={icon}
        size={24}
        color={enabled ? tintColor : "grey"}
        containerStyle={ScreensStyles.headerButtonsContainers}
        onPress={() => {
          if (!enabled) return;
          navigation.navigate("ManageStory");
        }}
      />
    );
  }

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
        }}
      />
      <Stack.Screen
        name="PlayStory"
        component={PlayStory}
        options={{
          presentation: "modal",
          headerRight: ({ tintColor }) =>
            playGameHeaderRight(tintColor),
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
            <NavigationContainer>
              <AppStack />
            </NavigationContainer>
          </PlayContextProvider>
        </StoryContextProvider>
      </GlobalContextProvider>
    </>
  );
}
