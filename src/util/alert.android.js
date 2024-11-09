import { ToastAndroid } from "react-native";
import { _showInformativeAlert } from "./alert_base";
import { Alert } from "react-native";

export const showInformativeAlert = (title, message) => {
  _showInformativeAlert(title, message);
};

export const showConfirmation = (title, message) => {
  let result = false;
  Alert.alert(
    title,
    message,
    [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OKkkk",
        onPress: () => {
          result = true;
        },
      },
    ],
    {
      cancelable: true,
      // do nothing
      onDismiss: () => {},
    }
  );
  console.log("result", result);
  return result;
};

export const showInformativeToast = (text) => {
  ToastAndroid.show(text, ToastAndroid.SHORT);
};
