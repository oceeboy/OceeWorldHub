import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AuthenticationPage = () => {
  return (
    <View style={styles.container}>
      <Text>AuthenticationPage</Text>
    </View>
  );
};

export default AuthenticationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
