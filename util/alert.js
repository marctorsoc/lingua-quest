import { _showInformativeAlert, _alert } from "./alert_base";

export const showInformativeAlert = _showInformativeAlert;
export const alert = _alert;

// export const showInformativeToast = (toast, text) => {
//   // TODO: this is for react-native-toast-notifications
//   // but at the moment it makes the whole app crash
//   toast.show(`${text}`, {
//     duration: 1500,
//     data: {
//       title: "Copied to clipboard",
//     },
//     type: "custom_toast",
//   });
// };

export const showInformativeToast = (text) => {
  // we don't have support so just use an alert
  showInformativeAlert("Copied to clipboard", text);
};
