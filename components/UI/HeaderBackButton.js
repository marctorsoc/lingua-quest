import { useNavigation } from "@react-navigation/native";

const navigation = useNavigation();
function cancelHandler() {
  navigation.goBack();
}
