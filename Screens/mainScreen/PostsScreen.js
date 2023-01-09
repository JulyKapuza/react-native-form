import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import db from "../../firebase/config";
import { authSignOut } from "../../redux/auth/authOperation";

import Home from "./Home";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
const NestedScreen = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{
          headerBackAccessibilityLabel: { display: "none" },
          headerBackImage: false,
          headerBackButtonVisible: false,
          headerBackTitleVisible: false,
          // headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="ios-grid-outline" size={size} color={color} />
          ),
          title: "Публікації",
          headerStyle: {
            height: 110,
            borderBottomWidth: 2,
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerRight: () => (
            <View style={{ padding: 15 }}>
              <TouchableOpacity
                // onPress={() => navigation.navigate("Home", { screen: 'Login' })}
                onPress={() => db.auth().signOut()}
              >
                <MaterialIcons name="logout" size={28} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View style={{ padding: 15 }}>
              <TouchableOpacity></TouchableOpacity>
            </View>
          ),
        }}
        name="Home"
        component={Home}
      />
      <NestedScreen.Screen
        options={{
          tabBarStyle: { display: "none" },
          title: "Коментарі",
          headerBackTitle: false,
          headerBackTitleVisible: false,
          headerStyle: {
            height: 110,
            borderBottomWidth: 2,
          },
        }}
        name="Comment"
        component={CommentsScreen}
      />
      <NestedScreen.Screen
        options={{
          tabBarStyle: { display: "none" },
          headerShown: true,
          headerBackTitle: false,
          headerBackTitleVisible: false,
          title: "Карта",
          headerStyle: {
            height: 110,
            borderBottomWidth: 2,
          },
        }}
        name="Map"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;

