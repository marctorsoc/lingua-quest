import * as DocumentPicker from "expo-document-picker";
import { Platform } from "react-native";
import * as ExpoFileSystem from "expo-file-system";
import { useState } from "react";
// import * as Sharing from "expo-sharing";

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

    const setFileContent = (content) => {
      fileContent = content;
    };
    if (Platform.OS === "android") {
      setFileContent(
        await ExpoFileSystem.readAsStringAsync(res.assets[0].uri, {
          encoding: ExpoFileSystem.EncodingType.UTF8,
        })
      );
    } else if (Platform.OS === "web") {
      // TODO marc: now read the file using the uri
      console.log("TODO: implement read file for web");
      const file = res.assets[0].file;
      console.log(file);
      if (typeof file === "string") {
        throw new Error("On web we need to provide a File object");
      }

      await readFile(file, setFileContent);
      // const requestData = new FormData();
      // requestData.append("file", file);

      // const options = {
      //   method: "POST",
      //   body: requestData,
      //   // headers: headers,
      // };

      // const response = await fetch("", options);
      // console.log(response);
      console.log("after reading");
      console.log(fileContent);
    }
    if (fileContent === null || fileContent === undefined) {
      console.log("fileContent is null or undefined");
      return;
    }
    // console.log(fileContent);

    try {
      setFileContent(JSON.parse(fileContent));
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

async function readFile(file, setFileContent) {
  const reader = new FileReader();

  reader.onload = (e) => {
    const content = e.target.result;
    setFileContent(content);
  };

  reader.readAsText(file);
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
