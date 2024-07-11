import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import icons from "../constants/icons";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setshowPassword] = useState(false);

  return (
    <View style={otherStyles}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#666666"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          selectionColor="#704F38"
        />

        {title == "Password" && value.length > 0 && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Image
              source={icons.eye}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  textInputContainer: {
    width: "100%",
    height: 50,
    borderWidth: 0.5,
    borderRadius: 50,
    borderColor: "#797979",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    width: 20,
    height: 20,
  },
  textInput: {
    flex: 1,
    fontFamily: "Poppins-Regular",
  },
});
