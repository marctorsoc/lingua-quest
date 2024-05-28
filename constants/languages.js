export const languageOptions = [
  {
    label: "🇬🇧 (EN)",
    value: "en",
    longName: "English",
  },
  {
    label: "🇱🇹 (LT)",
    value: "lt",
    longName: "Lietuvių",
  },
  // { label: "🇵🇹 (PT)", value: "pt", logo: "https://seeklogo.com/images/F/flag___bandeira_Portugal-logo-34D2D6FC45-seeklogo.com.png" },
  {
    label: "🇪🇸 (ES)",
    value: "es",
    longName: "Español",
  },
  {
    label: "🏴‍☠️ (CA)",
    value: "ca",
    longName: "Català",
  },
];

const findPropertyByKey = (key, keyValue, property) => {
  const option = languageOptions.find(
    (option) => option[key] === keyValue,
  );
  return option ? option[property] : undefined;
};

export const logos = {
  en: require("../assets/flags/en.svg.png"),
  lt: require("../assets/flags/lt.svg.png"),
  es: require("../assets/flags/es.svg.png"),
  ca: require("../assets/flags/ca.svg.png"),
};

export const langLabelToValue = (label) =>
  findPropertyByKey("label", label, "value");
export const langValueToLabel = (value) =>
  findPropertyByKey("value", value, "label");
export const langValueToLongName = (value) =>
  findPropertyByKey("value", value, "longName");
