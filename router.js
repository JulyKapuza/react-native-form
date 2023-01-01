import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
const Stack = createStackNavigator();
const MainTab = createBottomTabNavigator();
import { Ionicons } from "@expo/vector-icons";

import Login from "./Screens/auth/LoginScreen";
import Registration from "./Screens/auth/RegistrationScreen";
import Home from "./Screens/auth/Home";
import CommentsScreen from "./Screens/nestedScreens/CommentsScreen";
import MapScreen from "./Screens/nestedScreens/MapScreen";

export const useRoute = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Registration">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      {/* <Stack.Screen
        name="Comment"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerBackTitle: false,
          headerBackTitleVisible: false,
          headerStyle: {
            height: 110,
            borderBottomWidth: 2,
          },
        }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerBackTitleVisible: false,
          title: "Карта",
          headerStyle: {
            height: 110,
            borderBottomWidth: 2,
          },
        }}
      /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="Registration"
        component={Registration}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
