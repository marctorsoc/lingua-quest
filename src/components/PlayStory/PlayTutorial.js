import {
  Animated,
  Image,
  PanResponder,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GlobalStyles, ScreensStyles } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { GlobalContext } from "../../context/global-context";
import { useContext } from "react";
import IconButton from "../UI/IconButton";
import { router } from "expo-router";

function PlayTutorial() {
  const { t } = useTranslation();
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const pan = new Animated.ValueXY();

  function onExitTutorial() {
    setGlobalConfig({
      ...globalConfig,
      tutorialStage: null,
    });
    router.navigate("library");
  }

  function onTutorialMove(direction) {
    const sign = direction === "next" ? 1 : -1;
    setGlobalConfig({
      ...globalConfig,
      tutorialStage: globalConfig.tutorialStage + sign,
    });
  }

  const mascotOpacity = pan.y.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <>
      <Image
        source={require("../../../assets/tutorial_mascot.png")}
        style={[styles.mascotImage]}
      />
      <View style={[styles.overlayContainer]}>
        <ScrollView style={styles.messageScroll}>
          {/* to debug */}
          {/* <Text style={styles.messageText}>
            {globalConfig.tutorialStage}
          </Text> */}
          <Text style={styles.messageText}>
            {t(`TUTORIAL.STAGE_${globalConfig.tutorialStage}`)}
          </Text>
        </ScrollView>
        <View style={styles.buttonRow}>
          <View style={styles.navigationButtons}>
            <IconButton
              icon={"exit-outline"}
              size={24}
              disabled={globalConfig.tutorialStage === 0}
              color={GlobalStyles.colors.white}
              containerStyle={ScreensStyles.headerButtonsContainers}
              onPress={onExitTutorial}
            />
          </View>
        </View>
      </View>
    </>
  );
}

export default PlayTutorial;

const styles = StyleSheet.create({
  mascotImage: {
    position: "absolute",
    bottom: Platform.OS == "web" ? "48%" : "43%", // Adjust this value to position the mascot above the overlay
    alignSelf: "center", // Center the mascot horizontally
    width: Platform.OS == "web" ? "15%" : "20%", // Adjust size as needed
    height: "20%", // Adjust size as needed
    resizeMode: "contain", // ensure the image maintains its aspect ratio and is fully visible
    zIndex: 1,
  },
  overlayContainer: {
    position: "absolute",
    bottom: 200,
    left: 0,
    right: 0,
    height: "25%",
    backgroundColor: GlobalStyles.colors.header,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    zIndex: 2,
  },
  messageScroll: {
    padding: "3%",
    marginBottom: "2%",
    marginRight: "2%",
  },
  messageText: {
    color: GlobalStyles.colors.white,
    fontSize: 18,
    textAlign: "justify",
    lineHeight: 30,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: "3%",
    marginRight: "2%",
  },
  navigationButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
});
