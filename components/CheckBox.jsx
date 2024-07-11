import React from "react";
import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";
import icons from "../constants/icons";

const CheckBox = ({ isChecked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && (
          <View>
            <Image
              source={icons.checkmark}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: "#704F38",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: "#704F38",
  },
  icon: {
    width: 14,
    height: 14,
  },
});

export default CheckBox;
