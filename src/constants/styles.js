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
    background: "#f0f1f3", // Main background for all screens
    header: "#3a7ff0", // Consistent header color for all screens
    primaryButton: "#4b92e8", // Main color for primary action buttons
    secondaryButton: "#dce7ff", // Color for secondary buttons or less prominent actions
    interactiveItem: "#4b92e8", // Color for clickable items like story cards (same as secondary button for coherence)
    accent: "#f59e0b", // Accent color for highlights, icons, or specific calls-to-action
    error: "#dc2626", // Error color for alerts and warnings
    lightGray: "#d1d5db", //
    gray: "#6b7280", // Neutral gray for secondary text or placeholders
    blackText: "#111827", // Main text color for readability
    white: "#f2f2f2", // For elements on dark backgrounds
    tabBar: "#e2e5ea",
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
    backgroundColor: GlobalStyles.colors.primary700,
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
  tabBarStyle: {
    backgroundColor: GlobalStyles.colors.primary500,
    paddingBottom: 2,
    paddingTop: 5,
  },
  popoverContainer: {
    // width: "100%",
    // height: "20%",
    width: "auto",
    backgroundColor: GlobalStyles.colors.error500,
    borderRadius: 12,
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
    color: GlobalStyles.colors.primaryButton,
    paddingHorizontal: "5%",
    paddingVertical: "2%",
  },
  input: {
    height: Platform.OS === "web" ? "25px" : "25%",
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
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "15%",
    justifyContent: "space-between",
    height: 50,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  label: {
    fontSize: 25,
    color: GlobalStyles.colors.textLight,
    paddingHorizontal: 16,
    textAlign: "center",
    width: "100%",
  },
};
