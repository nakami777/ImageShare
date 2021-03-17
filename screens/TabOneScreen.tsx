import * as React from "react";
import { Text, View } from "../components/Themed";
import logo from "../assets/images/logo.png";
import { TouchableOpacity, Platform, Image, StyleSheet } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import uploadToAnonymousFilesAsync from "anonymous-files";
import EditScreenInfo from "../components/EditScreenInfo";

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted == false) {
      alert("カメラロールにアクセスするための許可が必要です！");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    if (Platform.OS === "web") {
      let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);

      setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    } else {
      setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
    }
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(
        `この画像は、以下の場所で共有できます。:${selectedImage.remoteUri}で共有できます。`
      );
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity
          onPress={openShareDialogAsync}
          style={styles.buttonUi}
        >
          <Text style={styles.buttonText}>この画像をシェアする</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.instraction}>友達と撮った写真を、友達と共有する</Text>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.buttonUi}>
        <Text style={styles.buttonText}>写真を選択する</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 305,
    height: 263,
    marginBottom: 25,
  },
  instraction: {
    color: "#888",
    fontSize: 28,
    marginHorizontal: 25,
  },
  buttonUi: {
    backgroundColor: "blue",
    marginTop: 25,
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
