import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";


import { Provider } from "react-redux";
import { store } from "./redux/store";

import Main from "./components/Main";



export default function App() {

  const [fontsLoaded] = useFonts({
    "roboto-regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "roboto-medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });


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

  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
 
}
