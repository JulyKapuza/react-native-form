import React from "react";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "./router";

export default function App() {
  const [fontsLoaded] = useFonts({
    "roboto-regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "roboto-medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });

  const routing = useRoute({});

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}
