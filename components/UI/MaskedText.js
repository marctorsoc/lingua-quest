import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function MaskedText({
  text,
  style,
  maskStyle,
  masked_range,
  maskEnabled,
}) {
  // console.log("masked_range: ", masked_range);
  const [maskStart, maskEnd] = masked_range;
  const textBeforeMask = text.slice(0, maskStart);
  const textWithinMask = maskEnabled
    ? "____"
    : text.slice(maskStart, maskEnd);
  const textAfterMask = text.slice(maskEnd);
  // const textToShow =
  //   textBeforeMask + textWithinMask + textAfterMask;

  return (
    <View>
      <Text style={[styles.text, style]}>
        {textBeforeMask}
        <Text style={[styles.text, style, maskStyle]}>
          {textWithinMask}
        </Text>
        {textAfterMask}
      </Text>
    </View>
  );
}

export default MaskedText;

const styles = StyleSheet.create({
  text: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    fontSize: 14,
    textAlign: "left",
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});
