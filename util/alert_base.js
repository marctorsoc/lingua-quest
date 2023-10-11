// A base file is created to hold the common code between
// the Android and default files. We need this because
// importing ToastAndroid on web fails...

import { Alert, Platform } from "react-native";

const alertPolyfill = (title, description, options, extra) => {
  const handler =
    options.length === 1 ? window.alert : window.confirm;
  const result = handler(
    [title, description].filter(Boolean).join("\n")
  );

  if (result) {
    const confirmOption = options.find(
      ({ style }) => style !== "cancel"
    );
    confirmOption && confirmOption.onPress();
  } else {
    const cancelOption = options.find(
      ({ style }) => style === "cancel"
    );
    cancelOption && cancelOption.onPress();
  }
};

export const _alert =
  Platform.OS === "web" ? alertPolyfill : Alert.alert;

export const _showInformativeAlert = (title, message) => {
  alert(
    title,
    message,
    [
      {
        text: "Ok",
        onPress: () => {},
      },
    ],
    { cancelable: false }
  );
};
