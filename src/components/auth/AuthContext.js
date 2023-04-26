import { React, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_APP_URL, BASE_AUTH_URL } from "../../../config";
import jwtDecode from "jwt-decode";
import { getLocales } from "expo-localization";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState({});
  const [refreshToken, setRefreshToken] = useState(null);
  const [appLanguage, setAppLanguage] = useState(
    getLocales()[0]["languageCode"]
  );

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
    return await axios
      .post(`${BASE_AUTH_URL}/confirmEmailOTP`, {
        email: email,
        token: otp,
      })
      .then((res) => {
        console.log(res);
        return true;
      })
      .catch((err) => {
        console.log("invalid otp ", err);
        return false;
      });
  };

  const changeAppLanguage = (language) => {
    AsyncStorage.setItem("appLanguage", language);
    setAppLanguage(language);
  };

  const getAppLanguage = async () => {
    let lang = await AsyncStorage.getItem("appLanguage");
    if (lang != "" && lang != null) setAppLanguage(lang);
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
        AsyncStorage.setItem(
          "userDetails",
          JSON.stringify({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            id: res.data.id,
          })
        );
        setUser({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          id: res.data.id,
        });
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
  const register = async (
    email,
    first,
    last,
    password,
    dob,
    gender,
    phone,
    referral,
    baselineScore
  ) => {
    setIsLoading(true);
    // setUserToken("token");
    await axios
      .post(`${BASE_AUTH_URL}/register`, {
        email: email,
        firstName: first,
        lastName: last,
        password: password,
      })
      .then(async (res) => {
        await axios
          .post(
            `${BASE_APP_URL}/addPatient`,
            {
              patientId: res.data.id,
              dob: dob,
              gender: gender,
              registeredThrough: referral == "" ? 0 : 1,
              condition: baselineScore,
              emergencyContact: phone,
              phoneNumber: phone,
            },
            {
              headers: {
                Authorization: `Bearer ${res.data.token}`,
              },
            }
          )
          .then((res2) => {
            console.log("res2 ", res2.data);
          })
          .catch((e) => {
            console.log("error adding patient ", e);
          });

        console.log(res.data.refreshToken.user);
        AsyncStorage.setItem("userToken", res.data.token);
        AsyncStorage.setItem(
          "userDetails",
          JSON.stringify({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            id: res.data.id,
          })
        );
        AsyncStorage.setItem("refreshToken", res.data.refreshToken.token);

        if (referral != "") {
          console.log("refereralll in ...", referral);
          await axios
            .post(
              `${BASE_APP_URL}/getDoctorByReferral`,
              {
                referral: referral,
                patientId: res.data.id,
              },
              {
                headers: { Authorization: `Bearer ${res.data.token}` },
              }
            )
            .then(async (referralRes) => {
              console.log("refereral res in ...", referralRes);
              console.log("patientId", res.data.id);
              console.log("doctorId", referralRes.data[0]);
              setUserToken(res.data.token);
              setRefreshToken(res.data.refreshToken.token);
              setUser({
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                id: res.data.id,
              }).catch(console.log);
              //   const config = {
              //     headers: { Authorization: `Bearer ${res.data.token}` },
              //   };
              //   const bodyParameters = {
              //     patientId: res.data.id,
              //     doctorId: referralRes.data[0],
              //   };
              //   await axios
              //     .post(`${BASE_APP_URL}/isConsulting`, bodyParameters, config)
              //     .then(async (consRes) => {
              //       console.log(consRes.data);
              //       await AsyncStorage.setItem(
              //         "consultation",
              //         JSON.stringify({
              //           ...consRes.data,
              //           doctor: referralRes.data,
              //         })
              //       );

              //     })
              //     .catch(console.log);
            });
        } else {
          setUserToken(res.data.token);
          setRefreshToken(res.data.refreshToken.token);
          setUser({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            id: res.data.id,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  const logout = async () => {
    console.log("logged out");
    setIsLoading(true);
    setUserToken(null);
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("userDetails");
    await AsyncStorage.removeItem("consultation");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem("userToken");
      let userDetails = await AsyncStorage.getItem("userDetails");
      let reftoken = await AsyncStorage.getItem("refreshToken");
      // console.log(await token);
      console.log(userDetails.toString());
      // console.log(await reftoken);
      setUserToken(await token);
      setUser(JSON.parse(await userDetails));
      setRefreshToken(await reftoken);
      // console.log(refreshtoken);
      if (token != null) {
        const decodedToken = jwtDecode(await token);
        console.log("decoded: ", decodedToken);
        console.log("refresh token: ", reftoken);
        var dateNow = new Date();
        console.log("current ", Date.now() / 1000);
        if (decodedToken.exp < Date.now() / 1000) {
          console.log("expired");
          await axios
            .post(`${BASE_AUTH_URL}/refreshtoken`, {
              refreshToken: reftoken,
            })
            .then(async (res) => {
              console.log("new token received ", res.data.refreshToken);
              setUserToken(res.data.accessToken);
              await AsyncStorage.setItem(
                "refreshToken",
                await res.data.refreshToken
              );
              await AsyncStorage.setItem(
                "userToken",
                await res.data.accessToken
              );
              // setRefreshToken(res.data.refreshToken);
            })
            .catch((err) => {
              console.log(err);
              console.log("login again!"); // refresh token expired
              logout();
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
    getAppLanguage();
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
        changeAppLanguage,
        appLanguage,
        isLoading,
        userToken,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
