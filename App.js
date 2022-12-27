import React from "react";

import { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";


import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "./router";

const fonts = () =>
  Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "roboto-medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });


export default function App() {
  const [font, setFont] = useState(false);
  const routing = useRoute({});

  if (!font) {
    return (
      <AppLoading
        startAsync={fonts}
        onFinish={() => setFont(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <NavigationContainer>
      {routing}
    </NavigationContainer>
  );
}
