export const languageOptions = [
  { label: "🇬🇧 (EN)", value: "en" },
  { label: "🇱🇹 (LT)", value: "lt" },
  { label: "🇩🇪 (DE)", value: "de" },
  { label: "🇪🇸 (ES)", value: "es" },
];

export const lang_label_to_value = (label) => {
  return languageOptions.filter((option) => option.label === label)[0]
    .value;
};

export const lang_value_to_label = (value) => {
  return languageOptions.filter((option) => option.value === value)[0]
    .label;
};
