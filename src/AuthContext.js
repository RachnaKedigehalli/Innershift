import { React, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_AUTH_URL } from "../config";
import jwtdecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setUserToken("token");
    console.log(`${BASE_AUTH_URL}/authenticate`);
    await axios
      .post(`${BASE_AUTH_URL}/authenticate`, {
        email: email,
        password: password,
      })
      .then((res) => {
        AsyncStorage.setItem("userToken", res.data.token);
        AsyncStorage.setItem("refreshToken", res.data.refreshToken);
        setUserToken(res.data.token);
        setRefreshToken(res.data.refreshToken);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsLoading(false);
  };
  const register = () => {
    setIsLoading(true);
    setUserToken("token");
    AsyncStorage.setItem("userToken", "sdfsfd");
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("refreshToken");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem("userToken");
      let refreshtoken = await AsyncStorage.getItem("userToken");
      setUserToken(token);
      setRefreshToken(refreshtoken);
      // console.log(refreshtoken);
      if (token != null) {
        const decodedToken = jwtdecode.decode(token);
        var dateNow = new Date();

        if (decodedToken.exp < dateNow.getTime()) {
          await axios
            .post(`${BASE_AUTH_URL}/refreshtoken`, {
              refreshToken: refreshtoken,
            })
            .then((res) => {
              setUserToken(res.data.token);
              // setRefreshToken(res.data.refreshToken);
            })
            .catch((err) => {
              console.log("login again!"); // refresh token expired
            });
        }
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      props={props}
      value={{ login, logout, isLoading, userToken }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
