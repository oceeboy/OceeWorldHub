import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalProvider";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "../lib/appwrite";

const HomePage = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const navigation = useNavigation();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <Text>{user?.name}</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
