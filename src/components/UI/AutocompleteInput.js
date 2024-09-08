import { useState } from "react";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

export default function AutocompleteInput({ suggestions, ...props }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [dataset, setDataset] = useState(suggestions);

  const onSelectItem = (suggestion) => {
    // if suggestion is undefined, return
    if (suggestion === null) return;
    setSelectedItem(suggestion);
    props.onChangeText(suggestion.title);
  };

  const onChangeText = (text) => {
    props.onChangeText(text);
  };

  const onClear = () => {
    setSelectedItem(null);
    props.onChangeText("");
  };
  return (
    <AutocompleteDropdown
      clearOnFocus={false}
      closeOnBlur={false}
      closeOnSubmit={false}
      showChevron={true}
      onSelectItem={onSelectItem}
      onChangeText={onChangeText}
      onClear={onClear}
      dataSet={dataset.map((suggestion, index) => ({
        id: index,
        title: suggestion,
      }))}
    />
  );
}
