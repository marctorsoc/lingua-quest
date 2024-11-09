export const TUTORIAL_INDEX_TO_STAGE = {
  4: "HIGHLIGHT_HEADER",
  //   5: "LONG_PRESS",
  5: "PRESS_STORY",
  6: "ANSWER",
  7: "NEXT",
  8: "SHOW_TRANSLATION",
  9: "COPY_CLIPBOARD",
  10: "WELCOME_SETTINGS",
  11: "SENTS_PER_ROUND",
  12: "HISTORY_LENGTH",
  13: "READING_MODE",
  14: "END",
};

// invert the mapping programmatically
export const TUTORIAL_STAGES = Object.entries(
  TUTORIAL_INDEX_TO_STAGE
).reduce((acc, [stage, index]) => {
  acc[index] = stage;
  return acc;
}, {});
