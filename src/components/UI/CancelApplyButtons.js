import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles, ScreensStyles } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import Button from "./Button";

export function CancelApplyButtons({
  onCancel,
  onApply,
  applyButtonLabel,
  disabledApply = false,
}) {
  const { t } = useTranslation();

  return (
    // two buttons side by side to Cancel or Apply
    <View style={styles.buttons}>
      <Button
        style={[
          ScreensStyles.button,
          styles.button,
          styles.cancelButton,
        ]}
        onPress={onCancel}
      >
        <Text style={ScreensStyles.buttonLabel}>
          {t("GLOBAL.CANCEL")}
        </Text>
      </Button>
      <Button
        style={[
          ScreensStyles.button,
          styles.button,
          styles.applyButton,
        ]}
        disabled={disabledApply}
        onPress={onApply}
      >
        <Text style={ScreensStyles.buttonLabel}>
          {applyButtonLabel}
        </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: "3%",
  },
  // cancelButton: {
  //   // backgroundColor: "#5894f2",
  //   backgroundColor: GlobalStyles.colors.primaryButton,
  // },
  // applyButton: {
  //   // backgroundColor: "#f7b95b",
  //   backgroundColor: GlobalStyles.colors.primary500,
  // },
});
