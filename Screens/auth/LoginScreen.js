import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
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
import { authSignIn } from "../../redux/auth/authOperation";

const initialState = {
  email: "",
  password: "",
};

export default function Login({ navigation, route }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const dispatch = useDispatch();

  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setdimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    dispatch(authSignIn(state));
    setstate(initialState);
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
              <Text style={styles.title}>Увійти</Text>
              <View
                style={{
                  marginTop: 16,
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={{ ...styles.input, width: dimensions }}
                  placeholder="Адреса електронної пошти"
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View
                style={{
                  marginTop: 16,
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={{ ...styles.input, width: dimensions }}
                  placeholder="Пароль"
                  secureTextEntry={true}
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, password: value }))
                  }
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ ...styles.button, width: dimensions }}
                  onPress={handleSubmit}
                >
                  <Text style={styles.btnTitle}>Вхід</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.link}
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={{ color: "#1B4371", fontSize: 16 }}>
                  Немає акаунту? Зареєструватися
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
    marginHorizontal: 16,
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
    color: "#1B4371",
  },
});
