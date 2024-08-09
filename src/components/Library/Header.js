import { Image, Platform, Text, View } from "react-native";
import { IconStyle, ScreensStyles } from "../../constants/styles";
import IconButton from "../UI/IconButton";
import {
  showConfirmation,
  showInformativeAlert,
} from "../../util/alert";
import { useNavigation, useRouter } from "expo-router";
import { useContext } from "react";
import { StoryContext } from "../../context/stories-context";
import { GlobalContext } from "../../context/global-context";
import { findPropertyByKey, logos } from "../../constants/languages";

export const HeaderLeft = ({ tintColor }) => {
  const { globalConfig } = useContext(GlobalContext);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20,
        color: tintColor,
      }}
    >
      <Text
        style={{ color: tintColor, fontSize: 18, fontWeight: "bold" }}
      >
        Caption Master
      </Text>
      <Text style={{ color: tintColor, fontSize: 18 }}>
        : Learning{"  "}
      </Text>
      <Image
        source={logos[globalConfig.filters.learningLanguage]}
        style={IconStyle}
      />
    </View>
  );
};

export const HeaderRight = ({ tintColor }) => {
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const router = useRouter();
  const { deleteStory } = useContext(StoryContext);

  function manageStoryHandler() {
    return (
      globalConfig.storyLongPressed && (
        <IconButton
          icon={"build-outline"}
          size={24}
          color={tintColor}
          containerStyle={ScreensStyles.headerButtonsContainers}
          onPress={() => {
            router.push({
              pathname: "/manageStory/[storyId]",
              params: { storyId: globalConfig.storyLongPressed },
            });
          }}
        />
      )
    );
  }

  function addAndRemoveStoryHandler() {
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
            });
            return;
          }
          // otherwise, open modal to add story
          showInformativeAlert("Adding stories not implemented yet!");
          //   router.push("AddStory");
        }}
      />
    );
  }

  function sortAndFilterHandler() {
    return (
      <View>
        <IconButton
          icon={
            globalConfig.storyLongPressed
              ? "close-circle-outline"
              : "funnel-outline"
          }
          size={24}
          color={tintColor}
          containerStyle={ScreensStyles.headerButtonsContainers}
          onPress={() => {
            if (globalConfig.storyLongPressed) {
              setGlobalConfig({
                ...globalConfig,
                storyLongPressed: undefined,
              });
              return;
            }
            router.push("filterLibrary");
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {manageStoryHandler()}
      {addAndRemoveStoryHandler()}
      {sortAndFilterHandler()}
    </View>
  );
};
