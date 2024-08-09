import ToastProvider from "react-native-toast-notifications";
import { View, Text } from "react-native";

export function ToastProviderWrapper({ children }) {
  return (
    <ToastProvider
      renderType={{
        custom_toast: (toast) => (
          <View
            style={{
              maxWidth: "85%",
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: "#fff",
              marginVertical: 4,
              borderRadius: 8,
              borderLeftColor: "#00C851",
              borderLeftWidth: 6,
              justifyContent: "center",
              paddingLeft: 16,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#333",
                fontWeight: "bold",
              }}
            >
              {toast.data.title}
            </Text>
            <Text style={{ color: "#141313", marginTop: 2 }}>
              {toast.message}
            </Text>
          </View>
        ),
      }}
    >
      {children}
    </ToastProvider>
  );
}
