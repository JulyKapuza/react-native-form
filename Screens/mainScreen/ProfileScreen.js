import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import db from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { authSignOut } from "../../redux/auth/authOperation";
import { FontAwesome5 } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const { userId, login, avatar } = useSelector((state) => state.auth);

  const getUserPost = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
      );
  };
  useEffect(() => {
    getUserPost();
  }, []);

  const signOut = () => {
    dispatch(authSignOut());
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/images/bg.jpg")}
      >
        <View style={styles.background}>
          <TouchableOpacity style={styles.logout} onPress={signOut}>
            <MaterialIcons name="logout" size={28} color="#BDBDBD" />
          </TouchableOpacity>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
          </View>
          <Text style={styles.title}>{login}</Text>

          <FlatList
            data={userPosts}
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
                      navigation.navigate("Comment", { postId: item.id })
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
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // marginHorizontal: 16,
  },
  avatarWrap: {
    position: "absolute",
    top: -50,
    left: 170,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    borderRadius: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  background: {
    marginTop: 250,
    backgroundColor: "#ecf0f1",
    padding: 16,
    // paddingBottom: 45,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  title: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "roboto-medium",
    // marginHorizontal: 16,
    color: "#212121",
    fontSize: 30,
    marginTop: 8,
    marginBottom: 30,
  },
  logout: {
    alignItems: "flex-end",
  },
  wrap: {
    justifyContent: "flex-end",
    marginBottom: 32,
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

export default ProfileScreen;
