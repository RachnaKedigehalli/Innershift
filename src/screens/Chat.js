import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
} from "react-native";
import React, { useState } from "react";
import AppStyles from "../AppStyles";
import Avatar from "../components/Avatar";
import Message from "../components/Message";

const Chat = ({ navigation }) => {
    const [messagePlaceHolder, setMessagePlaceHolder] =
        useState("Type here...");
    const [currentMessage, setCurrentMessage] = useState("");

    return (
        <>
            {/* <View style={styles.container}> */}
            <View style={styles.topBarContainer}>
                <View style={styles.topBar}>
                    <Image
                        style={styles.back}
                        source={require("../../assets/icons/chevron-left.png")}
                        onPress={navigation.goBack}
                    />
                    <View style={styles.doctorDetails}>
                        <Avatar
                            imageSrc={require("../../assets/images/dummy/profile1.jpg")}
                        ></Avatar>
                        <Text style={styles.doctorName}> Dr. Menon</Text>
                    </View>
                </View>
            </View>
            <View style={styles.chatSendContainer}>
                <View style={styles.chat}>
                    <Message
                        content={"cdscanjkdjnk"}
                        sender={true}
                        timeStamp={"11/12/2020"}
                        readReceipt={true}
                    />
                    <Message
                        content={"cdscanjkdjnk"}
                        sender={false}
                        timeStamp={"11/12/2020"}
                        readReceipt={true}
                    />
                </View>
                <View style={styles.sendMessageContainer}>
                    <View style={styles.sendMessageInnerContainer}>
                        <TextInput
                            style={styles.typeMessage}
                            onChangeText={setCurrentMessage}
                            value={currentMessage}
                            placeholder={messagePlaceHolder}
                            multiline
                            editable
                            numberOfLines={1}
                            cursorColor={AppStyles.colour.darkGreen}
                        />

                        <Image
                            style={styles.sendIcon}
                            source={require("../../assets/icons/sendMessage.png")}
                        ></Image>
                    </View>
                </View>
            </View>
            {/* </View> */}
        </>
    );
};

export default Chat;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
    },
    topBarContainer: {
        height: 108,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        flexDirection: "row",
        alignItems: "flex-end",

        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomEndRadius: 15,
        overflow: "hidden",
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
    },
    back: {
        width: 30,
        height: 30,
    },
    doctorDetails: {
        marginLeft: 23,
        flexDirection: "row",
        alignItems: "center",
    },
    doctorName: {
        marginLeft: 15,
        fontFamily: AppStyles.font.subHeadings,
        fontSize: 20,
        color: AppStyles.colour.darkGreen,
    },
    chatSendContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: AppStyles.colour.chatBg,
        alignItems: "center",
    },
    chat: {
        width: Dimensions.get("window").width - 50,
        // backgroundColor: "black",
    },
    sendMessageContainer: {
        // height: 88,
        backgroundColor: AppStyles.colour.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 20,
        width: "100%",
    },
    sendMessageInnerContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: AppStyles.colour.grey,
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
    },
    typeMessage: {
        flex: 1,
        fontSize: 13,
        fontFamily: AppStyles.font.poppinsRegular,
        color: AppStyles.colour.darkGreen,
    },
    sendIcon: {
        width: 28,
        height: 28,
        marginLeft: 20,
    },
});
