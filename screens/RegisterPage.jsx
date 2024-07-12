import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import icons from "../constants/icons";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "../components/CheckBox";
import { createUser } from "../lib/appwrite"; // Import createUser from appwrite
import { useGlobalContext } from "../context/GlobalProvider";

const RegisterPage = () => {
  const navigation = useNavigation();
  const nextPage = () => {
    navigation.navigate("Login");
  };

  const Redirect = () => {
    navigation.navigate("Main");
  };

  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    if (form.email === "" || form.password === "" || form.name === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const newUser = await createUser(form.email, form.password, form.name);
      setUser(newUser);
      setIsLoggedIn(true);
      Alert.alert("Success", "Account created successfully!", [
        { text: "OK", onPress: Redirect },
      ]);
    } catch (error) {
      // Alert.alert("Error", error.message);
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Create Account</Text>
          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeaderText}>
              Fill your information below or register with your social account
            </Text>
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.textFieldContainer}>
            <Text style={styles.label}>Name</Text>
            <FormField
              title="Name"
              value={form.name}
              handleChangeText={(e) => setForm({ ...form, name: e })}
              otherStyles={styles.textInput}
              placeholder="John Doe"
            />
          </View>
          <View style={styles.textFieldContainer}>
            <Text style={styles.label}>Email</Text>
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles={styles.textInput}
              keyboardType="email-address"
              placeholder="example@gmail.com"
            />
          </View>
          <View style={styles.textFieldContainer}>
            <Text style={styles.label}>Password</Text>
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles={styles.textInput}
              placeholder="***************"
              secureTextEntry
            />
          </View>
          <View style={styles.termandconditionContainer}>
            <View style={styles.termContainer}>
              <CheckBox isChecked={isChecked} onPress={handleCheckboxPress} />
              <View style={styles.row}>
                <Text style={styles.termText}>Agree with</Text>
                <TouchableOpacity>
                  <Text style={styles.termTextLink}>Terms and Conditions</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Sign Up"
              handlePress={submit}
              isLoading={isSubmitting}
            />
          </View>
        </View>
        <View style={styles.authOptionContainer}>
          <View style={styles.rowGap}>
            <View style={styles.line} />
            <Text style={styles.rowGapText}>Or sign up with</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.rowGap}>
            <TouchableOpacity style={styles.authImageContainer}>
              <Image
                source={icons.apple}
                style={styles.authImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.authImageContainer}>
              <Image
                source={icons.google}
                style={styles.authImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.authImageContainer}>
              <Image
                source={icons.facebook}
                style={styles.authImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rowGap}>
            <Text style={styles.authText}>Already have an account?</Text>
            <TouchableOpacity style={styles.bttnLink} onPress={nextPage}>
              <Text style={styles.bttnLinkText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 40,
  },
  subHeaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    flexDirection: "row",
  },
  headerText: {
    fontSize: 30,
    fontFamily: "Poppins-Medium",
    textTransform: "capitalize",
  },
  subHeaderText: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  formContainer: {
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 25,
  },
  textFieldContainer: {
    marginTop: 20,
  },
  textInput: {
    width: "100%",
    borderRadius: 50,
  },
  label: {
    textAlign: "left",
    fontSize: 15,
    fontFamily: "Poppins-Light",
  },
  buttonContainer: {
    marginTop: 30,
    width: "100%",
    height: 60,
  },
  authOptionContainer: {
    marginTop: 50,
    width: "100%",
    gap: 20,
  },
  line: {
    width: 77,
    height: 2,
    backgroundColor: "#E1E1E1",
  },
  rowGap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  rowGapText: {
    fontSize: 15,
    fontFamily: "Poppins-Light",
  },
  authImage: {
    width: 30,
    height: 30,
  },
  authImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E1E1E1",
  },
  authText: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  bttnLink: {},
  bttnLinkText: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "#704F38",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  termContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  termText: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
  },
  termTextLink: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    color: "#704F38",
  },
  termandconditionContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
