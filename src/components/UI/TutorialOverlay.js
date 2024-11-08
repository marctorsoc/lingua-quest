import {
  Animated,
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
import IconButton from "./IconButton";
import { TUTORIAL_STAGES } from "../../constants/tutorial_stages";

function TutorialOverlay({
  previousButtonDisabled,
  nextButtonDisabled,
}) {
  const { t } = useTranslation();
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const pan = new Animated.ValueXY();

  function endTutorial() {
    setGlobalConfig({
      ...globalConfig,
      tutorialStage: null,
    });
  }
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      if (gesture.dy > 0) {
        // Only allow downward movement
        pan.y.setValue(gesture.dy);
      }
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dy > 50) {
        // Threshold to dismiss
        endTutorial();
      } else {
        Animated.spring(pan.y, {
          toValue: 0,
          useNativeDriver: false,
          friction: 3, // Controls bounce (lower = more bouncy)
        }).start();
      }
    },
  });

  function onTutorialMove(sign) {
    if (
      sign == "+1" &&
      globalConfig.tutorialStage == TUTORIAL_STAGES.END
    ) {
      endTutorial();
      return;
    }

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
      <Animated.Image
        source={require("../../../assets/tutorial_mascot.png")}
        style={[
          styles.mascotImage,
          {
            opacity: mascotOpacity,
            transform: [{ translateY: pan.y }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.overlayContainer,
          { transform: pan.getTranslateTransform() },
        ]}
        {...panResponder.panHandlers}
      >
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
          <IconButton
            icon={"caret-back-circle-outline"}
            size={24}
            disabled={previousButtonDisabled}
            color={GlobalStyles.colors.white}
            containerStyle={ScreensStyles.headerButtonsContainers}
            onPress={() => onTutorialMove(-1)}
          />
          <IconButton
            icon={
              globalConfig.tutorialStage == TUTORIAL_STAGES.END
                ? "checkmark-circle-outline"
                : "caret-forward-circle-outline"
            }
            size={24}
            disabled={nextButtonDisabled}
            color={GlobalStyles.colors.white}
            containerStyle={[
              ScreensStyles.headerButtonsContainers,
              { marginRight: 20 },
            ]}
            onPress={() => onTutorialMove(+1)}
          />
        </View>
      </Animated.View>
    </>
  );
}

export default TutorialOverlay;

const styles = StyleSheet.create({
  mascotImage: {
    position: "absolute",
    bottom: Platform.OS == "web" ? "26%" : "25%", // Adjust this value to position the mascot above the overlay
    alignSelf: "center", // Center the mascot horizontally
    width: "20%", // Adjust size as needed
    height: "20%", // Adjust size as needed
    resizeMode: "contain", // ensure the image maintains its aspect ratio and is fully visible
    zIndex: 1,
  },
  overlayContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "30%",
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
    paddingBottom: "3%",
  },
});
