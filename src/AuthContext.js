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

  const getOTP = async (email) => {
    await axios
      .post(`${BASE_AUTH_URL}/getEmailOTP`, {
        email: email,
      })
      .then((res) => {
        console.log(res);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  const verifyOTP = async (email, otp) => {
    await axios
      .post(`${BASE_AUTH_URL}/confirmEmailOTP`, {
        email: email,
        token: otp,
      })
      .then((res) => {
        console.log(res);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });

    return true;
  };

  const login = async (email, password) => {
    setIsLoading(true);
    console.log(`${BASE_AUTH_URL}/authenticate`);
    await axios
      .post(`${BASE_AUTH_URL}/authenticate`, {
        email: email,
        password: password,
      })
      .then((res) => {
        AsyncStorage.setItem("userToken", res.data.token);
        AsyncStorage.setItem("refreshToken", res.data.refreshToken.token);
        setUserToken(res.data.token);
        setRefreshToken(res.data.refreshToken.token);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });

    setIsLoading(false);
  };
  const register = async (email, first, last, password) => {
    setIsLoading(true);
    // setUserToken("token");
    await axios
      .post(`${BASE_AUTH_URL}/register`, {
        email: email,
        firstName: first,
        lastName: last,
        password: password,
      })
      .then((res) => {
        AsyncStorage.setItem("userToken", res.data.token);
        AsyncStorage.setItem("refreshToken", res.data.refreshToken.token);
        setUserToken(res.data.token);
        setRefreshToken(res.data.refreshToken.token);
      })
      .catch((err) => {
        console.log(err);
      });
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
      value={{
        login,
        register,
        getOTP,
        verifyOTP,
        logout,
        isLoading,
        userToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
