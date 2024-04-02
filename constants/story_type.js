export const storyTypeOptions = [
  { label: "🎬", value: "subtitle" },
  { label: "📚", value: "book" },
  { label: "", value: "all" },
];

export const story_type_label_to_value = (label) => {
  return storyTypeOptions.filter(
    (option) => option.label === label,
  )[0].value;
};

export const story_type_value_to_label = (value) => {
  return storyTypeOptions.filter(
    (option) => option.value === value,
  )[0].label;
};
