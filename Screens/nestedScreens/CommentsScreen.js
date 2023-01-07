import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback, // імпорт компонента обгортки
  Keyboard, // імпорт компонента клавіатури
} from "react-native";

import db from "../../firebase/config";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { postId, photo } = route.params;
  const [comment, setComment] = useState();
  const [allComments, setAllComments] = useState(null);
  const { login, avatar } = useSelector((state) => state.auth);



  useEffect(() => { getAllPosts() },[])

  const createPost = async () => {

 setComment("");
     db.firestore()
       .collection("posts")
       .doc(postId)
       .collection("comments")
      .add({ comment, login, });
    
   
    
  };

  const getAllPosts =async()=>{
 db.firestore()
   .collection("posts")
   .doc(postId)
   .collection("comments")
   .onSnapshot((data) =>
     setAllComments(data.docs.map((doc) => ({ ...doc.data(), id:doc.id })))
   );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.wrapImage}>
            <Image
              source={{ uri: photo }}
              style={{ height: 200, width: 250 }}
            />
          </View>
          <FlatList
            data={allComments}
            renderItem={({ item }) => (
              // console.log(item)
              <View style={styles.containerComment}>
                <View style={styles.avatarWrap}>
                  <Image source={{ uri: avatar }} style={styles.avatar} />
                </View>
                {/* <Text>{item.login}</Text> */}
                <Text>{item.comment}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
        <View>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TextInput
              onFocus={() => setIsShowKeyboard(true)}
              style={styles.input}
              placeholder="Коментувати..."
              placeholderTextColor="#BDBDBD"
              value={comment}
              onChangeText={setComment}
            />

            <TouchableOpacity style={styles.wrapIcon} onPress={createPost}>
              <AntDesign name="arrowup" size={24} color="#ffffff" />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    // alignItems: "center",
    marginHorizontal: 16,
  },
  containerComment: {
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    borderColor: "#FF6C00",
    borderRadius: 20,
  },
  input: {
    fontFamily: "roboto-regular",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 16,
    borderRadius: 50,
    color: "#BDBDBD",
    padding: 16,
    marginBottom: 40,
  },
  wrapImage: {
    borderRadius: 20,
    // justifyContent: "center",
    // alignItems: "center",
  },

  wrapIcon: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    position: "absolute",
    bottom: 48,
    right: 7,
    height: 34,
    width: 34,
    borderRadius: 50,
  },
  avatarWrap: {
    // alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginRight: 20,
  },
});
export default CommentsScreen;
