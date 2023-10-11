import * as DocumentPicker from "expo-document-picker";
import { Platform } from "react-native";
import * as ExpoFileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export async function FileUpload() {
  let res = null;
  try {
    res = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (res.canceled) {
      return;
    }
    console.log(res.assets);

    let fileContent = null;
    if (Platform.OS === "android") {
      fileContent = await ExpoFileSystem.readAsStringAsync(
        res.assets[0].uri,
        { encoding: ExpoFileSystem.EncodingType.UTF8 }
      );
    } else if (Platform.OS === "web") {
      // TODO marc: now read the file using the uri
      console.log("TODO: implement read file for web");
      console.log(fileContent);
    }
    if (fileContent === null || fileContent === undefined) {
      console.log("fileContent is null or undefined");
      return;
    }
    // console.log(fileContent);

    try {
      fileContent = JSON.parse(fileContent);
    } catch (err) {
      console.log("error parsing json");
      console.log(err);
      return;
    }
    return fileContent;
  } catch (err) {
    console.log("error -----", err);
  }
}

export async function JsonDownload(dataToDownload) {
  console.log(dataToDownload);
  try {
    const jsonString = JSON.stringify(dataToDownload, null, 2);
    // ExpoFileSystem.makeDirectoryAsync(
    //   ExpoFileSystem.documentDirectory + "Download/marc",
    //   { intermediates: true }
    // );
    if (Platform.OS === "web") {
      console.log("TODO: implement write file for web");
      return;
    }

    const filePath = ExpoFileSystem.cacheDirectory + "marc_data.json";
    await ExpoFileSystem.writeAsStringAsync(filePath, jsonString);

    // Share the file with the user
    console.log(filePath);
    await Sharing.shareAsync(filePath);
    // saveAs(jsonString, "data.json");
  } catch (error) {
    console.error("Error:", error);
  }
}
