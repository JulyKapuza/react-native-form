import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
import { authStateChangeUser } from "../redux/auth/authOperation";
import db from "../firebase/config";

const Main = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const {stateChange} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [stateChange]);
  
  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
