import { Image } from "react-native";
import { IconStyle } from "./styles";

export const logos = {
  subtitle: require("../../assets/storyTypes/movie_logo.png"),
  movie: require("../../assets/storyTypes/movie_logo.png"),
  book: require("../../assets/storyTypes/movie_logo.png"),
  all: require("../../assets/storyTypes/movie_logo.png"),
};

export const storyTypeOptions = [
  {
    label: "Movies & TV Series",
    value: "subtitle",
    icon: () => (
      <Image source={logos["subtitle"]} style={IconStyle} />
    ),
  },
  {
    label: "🎬 Movies",
    value: "movie",
    icon: () => (
      <Image source={logos["subtitle"]} style={IconStyle} />
    ),
  },
  {
    label: "📚 Books",
    value: "book",
    icon: () => (
      <Image source={logos["subtitle"]} style={IconStyle} />
    ),
  },
  {
    label: "🌎 All",
    value: "all",
    icon: () => (
      <Image source={logos["subtitle"]} style={IconStyle} />
    ),
  },
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
