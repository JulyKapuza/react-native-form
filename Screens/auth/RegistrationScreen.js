import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  StyleSheet,
  TextInput,
  ImageViewer,
  View,
  Text,
  secureTextEntry,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 


import { authSignUp } from "../../redux/auth/authOperation";

const initialState = {
  login: "",
  email: "",
  password: "",
  avatar: "",
};

export default function Registration({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setState((prevState) => ({
      ...prevState,
      avatar: result.assets[0].uri,
    }));
  };

  const dispatch = useDispatch();

  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  // useEffect(() => {
  //   const onChange = () => {
  //     const width = Dimensions.get("window").width - 16 * 2;
  //     setdimensions(width);
  //   };
  //   Dimensions.addEventListener("change", onChange);
  //   return () => {
  //     Dimensions.removeEventListener("change", onChange);
  //   };
  // }, []);

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignUp(state));
    setState(initialState);
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/bg.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 10 : 60,
              }}
            >
              <View style={styles.avatarWrap}>
                <TouchableOpacity style={styles.wrapIcon} onPress={pickImage}>
                  {state.avatar ? (
                    <AntDesign name="closecircleo" size={24} color="#BDBDBD" />
                    
                  ) : (
                    <AntDesign name="plus" size={24} color="#FF6C00" />
                  )}
                </TouchableOpacity>
                {state.avatar ? (
                  <Image source={{ uri: state.avatar }} style={styles.avatar} />
                ) : (
                  <Image
                    source={require("../../assets/images/avatar.jpg")}
                    style={styles.avatar}
                  />
                )}
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <View
                style={{
                  marginTop: 16,
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={{ ...styles.input, width: dimensions }}
                  placeholder="Логін"
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 16, alignItems: "center" }}>
                <TextInput
                  style={{ ...styles.input, width: dimensions }}
                  placeholder="Адреса електронної пошти"
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 16, alignItems: "center" }}>
                <TextInput
                  style={{ ...styles.input, width: dimensions }}
                  placeholder="Пароль"
                  secureTextEntry={true}
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ ...styles.button, width: dimensions }}
                  onPress={handleSubmit}
                  // onPress={() => {
                  //   navigation.navigate("Home");
                  //   {
                  //     handleSubmit;
                  //   }
                  // }}
                >
                  <Text style={styles.btnTitle}>Зареєструватися</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.link}
                onPress={() =>
                  navigation.navigate("Login", {
                    sessionId: 45,
                    userId: "22e24",
                  })
                }
              >
                <Text style={{ color: "#1B4371", fontSize: 16 }}>
                  Уже є акаунт? Увійти
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "roboto-regular",
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  wrapIcon: {
    backgroundColor: "#fff",
    borderRadius:50,
    position: "absolute",
    zIndex: 2,
    bottom: 10,
    right: -10,
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
  form: {
    backgroundColor: "#ecf0f1",
    paddingTop: 92,
    // paddingBottom: 45,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  input: {
    fontFamily: "roboto-regular",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 16,
    borderRadius: 8,
    color: "#BDBDBD",
    padding: 16,
  },
  title: {
    fontFamily: "roboto-bold",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    padding: 16,
    marginTop: 43,
    marginBottom: 16,
    // marginHorizontal: 16,
  },
  btnTitle: {
    fontFamily: "roboto-regular",
    color: "#f0f8ff",
    fontSize: 16,
  },
  link: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    fontFamily: "roboto-regular",
  },
});
