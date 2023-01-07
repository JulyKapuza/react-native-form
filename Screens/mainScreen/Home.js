import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import db from "../../firebase/config";
import { useSelector } from "react-redux";

const Home = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
 const { userId, login, avatar } = useSelector((state) => state.auth);
  const getAllPost = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarWrap}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.title}>{login}</Text>
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.wrap}>
            <View style={styles.wrapImage}>
              <Image source={{ uri: item.photo }} style={styles.picture} />
            </View>
            <Text style={styles.text}>{item.name}</Text>
            <View style={styles.wrapIcon}>
              <TouchableOpacity
                activeOpacity={0.8}
                // style={styles.wrap}
                onPress={() =>
                  navigation.navigate("Comment", { postId: item.id, photo:item.photo,  })
                }
              >
                <FontAwesome5
                  style={styles.icon}
                  name="comment"
                  size={25}
                  color="#BDBDBD"
                />
              </TouchableOpacity>
              <View style={styles.location}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("Map", { location: item.location })
                  }
                >
                  <EvilIcons
                    style={styles.icon}
                    name="location"
                    size={25}
                    color="#BDBDBD"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.wrap}
                  onPress={() =>
                    navigation.navigate("Map", { location: item.location })
                  }
                >
                  <Text style={styles.place}>{item.place}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  wrap: {
   
    marginBottom: 32,
  },
  avatarWrap: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 50,
    borderRadius: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginRight: 20,
  },
  title: {
    fontFamily: "roboto-medium",

    color: "#212121",
    fontSize: 30,
  },
  wrapImage: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  picture: {
    borderRadius: 20,
    height: 240,
    width: 370,
  },
  text: {
    fontFamily: "roboto-medium",
    marginHorizontal: 16,
    color: "#212121",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  location: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  wrapIcon: {
    marginHorizontal: 16,
    // alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  place: {
    textDecorationLine: "underline",
    color: "#212121",
    fontSize: 16,
  },
});
export default Home;

// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createStackNavigator } from "@react-navigation/stack";
// const Stack = createStackNavigator();
// //icons import

// import { Ionicons } from "@expo/vector-icons";
// import { Feather } from "@expo/vector-icons";
// import { MaterialIcons } from "@expo/vector-icons";

// import CreatePostsScreen from "./CreatePostsScreen";
// import PostsScreen from "./PostsScreen";
// import ProfileScreen from "./ProfileScreen";

// const Tabs = createBottomTabNavigator();

// const Home = ({ navigation }) => {
//   return (
//     <Tabs.Navigator
//       initialRouteName="Posts"
//       screenOptions={{
//         tabBarStyle: { display: "flex" },
//         tabBarActiveTintColor: "white",
//         tabBarInactiveTintColor: "gray",
//         tabBarActiveBackgroundColor: "#FF6C00",
//         tabBarShowLabel: false,
//       }}
//     >
//       <Tabs.Screen
//         name="Posts"
//         component={PostsScreen}
//         options={{
//           // headerShown: false,
//           tabBarIcon: ({ focused, size, color }) => (
//             <Ionicons name="ios-grid-outline" size={size} color={color} />
//           ),
//           title: "Публікації",
//           headerStyle: {
//             height: 110,
//             borderBottomWidth: 2,
//           },
//           headerTintColor: "#212121",
//           headerTitleStyle: {
//             fontWeight: "bold",
//             fontSize: 20,
//           },
//           headerRight: () => (
//             <View style={{ padding: 15 }}>
//               <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//                 <MaterialIcons name="logout" size={28} color="#BDBDBD" />
//               </TouchableOpacity>
//             </View>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="Create"
//         component={CreatePostsScreen}
//         options={{
//           tabBarStyle: { display: "none" },
//           tabBarIcon: ({ focused, size, color }) => (
//             <Ionicons name="ios-add" size={size} color={color} />
//           ),
//           title: "Створити публікацію",
//           headerStyle: {
//             height: 110,
//             borderBottomWidth: 2,
//           },
//           headerLeft: () => (
//             <View style={{ padding: 15 }}>
//               <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
//                 <Ionicons name="arrow-back-outline" size={28} color="#BDBDBD" />
//               </TouchableOpacity>
//             </View>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           tabBarIcon: ({ focused, size, color }) => (
//             <Feather name="user" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default Home;
