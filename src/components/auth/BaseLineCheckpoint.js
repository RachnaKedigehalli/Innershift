import { View, Text, Dimensions,ScrollView } from 'react-native'
import React, { useState,useContext, useEffect } from 'react'
import AppStyles from '../../AppStyles';
  import { AuthContext } from "./AuthContext";
  import { CheckBox } from '@rneui/themed';
  import CustomButton from '../CustomButton';

const BaseLineCheckpoint = ({route,navigation}) => {
  const [baseLineCheckpointText,setBaseLineCheckpointText] = useState("Baseline Checkpoint");
  const [baselineCheckpointQuestion,setBaselineCheckpointQuestion] = useState("Check the boxes for statements which are true for you");
  const { email, password, firstName, lastName,dob,gender,phoneNumber,referral } = route.params;
  const [baselineScore,setBaselineScore] = useState(0);
  const { register } = useContext(AuthContext);


  
  const [checkboxQuestions,setCheckboxQuestions] = useState([
    "My activity-level is lower than usual. / I find that I am spending quite a bit of my time doing nothing.",
    "I have noticed that I am quite critical of myself / I keep passing critical comments at myself in my head.",
    "I am getting frequent negative thoughts about my situation/my life in general.",
    "I am not reaching out to others for support.",
    "I keep worrying and getting stressed.",
    "I feel that I have hardly any control over my life-situation.",
    "I feel tense/anxious and restless several times.",
    "My sleep is significantly disturbed.",
    "I occasionally get thoughts about living no more.",
    "I think I may drop this self-care program mid-way/may not start."
  ]);
  const [pointsPerCheckbox,setPointsPerCheckbox] = useState([1,2,3,4,5,6,7,8,9,10]);
  // const [checkboxesSelected,setCheckboxesSelected] = useState([false,false,false,false,false,false,false,false,false,false,]);
  const [checkbox1Selected,setCheckbox1Selected] = useState(false);
  const [checkbox2Selected,setCheckbox2Selected] = useState(false);
  const [checkbox3Selected,setCheckbox3Selected] = useState(false);
  const [checkbox4Selected,setCheckbox4Selected] = useState(false);
  const [checkbox5Selected,setCheckbox5Selected] = useState(false);
  const [checkbox6Selected,setCheckbox6Selected] = useState(false);
  const [checkbox7Selected,setCheckbox7Selected] = useState(false);
  const [checkbox8Selected,setCheckbox8Selected] = useState(false);
  const [checkbox9Selected,setCheckbox9Selected] = useState(false);
  const [checkbox0Selected,setCheckbox0Selected] = useState(false);
  
  useEffect(() => {
        console.log("Trying to re-render");
    }, [checkbox0Selected,checkbox1Selected,checkbox2Selected,checkbox3Selected,checkbox4Selected,checkbox5Selected,checkbox6Selected,checkbox7Selected,checkbox8Selected,checkbox9Selected]);
  const updateBaselineScore = async()=> {
    let total = 0;
    pointsPerCheckbox.forEach((val,idx) => {
        if(checkboxesSelected[idx]){
            total+=val;
        }
    })
    await setBaselineScore(total);
  }
  
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: AppStyles.colour.white,
      }}
      keyboardShouldPersistTaps="handled"
    >
     <View>
        <View
            style={{
                borderRadius:12,
                alignItems:"center",
                justifyContent:"center",
                width: Dimensions.get("window").width-50
            }} 
        >
            <Text 
                style={{
                    fontSize: Platform.OS == "android" ? 24 : 27,
                    fontWeight: "600",
                    color: AppStyles.colour.textGreen,
                    width: 300,
                    // textAlign: "center",
                    fontFamily: AppStyles.font.subHeadings,
                    marginBottom: 25,
                    textAlign: "center",
                  }}
            >
            {baseLineCheckpointText}
            </Text>
            <Text 
                style={{
                    fontFamily: AppStyles.font.poppinsRegular,
                    color: AppStyles.colour.textGreen,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
            >
                {baselineCheckpointQuestion}
            </Text>
        </View>
        {/* view for the checkboxes */}
        <View
          style={{
            width: "100%",
            alignSelf: "flex-start",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
            {/* {checkboxQuestions.map((val,idx) => {
                return (<CheckBox 
                    key={idx}
                    title={val}
                    checked={checkboxesSelected[idx]}
                    iconType="material-community"
                    // containerStyle={{
                    //   backgroundColor: AppStyles.colour.white,
                    //   width: "100%",
                    // }}
                    onPress={async() => {
                        let newCheckboxesSelected = checkboxesSelected;
                        console.log("old checkboxes = ",checkboxesSelected);
                        newCheckboxesSelected[idx]=!checkboxesSelected[idx];
                        await setCheckboxesSelected(newCheckboxesSelected);
                        console.log("new checkboxes = ", checkboxesSelected);
                    }}
                    checkedIcon={"checkbox-marked"}
                    uncheckedIcon={"checkbox-blank-outline"}
                    checkedColor={AppStyles.colour.darkGreen}
                    uncheckedColor={AppStyles.colour.darkGreen}
                    textStyle={{
                      color: AppStyles.colour.grey,
                      fontFamily: AppStyles.font.Poppins_500Medium,
                    }}
                >

                </CheckBox>);
            })} */}
            <View 
              style={{margin:"auto"}}
            >
              <CheckBox
                title={checkboxQuestions[0]}
                checked={checkbox0Selected}
                iconType="material-community"
                onPress={async() => {
                  // let newCheckboxesSelected = checkboxesSelected;
                  // console.log("old checkboxes = ",checkboxesSelected);
                  // newCheckboxesSelected[0]=!checkboxesSelected[0];
                  // await setCheckboxesSelected(newCheckboxesSelected);
                  setCheckbox0Selected=setCheckbox0Selected(!checkbox0Selected);
                  // console.log("new checkboxes = ", checkboxesSelected);
                }}
                checkedIcon={"checkbox-marked"}
                uncheckedIcon={"checkbox-blank-outline"}
                    checkedColor={AppStyles.colour.darkGreen}
                    uncheckedColor={AppStyles.colour.darkGreen}
                    textStyle={{
                      color: AppStyles.colour.textGreen,
                      fontFamily: AppStyles.font.Poppins_500Medium,
                    }}
              ></CheckBox>
            </View>
            <View 
              style={{margin:"auto"}}
            >
              <CheckBox
                title={checkboxQuestions[1]}
                checked={checkbox1Selected}
                iconType="material-community"
                onPress={async() => {
                  // let newCheckboxesSelected = checkboxesSelected;
                  // console.log("old checkboxes = ",checkboxesSelected);
                  // newCheckboxesSelected[1]=!checkboxesSelected[1];
                  // await setCheckboxesSelected(newCheckboxesSelected);
                  setCheckbox1Selected=setCheckbox1Selected(!checkbox1Selected);

                  // console.log("new checkboxes = ", checkboxesSelected);
                }}
                checkedIcon={"checkbox-marked"}
                uncheckedIcon={"checkbox-blank-outline"}
                    checkedColor={AppStyles.colour.darkGreen}
                    uncheckedColor={AppStyles.colour.darkGreen}
                    textStyle={{
                      color: AppStyles.colour.textGreen,
                      fontFamily: AppStyles.font.Poppins_500Medium,
                    }}
              ></CheckBox>
            </View><View 
              style={{margin:"auto"}}
            >
              <CheckBox
                title={checkboxQuestions[2]}
                checked={checkbox2Selected}
                iconType="material-community"
                onPress={async() => {
                  // let newCheckboxesSelected = checkboxesSelected;
                  // console.log("old checkboxes = ",checkboxesSelected);
                  // newCheckboxesSelected[2]=!checkboxesSelected[2];
                  // await setCheckboxesSelected(newCheckboxesSelected);
                  setCheckbox2Selected=setCheckbox2Selected(!checkbox2Selected);
                  // console.log("new checkboxes = ", checkboxesSelected);
                }}
                checkedIcon={"checkbox-marked"}
                uncheckedIcon={"checkbox-blank-outline"}
                    checkedColor={AppStyles.colour.darkGreen}
                    uncheckedColor={AppStyles.colour.darkGreen}
                    textStyle={{
                      color: AppStyles.colour.textGreen,
                      fontFamily: AppStyles.font.Poppins_500Medium,
                    }}
              ></CheckBox>
            </View>
            <View 
              style={{margin:"auto"}}
            >
              <CheckBox
                title={checkboxQuestions[3]}
                checked={checkbox3Selected}
                iconType="material-community"
                onPress={async() => {
                  // let newCheckboxesSelected = checkboxesSelected;
                  // console.log("old checkboxes = ",checkboxesSelected);
                  // newCheckboxesSelected[3]=!checkboxesSelected[3];
                  // await setCheckboxesSelected(newCheckboxesSelected);
                  setCheckbox3Selected=setCheckbox3Selected(!checkbox3Selected);
                  // console.log("new checkboxes = ", checkboxesSelected);
                }}
                checkedIcon={"checkbox-marked"}
                uncheckedIcon={"checkbox-blank-outline"}
                    checkedColor={AppStyles.colour.darkGreen}
                    uncheckedColor={AppStyles.colour.darkGreen}
                    textStyle={{
                      color: AppStyles.colour.textGreen,
                      fontFamily: AppStyles.font.Poppins_500Medium,
                    }}
              ></CheckBox>
            </View>
            <View 
              style={{margin:"auto"}}
            >
              <CheckBox
                title={checkboxQuestions[4]}
                checked={checkbox4Selected}
                iconType="material-community"
                onPress={async() => {
                  // let newCheckboxesSelected = checkboxesSelected;
                  // console.log("old checkboxes = ",checkboxesSelected);
                  // newCheckboxesSelected[4]=!checkboxesSelected[4];
                  // await setCheckboxesSelected(newCheckboxesSelected);
                  setCheckbox4Selected=setCheckbox4Selected(!checkbox4Selected);
                  // console.log("new checkboxes = ", checkboxesSelected);
                }}
                checkedIcon={"checkbox-marked"}
                uncheckedIcon={"checkbox-blank-outline"}
                    checkedColor={AppStyles.colour.darkGreen}
                    uncheckedColor={AppStyles.colour.darkGreen}
                    textStyle={{
                      color: AppStyles.colour.textGreen,
                      fontFamily: AppStyles.font.Poppins_500Medium,
                    }}
              ></CheckBox>
            </View>
            <View 
              style={{margin:"auto"}}
            >
              <CheckBox
                title={checkboxQuestions[5]}
                checked={checkbox5Selected}
                iconType="material-community"
                onPress={async() => {
                  // let newCheckboxesSelected = checkboxesSelected;
                  // console.log("old checkboxes = ",checkboxesSelected);
                  // newCheckboxesSelected[5]=!checkboxesSelected[5];
                  setCheckbox5Selected=setCheckbox5Selected(!checkbox5Selected);
                  // await setCheckboxesSelected(newCheckboxesSelected);
                  // console.log("new checkboxes = ", checkboxesSelected);
                }}
                checkedIcon={"checkbox-marked"}
                uncheckedIcon={"checkbox-blank-outline"}
                    checkedColor={AppStyles.colour.darkGreen}
                    uncheckedColor={AppStyles.colour.darkGreen}
                    textStyle={{
                      color: AppStyles.colour.textGreen,
                      fontFamily: AppStyles.font.Poppins_500Medium,
                    }}
              ></CheckBox>
            </View>
            <View 
              style={{margin:"auto"}}
            >
              <CheckBox
                title={checkboxQuestions[6]}
                checked={checkbox6Selected}
                iconType="material-community"
                onPress={async() => {
                  // let newCheckboxesSelected = checkboxesSelected;
                  // console.log("old checkboxes = ",checkboxesSelected);
                  // newCheckboxesSelected[6]=!checkboxesSelected[6];
                  // await setCheckboxesSelected(newCheckboxesSelected);
                  // console.log("new checkboxes = ", checkboxesSelected);
                  setCheckbox6Selected=setCheckbox6Selected(!checkbox6Selected);
                }}
                checkedIcon={"checkbox-marked"}
                uncheckedIcon={"checkbox-blank-outline"}
                    checkedColor={AppStyles.colour.darkGreen}
                    uncheckedColor={AppStyles.colour.darkGreen}
                    textStyle={{
                      color: AppStyles.colour.textGreen,
                      fontFamily: AppStyles.font.Poppins_500Medium,
                    }}
              ></CheckBox>
            </View>
            <View 
              style={{margin:"auto"}}
            >
              <CheckBox
                title={checkboxQuestions[7]}
                checked={checkbox7Selected}
                iconType="material-community"
                onPress={async() => {
                  // let newCheckboxesSelected = checkboxesSelected;
                  // console.log("old checkboxes = ",checkboxesSelected);
                  // newCheckboxesSelected[7]=!checkboxesSelected[7];
                  // await setCheckboxesSelected(newCheckboxesSelected);
                  setCheckbox7Selected=setCheckbox7Selected(!checkbox7Selected);
                  // console.log("new checkboxes = ", checkboxesSelected);
                }}
                checkedIcon={"checkbox-marked"}
                uncheckedIcon={"checkbox-blank-outline"}
                    checkedColor={AppStyles.colour.darkGreen}
                    uncheckedColor={AppStyles.colour.darkGreen}
                    textStyle={{
                      color: AppStyles.colour.textGreen,
                      fontFamily: AppStyles.font.Poppins_500Medium,
                    }}
              ></CheckBox>
            </View>
            <View 
              style={{margin:"auto"}}
            >
              <CheckBox
                title={checkboxQuestions[8]}
                checked={checkbox8Selected}
                iconType="material-community"
                onPress={async() => {
                  // let newCheckboxesSelected = checkboxesSelected;
                  // console.log("old checkboxes = ",checkboxesSelected);
                  // newCheckboxesSelected[8]=!checkboxesSelected[8];
                  // await setCheckboxesSelected(newCheckboxesSelected);
                  setCheckbox8Selected=setCheckbox8Selected(!checkbox8Selected);
                  // console.log("new checkboxes = ", checkboxesSelected);
                }}
                checkedIcon={"checkbox-marked"}
                uncheckedIcon={"checkbox-blank-outline"}
                    checkedColor={AppStyles.colour.darkGreen}
                    uncheckedColor={AppStyles.colour.darkGreen}
                    textStyle={{
                      color: AppStyles.colour.textGreen,
                      fontFamily: AppStyles.font.Poppins_500Medium,
                    }}
              ></CheckBox>
            </View>
            <View 
              style={{margin:"auto"}}
            >
              <CheckBox
                title={checkboxQuestions[9]}
                checked={checkbox9Selected}
                iconType="material-community"
                onPress={async() => {
                  setCheckbox9Selected=setCheckbox9Selected(!checkbox9Selected);
                  // let newCheckboxesSelected = checkboxesSelected;
                  // console.log("old checkboxes = ",checkboxesSelected);
                  // newCheckboxesSelected[9]=!checkboxesSelected[9];
                  // await setCheckboxesSelected(newCheckboxesSelected);
                  // console.log("new checkboxes = ", checkboxesSelected);
                }}
                checkedIcon={"checkbox-marked"}
                uncheckedIcon={"checkbox-blank-outline"}
                    checkedColor={AppStyles.colour.darkGreen}
                    uncheckedColor={AppStyles.colour.darkGreen}
                    textStyle={{
                      color: AppStyles.colour.textGreen,
                      fontFamily: AppStyles.font.Poppins_500Medium,
                    }}
              ></CheckBox>
            </View>

        </View>
        <CustomButton
              title="Register"
              accessibilityLabel={"Register"}
              onPress={async () => {
                // navigation.navigate("Register");
                await updateBaselineScore();
                // register()
                console.log("Registering is a joke bitchess")
                // await register(
                //     email,
                //     firstName,
                //     lastName,
                //     password,
                //     dob,
                //     gender,
                //     phoneNumber,
                //     referral,
                //     baselineScore
                // )
              }}
            />
     </View>
    </ScrollView>
  )
}

export default BaseLineCheckpoint