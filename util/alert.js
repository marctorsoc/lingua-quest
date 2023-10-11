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

export const alert =
  Platform.OS === "web" ? alertPolyfill : Alert.alert;

export const showInformativeAlert = (title, message) => {
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

export const showInformativeToast = (toast, text) => {
  toast.show(`${text}`, {
    duration: 1500,
    data: {
      title: "Copied to clipboard",
    },
    type: "custom_toast",
  });
};
