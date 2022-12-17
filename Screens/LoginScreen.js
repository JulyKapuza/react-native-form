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
  Dimensions,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);

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

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
  };
  return (
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
            onPress={keyboardHide}
          >
            <Text style={styles.btnTitle}>Вхід</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.link}>
          <Text>Немає акаунту? Зареєструватися</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
    alignItems: "center",
    marginBottom: 20,
    fontFamily: "roboto-regular",
  },
});
