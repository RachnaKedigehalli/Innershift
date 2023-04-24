import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import CustomButton from "../components/CustomButton";
import { getLocales } from "expo-localization";
// import { TouchableOpacity } from "react-native-gesture-handler";
import AppStyles from "../AppStyles";
import { Icon } from "@rneui/themed";
import { AuthContext } from "../components/auth/AuthContext";

const langs_dict = {
  af: "Afrikaans",
  sq: "Albanian",
  am: "Amharic",
  ar: "Arabic",
  hy: "Armenian",
  as: "Assamese",
  ay: "Aymara",
  az: "Azerbaijani",
  bm: "Bambara",
  eu: "Basque",
  be: "Belarusian",
  bn: "Bengali",
  bho: "Bhojpuri",
  bs: "Bosnian",
  bg: "Bulgarian",
  ca: "Catalan",
  ceb: "Cebuano",
  ny: "Chichewa",
  "zh-CN": "Chinese (Simplified)",
  "zh-TW": "Chinese (Traditional)",
  co: "Corsican",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  dv: "Dhivehi",
  doi: "Dogri",
  nl: "Dutch",
  en: "English",
  eo: "Esperanto",
  et: "Estonian",
  ee: "Ewe",
  tl: "Filipino",
  fi: "Finnish",
  fr: "French",
  fy: "Frisian",
  gl: "Galician",
  ka: "Georgian",
  de: "German",
  el: "Greek",
  gn: "Guarani",
  gu: "Gujarati",
  ht: "Haitian Creole",
  ha: "Hausa",
  haw: "Hawaiian",
  iw: "Hebrew",
  he: "Hebrew",
  hi: "Hindi",
  hmn: "Hmong",
  hu: "Hungarian",
  is: "Icelandic",
  ig: "Igbo",
  ilo: "Ilocano",
  id: "Indonesian",
  ga: "Irish",
  it: "Italian",
  ja: "Japanese",
  jw: "Javanese",
  kn: "Kannada",
  kk: "Kazakh",
  km: "Khmer",
  rw: "Kinyarwanda",
  gom: "Konkani",
  ko: "Korean",
  kri: "Krio",
  ku: "Kurdish (Kurmanji)",
  ckb: "Kurdish (Sorani)",
  ky: "Kyrgyz",
  lo: "Lao",
  la: "Latin",
  lv: "Latvian",
  ln: "Lingala",
  lt: "Lithuanian",
  lg: "Luganda",
  lb: "Luxembourgish",
  mk: "Macedonian",
  mai: "Maithili",
  mg: "Malagasy",
  ms: "Malay",
  ml: "Malayalam",
  mt: "Maltese",
  mi: "Maori",
  mr: "Marathi",
  "mni-Mtei": "Meiteilon (Manipuri)",
  lus: "Mizo",
  mn: "Mongolian",
  my: "Myanmar (Burmese)",
  ne: "Nepali",
  no: "Norwegian",
  or: "Odia (Oriya)",
  om: "Oromo",
  ps: "Pashto",
  fa: "Persian",
  pl: "Polish",
  pt: "Portuguese",
  pa: "Punjabi",
  qu: "Quechua",
  ro: "Romanian",
  ru: "Russian",
  sm: "Samoan",
  sa: "Sanskrit",
  gd: "Scots Gaelic",
  nso: "Sepedi",
  sr: "Serbian",
  st: "Sesotho",
  sn: "Shona",
  sd: "Sindhi",
  si: "Sinhala",
  sk: "Slovak",
  sl: "Slovenian",
  so: "Somali",
  es: "Spanish",
  su: "Sundanese",
  sw: "Swahili",
  sv: "Swedish",
  tg: "Tajik",
  ta: "Tamil",
  tt: "Tatar",
  te: "Telugu",
  th: "Thai",
  ti: "Tigrinya",
  ts: "Tsonga",
  tr: "Turkish",
  tk: "Turkmen",
  ak: "Twi",
  uk: "Ukrainian",
  ur: "Urdu",
  ug: "Uyghur",
  uz: "Uzbek",
  vi: "Vietnamese",
  cy: "Welsh",
  xh: "Xhosa",
  yi: "Yiddish",
  yo: "Yoruba",
  zu: "Zulu",
};
let langs = [];
console.log(langs);
for (const [key, value] of Object.entries(langs_dict))
  langs.push({ code: key, name: value });

const translate = require("google-translate-api-x");

const SelectLanguage = ({ navigation }) => {
  const { appLanguage, changeAppLanguage } = useContext(AuthContext);
  const [language, setLanguage] = useState(appLanguage);
  //   console.log(getLocales()[0]["languageCode"]);

  const originalSelectLangText = "Select your prefered language";
  const [selectLangText, setSelectLangText] = useState(originalSelectLangText);
  useEffect(() => {
    translate(selectLangText, {
      from: "en",
      to: language,
    }).then((res) => setSelectLangText(res.text));
  }, [language]);

  const originalContinueText = "Set Language";
  const [continueText, setContinueText] = useState(originalContinueText);
  useEffect(() => {
    translate(originalContinueText, {
      from: "en",
      to: language,
    }).then((res) => setContinueText(res.text));
  }, [language]);

  // const renderLanguage = ({ item }) => {
  //   return <TouchableOpacity></TouchableOpacity>;
  // };
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: AppStyles.colour.white,
          alignItems: "center",
          paddingBottom: 50,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 81,
            justifyContent: "center",
            paddingHorizontal: 35,
            paddingBottom: 55,
          }}
        >
          <Image source={require("assets/images/logo.png")} />
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginTop: 61,
              // gap: 9
            }}
          >
            <Text
              style={{
                fontSize: Platform.OS == "android" ? 24 : 27,
                fontWeight: "600",
                color: AppStyles.colour.textGreen,
                //   width: 300,
                // textAlign: "center",
                fontFamily: AppStyles.font.subHeadings,
                marginBottom: 25,
                textAlign: "center",
              }}
            >
              {selectLangText}
            </Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              {langs.map((lang, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setLanguage(lang.code);
                    }}
                    style={{
                      flexDirection: "row",
                      marginVertical: 4,
                      width: 150,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: AppStyles.font.poppinsRegular,
                        fontSize: 16,
                        paddingVertical: 2,
                      }}
                    >
                      {lang.name}
                    </Text>

                    {lang.code == language ? (
                      // <Image
                      //     source={require("assets/icons/readReceipt.png")}
                      // />
                      <Icon
                        style={{
                          marginLeft: 5,
                        }}
                        name="done"
                        type="material"
                        color={AppStyles.colour.textGreen}
                      />
                    ) : (
                      <></>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
        <CustomButton
          title={continueText}
          accessibilityLabel={continueText}
          onPress={() => {
            changeAppLanguage(language);
            navigation.navigate("StartPage", {
              screen: "StartPage",
            });
          }}
        />
      </ScrollView>
    </>
  );
};

export default SelectLanguage;

const styles = StyleSheet.create({});
