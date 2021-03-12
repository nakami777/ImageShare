import * as React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import logo from "../assets/images/logo.png";

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.instraction}>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>
      <TouchableOpacity
        onPress={() => alert("押してくれてありがとう")}
        style={styles.buttonUi}
      >
        <Text style={styles.buttonText}>Pick a photo</Text>
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
    height: 159,
    marginBottom: 100,
  },
  instraction: {
    color: "#888",
    fontSize: 28,
    marginHorizontal: 25,
  },
  buttonUi: {
    backgroundColor: "blue",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
});
