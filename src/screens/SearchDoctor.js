import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextInput from "../components/CustomTextInput";
import AppStyles from "../AppStyles";
import { Icon } from "@rneui/base";
import searchIcon from "../../assets/icons/MagnifyingGlass.png";
import DoctorCard from "../components/DoctorCard";
import DoctorDetails from "./DoctorDetails";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import {
  FlatList,
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_APP_URL } from "../../config";

const SearchDoctor = (props) => {
  const [searchString, setSearchString] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [searchPlaceholder, setSearchPlaceholder] = useState(
    "Search for a doctor"
  );
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState([]);
  //   const bottomSheetModalRef = BottomSheetModal();
  const bottomSheetModalRef = useRef(BottomSheetModal);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const snapPoints = useMemo(() => ["30%", "70%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    console.log("in useeffect of search doctor");
    const apiCall = async () => {
      let token = await AsyncStorage.getItem("userToken");
      let userDetails = JSON.parse(await AsyncStorage.getItem("userDetails"));
      console.log("token", token);
      console.log("userDetails", userDetails);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios
        .get(`${BASE_APP_URL}/getAllDoctors`, config)
        .then((res) => {
          console.log("doctor data", res.data);
          setDoctors(res.data);
        })
        .catch((e) => console.log("couldn't get doctors ", e));
    };
    apiCall();
  }, []);

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <BottomSheetModalProvider>
          <View
            style={{
              marginTop: 40,
              padding: 0,
              margin: 0,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Text style={{ fontWeight: "bold" }}>SearchScreen here </Text> */}
            <View style={styles.input}>
              <TextInput
                onChangeText={setSearchString}
                value={searchString}
                placeholder={searchPlaceholder}
                keyboardType="text"
              />
              <Image source={searchIcon}></Image>
            </View>

            <View
              style={{
                marginTop: 20,
                marginBottom: 130,
              }}
            >
              {/* {(doctors != [] && doctors != undefined && doctors != null ) ? (
                <FlatList
                  data={doctors}
                  keyExtractor={(item) => item[0]}
                  renderItem={({ item }) => {
                    return (
                      <Pressable
                        onPress={() => {
                          setDoctor(item);
                          handlePresentModalPress();
                        }}
                        // key={item[0]}
                      >
                        <DoctorCard
                          name={`${item[4]} ${item[5]}`}
                          qualifications={`${item[3]}`}
                          // navigation={props.navigation}
                        />
                      </Pressable>
                    );
                  }}
                />
              ) : (
                <></>
              )} */}
              <ScrollView>
                {doctors.map((doctor, did) => {
                  return (
                    <Pressable
                      onPress={() => {
                        setDoctor(doctor);
                        handlePresentModalPress();
                      }}
                      key={did}
                    >
                      <DoctorCard
                        name={`${doctor.firstName} ${doctor.lastName}`}
                        qualifications={`${doctor.degree}`}
                        // navigation={props.navigation}
                      />
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
            {/* <View style={styles.container}> */}

            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              style={{
                shadowColor: "#505050",
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.6,
                shadowRadius: 10,
              }}
            >
              <View style={styles.contentContainer}>
                <View>
                  <DoctorDetails
                    doctor={doctor}
                    navigation={props.navigation}
                    setIsDoctorAssigned={props.setIsDoctorAssigned}
                  />
                </View>
              </View>
            </BottomSheetModal>
            {/* </View> */}
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    color: AppStyles.colour.textGreen,
    borderColor: AppStyles.colour.darkGreen,
    borderWidth: 2,
    width: "80%",
    paddingTop: Platform.OS == "android" ? 7 : 12,
    paddingBottom: Platform.OS == "android" ? 10 : 15,
    paddingLeft: 20,
    borderRadius: 28,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
  },
  container: {
    flex: 1,
    // padding: 24,
    // justifyContent: "center",
    // backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default SearchDoctor;
