import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
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
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
        name="DefaultScreen"
        component={DefaultScreenPosts}
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

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   FlatList,
//   SafeAreaView,
//   TouchableOpacity,
// } from "react-native";
// import { FontAwesome5 } from "@expo/vector-icons";

// const PostsScreen = ({ route, navigation }) => {
//   const [post, setPost] = useState([]);

//   useEffect(() => {
//     if (route.params) {
//       setPost((prevState) => [...prevState, route.params]);
//     }
//   }, [route.params]);
//   console.log("post", post);
//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={post}
//         renderItem={({ item }) => (
//           <View>
//             <View style={styles.wrap}>
//               <Image source={{ uri: item.photo }} style={styles.picture} />
//               <Text style={styles.text}>{item.name}</Text>
//             </View>
//             <View style={styles.wrapIcon}>
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 style={styles.wrap}
//                 onPress={() => navigation.navigate("Comment")}
//               >
//                 <FontAwesome5
//                   style={styles.icon}
//                   name="comment"
//                   size={25}
//                   color="#BDBDBD"
//                 />
//               </TouchableOpacity>
//             </View>
//             <View>
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 style={styles.wrap}
//                 onPress={() => navigation.navigate("Map")}
//               >
//                 <Text>Локація</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   wrap: {
//     marginBottom: 32,
//     marginHorizontal: 16,
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   picture: {
//     borderRadius: 20,
//     height: 240,
//     width: 370,
//   },
//   text: {
//     color: "#212121",
//     fontSize: 16,
//     marginTop: 8,
//   },
//   wrapIcon: {
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//   },
// });
// export default PostsScreen;
