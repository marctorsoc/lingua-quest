export const GlobalStyles = {
  // TODO: add more colors. Could use
  // https://uicolors.app/create
  colors: {
    primary50: "#e4d9fd",
    primary100: "#c6affc",
    primary200: "#a281f0",
    primary400: "#5721d4",
    primary500: "#3e04c3",
    primary700: "#2d0689",
    primary800: "#200364",
    accent500: "#f7bc0c",
    error50: "#fcc4e4",
    error500: "#9b095c",
    gray500: "#39324a",
    gray700: "#221c30",
  },
};

export const ScreensStyles = {
  headerButtonsContainers: {
    margin: 0,
    padding: 0,
  },
  headerTitleStyle: {
    top: 22,
    left: 47,
    position: "fixed",
    width: 20,
    height: 20,
    backgroundColor: "blue",
  },
  tabBarStyle: {
    backgroundColor: GlobalStyles.colors.primary500,
    paddingBottom: 2,
    paddingTop: 5,
  },
};
