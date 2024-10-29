import { Platform } from "react-native";

export const GlobalStyles = {
  // TODO: add more colors. Could use
  // https://uicolors.app/create
  colors_old: {
    white: "#ffffff",
    primary50: "#e4d9fd",
    primary100: "#c6affc",
    primary200: "#a281f0",
    primary400: "#5721d4",
    primary500: "#3e04c3",
    primary500a: "#4211B573",
    primary700: "#2d0689",
    primary800: "#200364",
    accent500: "#f7bc0c",
    error50: "#fcc4e4",
    error500: "#9b095c",
    gray500: "#39324a",
    gray700: "#221c30",
  },
  colors: {
    background: "#f0f1f3", // Main background for all screens (good choice, light and neutral)
    header: "#4A115F", // Dark purple header color (works well, but consider a slightly brighter option)
    primaryButton: "#6B1D73", // Use a brighter variant of purple for primary buttons to enhance visibility
    secondaryButton: "#DBC2E5", // Light lavender for secondary buttons (this works, soft and pleasant)
    interactiveItem: "#83389f", // Rich purple for clickable items (consider changing to #6B1D73 for consistency)
    accent: "#f59e0b", // Bright yellow for highlights and calls-to-action (great choice for visibility)
    error: "#dc2626", // Red for error messages (effective and clear)
    lightGray: "#d1d5db", // Light gray for backgrounds and borders (appropriate)
    gray: "#6b7280", // Neutral gray for secondary text (effective)
    blackText: "#111827", // Dark gray for main text (excellent choice for readability)
    white: "#f2f2f2", // Soft white for elements on dark backgrounds (good)
    tabBar: "#e2e5ea", // Light gray for the tab bar background (this works well)
  },
  disabled: {
    opacity: 0.6,
  },
};

export const languageFlag = {
  width: 24,
  height: 24,
  backgroundColor: "#dce7ff", // Soft background color for container
  borderRadius: 12,
  borderWidth: 1,
  borderColor: GlobalStyles.colors.lightGray, // Soft border for flags
};

export const languageFlagPicker = {
  width: 24,
  height: 24,
  resizeMode: "contain",
};

export const AuthStyles = {
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: GlobalStyles.colors.background,
  },
  title: {
    marginVertical: "10%",
    fontSize: 28,
    fontWeight: "bold",
  },
  appLangContainer: {
    position: "absolute",
    top: "2%",
    right: "5%",
    maxWidth: "20%",
  },
};

export const ScreensStyles = {
  headerButtonsContainers: {
    margin: 5,
    padding: 0,
  },
  popoverContainer: {
    // width: "100%",
    // height: "20%",
    width: "auto",
    backgroundColor: GlobalStyles.colors.error500,
    borderRadius: 12,
  },
  tileShadow: {
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: {
      width: 4, // Horizontal shadow offset
      height: 4, // Vertical shadow offset
    },
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 6, // Shadow blur radius
    elevation: 4, // Elevation for Android
  },
  button: {
    paddingVertical: "3%",
    paddingHorizontal: "2%",
    marginHorizontal: "5%",
    backgroundColor: GlobalStyles.colors.secondaryButton,
    // overflow: "hidden",
    borderRadius: 20,
    borderColor: GlobalStyles.colors.lightGray,
    borderWidth: 1,

    // TODO: is this needed?
    zIndex: 5,
  },
  buttonLabel: {
    textAlign: "center",
    fontSize: 16,
    color: GlobalStyles.colors.blackText,
    paddingHorizontal: "5%",
    // paddingVertical: "2%",
  },
  input: {
    height: Platform.OS === "web" ? "25px" : "45%",
    borderColor: GlobalStyles.colors.lightGray,
    color: "black",
    fontSize: 16,
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    margin: "1%",
  },
  numericInput: {
    width: "10%",
    marginRight: "5%",
  },
};

export const LanguagePickers = {
  inputsLanguagesRow: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 500,
    marginHorizontal: Platform.OS == "web" ? "0" : "25%",
  },
  inputLanguageCol: {
    flexDirection: "column",
    alignItems: "center",
    zIndex: 500,
  },
  languagePicker: {
    width: Platform.OS === "web" ? "20%" : "100%",
  },
};

export const LibraryStyles = {
  label: {
    fontSize: 25,
    color: GlobalStyles.colors.textLight,
    paddingHorizontal: 16,
    textAlign: "center",
    width: "100%",
  },
};
