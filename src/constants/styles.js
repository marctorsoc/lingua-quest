import { Platform } from "react-native";

export const GlobalStyles = {
  // TODO: add more colors. Could use
  // https://uicolors.app/create
  colors: {
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
};

export const IconStyle = {
  width: 24,
  height: 24,
  resizeMode: "contain",
  tintColor: GlobalStyles.colors.primary,
};

export const AuthStyles = {
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  title: {
    marginVertical: "10%",
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
    marginHorizontal: "1%",
    backgroundColor: GlobalStyles.colors.primary500,
    // overflow: "hidden",
    borderRadius: 20,

    // TODO: is this needed?
    zIndex: 5,
  },
  buttonLabel: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
  },
  input: {
    height: Platform.OS === "web" ? "25px" : "25%",
    borderColor: "gray",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    backgroundColor: "white",
    margin: "1%",
  },
  numericInput: {
    width: "10%",
    marginRight: "5%",
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
    color: "white",
    paddingHorizontal: 16,
    textAlign: "center",
    width: "100%",
  },
  languagePicker: {
    width: Platform.OS === "web" ? "20%" : "100%",
  },
};
