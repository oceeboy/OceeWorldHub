import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ handlePress, title }) => {
  return (
    <>
      <TouchableOpacity style={styles.CustomButton} onPress={handlePress}>
        <Text style={styles.customText}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  CustomButton: {
    width: "100%",
    height: "100%",
    backgroundColor: "#704F38",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "98%",
    height: "98%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#10f899",
    borderRadius: 10,
  },
  customText: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
    color: "white",
  },
});
