import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_APP_URL } from "../../config";
import CustomButton from "../components/CustomButton";
import AppStyles from "../AppStyles";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";

const translate = require("google-translate-api-x");

const ExportData = ({ navigation }) => {
  const { appLanguage } = useContext(AuthContext);
  const translateText = (originalText, setText) => {
    translate(originalText, {
      from: "en",
      to: appLanguage,
    }).then((res) => setText(res.text));
  };

  const originalTexts = {
    title: "Export Data",
    desp: "Download your activity history in anonymised format",
  };
  const [title, setTitle] = useState(originalTexts.title);
  const [desp, setDesp] = useState(originalTexts.desp);
  translateText(originalTexts.title, setTitle);
  translateText(originalTexts.desp, setDesp);

  const exportData = async () => {
    let token = await AsyncStorage.getItem("userToken");
    let userDetails = JSON.parse(await AsyncStorage.getItem("userDetails"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    // const permissions =
    //   await StorageAccessFramework.requestDirectoryPermissionsAsync();
    // if (!permissions.granted) {
    //   return;
    // }

    // fetch(`${BASE_APP_URL}/exportPdf/${userDetails.id}`, config)
    //   .then((res) => res.blob())
    //   .then(async (blob) => {
    //     await StorageAccessFramework.createFileAsync(
    //       permissions.directoryUri,
    //       "innerShiftData.pdf",
    //       "application/pdf"
    //     ).then(async (uri) => {
    //       // const filePath = `${FileSystem.documentDirectory}/innerShiftData.pdf`;
    //       await FileSystem.writeAsStringAsync(uri, blob, {
    //         encoding: FileSystem.EncodingType.Base64,
    //       });
    //       console.log("Saved pdf successfully");
    //     });
    //   })
    //   .catch(console.log);

    FileSystem.downloadAsync(
      `${BASE_APP_URL}/exportPdf/${userDetails.id}`,
      FileSystem.documentDirectory + "InnerShift.pdf"
    )
      .then(({ uri }) => {
        console.log("Finished downloading to ", uri);
        // this.share(uri);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desp}>{desp}</Text>
      <View style={styles.buttons}>
        <CustomButton
          title={title}
          accessibilityLabel={title}
          onPress={async () => {
            exportData();
          }}
        />
      </View>
    </View>
  );
};

export default ExportData;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: AppStyles.colour.white,
    paddingHorizontal: 35,
  },
  title: {
    fontFamily: AppStyles.font.subHeadings,
    fontSize: Platform.OS == "android" ? 24 : 27,
    color: AppStyles.colour.textGreen,
    marginBottom: 15,
    marginTop: 25,
    textAlign: "center",
  },
  desp: {
    fontFamily: AppStyles.font.poppinsMedium,
    color: AppStyles.colour.darkGrey,
    textAlign: "center",
    fontSize: 15,
  },
  buttons: {
    marginTop: 25,
  },
});
