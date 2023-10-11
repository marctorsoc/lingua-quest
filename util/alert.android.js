import { ToastAndroid } from "react-native";
import { _showInformativeAlert, _alert } from "./alert_base";

export const showInformativeAlert = (title, message) => {
  _showInformativeAlert(title, message);
};

export const alert = _alert;

export const showInformativeToast = (text) => {
  ToastAndroid.show(text, ToastAndroid.SHORT);
};
