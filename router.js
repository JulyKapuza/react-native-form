import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
const Stack = createStackNavigator();
const MainTab = createBottomTabNavigator();
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";


import Login from "./Screens/auth/LoginScreen";
import Registration from "./Screens/auth/RegistrationScreen";
import { ScreensNav } from "./Screens/mainScreen/ScreensNav";


export const useRoute = (isAuth) => {
  
  if (!isAuth) {
  
    return (
      <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={Registration}
        />
        {/* <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        /> */}
      </Stack.Navigator>
    );
  }
  return (
    <ScreensNav/>
    // <MainTab.Navigator
    //   screenOptions={{
    //     tabBarStyle: { display: "flex" },
    //     tabBarActiveTintColor: "white",
    //     tabBarInactiveTintColor: "gray",
    //     tabBarActiveBackgroundColor: "#FF6C00",
    //     tabBarShowLabel: false,
    //   }}
    // >
    //   <MainTab.Screen
    //     name="Posts"
    //     component={PostsScreen}
    //     options={{
    //       headerShown: false,
    //       tabBarIcon: ({ focused, size, color }) => (
    //         <Ionicons name="ios-grid-outline" size={size} color={color} />
    //       ),
    //       // title: "Публікації",
    //       // headerStyle: {
    //       //   height: 110,
    //       //   borderBottomWidth: 2,
    //       // },
    //       // headerTintColor: "#212121",
    //       // headerTitleStyle: {
    //       //   fontWeight: "bold",
    //       //   fontSize: 20,
    //       // },
    //       // headerRight: () => (
    //       //   <View style={{ padding: 15 }}>
    //       //     <TouchableOpacity onPress={() => db.auth().signOut()}>
    //       //       <MaterialIcons name="logout" size={28} color="#BDBDBD" />
    //       //     </TouchableOpacity>
    //       //   </View>
    //       // ),
    //     }}
    //   />
    //   <MainTab.Screen
    //     name="Create"
    //     component={CreatePostsScreen}
    //     options={{
    //       tabBarStyle: { display: "none" },
    //       tabBarIcon: ({ focused, size, color }) => (
    //         <Ionicons name="ios-add" size={size} color={color} />
    //       ),
    //       title: "Створити публікацію",
    //       headerStyle: {
    //         height: 110,
    //         borderBottomWidth: 2,
    //       },
    //       headerLeft: () => (
    //         <View style={{ padding: 15 }}>
    //           <TouchableOpacity onPress={() => navigation.goBack()}>
    //             <Ionicons name="arrow-back-outline" size={28} color="#BDBDBD" />
    //           </TouchableOpacity>
    //         </View>
    //       ),
    //     }}
    //   />
    //   <MainTab.Screen
    //     name="Profile"
    //     component={ProfileScreen}
    //     options={{
    //       headerShown: false,
    //       tabBarIcon: ({ focused, size, color }) => (
    //         <Feather name="user" size={size} color={color} />
    //       ),
    //     }}
    //   />
    // </MainTab.Navigator>
  );
};
