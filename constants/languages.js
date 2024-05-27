export const languageOptions = [
  {
    label: "🇬🇧 (EN)",
    value: "en",
    longName: "English",
    logo: require("../assets/flags/en.svg.png"),
  },
  {
    label: "🇱🇹 (LT)",
    value: "lt",
    longName: "Lietuvių",
    logo: require("../assets/flags/lt.svg.png"),
  },
  // { label: "🇵🇹 (PT)", value: "pt", logo: "https://seeklogo.com/images/F/flag___bandeira_Portugal-logo-34D2D6FC45-seeklogo.com.png" },
  {
    label: "🇪🇸 (ES)",
    value: "es",
    longName: "Español",
    logo: require("../assets/flags/es.svg.png"),
  },
  {
    label: "🏴‍☠️ (CA)",
    value: "ca",
    longName: "Català",
    logo: require("../assets/flags/ca.svg.png"),
  },
];

const findPropertyByKey = (key, keyValue, property) => {
  const option = languageOptions.find(
    (option) => option[key] === keyValue,
  );
  return option ? option[property] : undefined;
};

export const langLabelToValue = (label) =>
  findPropertyByKey("label", label, "value");
export const langValueToLabel = (value) =>
  findPropertyByKey("value", value, "label");
export const langValueToLongName = (value) =>
  findPropertyByKey("value", value, "longName");
export const langValueToLogo = (value) =>
  findPropertyByKey("value", value, "logo");
