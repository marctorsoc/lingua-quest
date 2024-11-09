import { Image } from "react-native";
import { languageFlag, languageFlagPicker } from "./styles";

export const logos = {
  en: require("../../assets/flags/en.svg.png"),
  es: require("../../assets/flags/es.svg.png"),
  ca: require("../../assets/flags/ca.svg.png"),
  lt: require("../../assets/flags/lt.svg.png"),
};

export const languageOptions = [
  {
    label: "🇬🇧 (EN)",
    value: "en",
    emoji: "🇬🇧",
    longName: "English",
    icon: () => (
      <Image source={logos["en"]} style={languageFlagPicker} />
    ),
  },
  // { label: "🇵🇹 (PT)", value: "pt", logo: "https://seeklogo.com/images/F/flag___bandeira_Portugal-logo-34D2D6FC45-seeklogo.com.png" },
  {
    label: "🇪🇸 (ES)",
    value: "es",
    emoji: "🇪🇸",
    longName: "Español",
    icon: () => (
      <Image source={logos["es"]} style={languageFlagPicker} />
    ),
  },
  {
    label: "🏴‍☠️ (CA)",
    value: "ca",
    emoji: "CAT",
    longName: "Català",
    icon: () => (
      <Image source={logos["ca"]} style={languageFlagPicker} />
    ),
  },
  {
    label: "🇱🇹 (LT)",
    value: "lt",
    emoji: "🇱🇹",
    longName: "Lietuvių",
    icon: () => (
      <Image source={logos["lt"]} style={languageFlagPicker} />
    ),
  },
  // {
  //   label: "italia",
  //   value: "it",
  //   longName: "Italiano",
  // },
  // {
  //   label: "france",
  //   value: "fr",
  //   longName: "Français",
  // },
  // {
  //   label: "german",
  //   value: "de",
  //   longName: "Deutsch",
  // },
  // {
  //   label: "dutch",
  //   value: "nl",
  //   longName: "dutch",
  // },
];
export const LanguageOptionsNoLabel = languageOptions.map(
  (option) => ({
    ...option,
    label: "",
  })
);

export const LanguageOptionsLongNames = languageOptions.map(
  (option) => ({
    ...option,
    label: option.longName,
  })
);

// translations only in English and Spanish for now
export const translationOptions = LanguageOptionsLongNames.filter(
  (item) => ["en", "es"].includes(item.value)
);

export const findPropertyByKey = (key, keyValue, property) => {
  const option = languageOptions.find(
    (option) => option[key] === keyValue
  );
  return option ? option[property] : undefined;
};

export const langLabelToValue = (label) =>
  findPropertyByKey("label", label, "value");
export const langValueToLabel = (value) =>
  findPropertyByKey("value", value, "label");
export const langValueToLongName = (value) =>
  findPropertyByKey("value", value, "longName");
