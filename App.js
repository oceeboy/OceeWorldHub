import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "./components/TabIcon";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./screens/HomePage";
import WelcomePage from "./screens/WelcomePage";
import AuthenticationPage from "./screens/AuthenticationPage";
import { FontProvider } from "./context/FontProvider";
import LoginPage from "./screens/LoginPage";
import RegisterPage from "./screens/RegisterPage";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginSignupScreen"
        component={AuthenticationPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  const screenOptions = {
    tabBarShowLabel: false,

    tabBarActiveTintColor: "#049EFE",
    tabBarInactiveTintColor: "#617078",

    tabBarStyle: {
      backgroundColor: "#fff",
      height: 100,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      zindex: 1,
    },
  };
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Home" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <FontProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </FontProvider>
  );
}
