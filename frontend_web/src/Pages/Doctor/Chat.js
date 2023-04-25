import { Flex, Button, Text, Box, VStack, HStack, StackDivider, Heading, FormControl, Input, Center, Square } from '@chakra-ui/react'
import SideDoctor from "../../Components/SideDoctor";
import { DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM } from "../../Constants";
import React from 'react';
import { useNavigate, useLocation, } from 'react-router-dom'
import { useEffect,useState} from 'react';
import axios from 'axios';
import { useStateValue } from '../../StateProvider'
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

import {useFirstRender} from "../../Utils/useFirstRender"


function DoctorChat(){
	const navigate = useNavigate();
	const location = useLocation();
	
	const [state,dispatch] = useStateValue(); 

	const [isConnected, setIsConnected] = useState(false);
	const [messageList, setMessageList] = useState([]);
	const [stompClient, setStompClient] = useState();

	const [latestMessage,setLatestMessage] = useState("");
	const firstRender = useFirstRender();

	
	const sendMessage = async (currentMessage) => {  
		var header = {
			"jwt-token": state.adminToken,
		};

		if (currentMessage.trim() !== "") {
			const message = {
				consultationId: location.state.consultationId,
				content: currentMessage,
				senderId: state.id,
				recipientId: location.state.id,
			};

			await stompClient.send(
				"/api/v1/app/app/chat",
				header,
				JSON.stringify(message)
			);
			setLatestMessage("");
		}
	};

	const onMessageReceived = async (msg) => {
		console.log("in Received");
		console.log(msg.body);
		console.log("before messageList: ", messageList);  

		await callApi();
		// setMessageList([...messageList,JSON.parse(msg.body)]);
	};

	const onConnected = async (sc) => {
		console.log("messageList in onConnected: ", messageList);
		console.log("connected");

		var header = {
			"jwt-token": state.adminToken,
		};

		await sc.subscribe(
			`/api/v1/app/user/${location.state.consultationId}/queue/messages`,
			onMessageReceived,
			header
		);
		setIsConnected(true);
	};
	
	const onError = (e) => {
		console.log("error: ", e);
	};

	const connect = async () => {
			if (!isConnected) {
				console.log("connect", state.adminToken);
				console.log("messages in connect: ", messageList);
				var header = {
					"jwt-token": state.adminToken,
				};
				const sc = Stomp.over(() => {
					const sockJS = new SockJS("http://localhost:8080/api/v1/app/ws", null);
					return sockJS;
				});
	
				setStompClient(sc);
				sc.connect(header, () => onConnected(sc), onError);
			}
	};
		
	const callApi = async () => {    
		console.log("I'm in callApi")    
		const config = {
			headers: { Authorization: `Bearer ${state.adminToken}` },
		};
		
		const bodyParameters = {
			patientId: location.state.id,
		};

		await axios
			.post("http://localhost:8080/api/v1/app/getAllMessagesByPId", bodyParameters, config)
			.then(async (res) => {
				setMessageList(res.data);
			})
			.catch((e) => console.log(e));
	};


	useEffect(() => {
		const makeCall = async () => {
		if(firstRender)
			await connect();
		}
		makeCall();
	}, []);

	useEffect(() => {
		const makeCalls = async () => {
				await callApi();
		};
		makeCalls();       
	}, []);
	

	const Header = ({patientName}) =>{
			return(<Heading color='teal.700' m={4} mt={12}> {patientName} </Heading>)
	}

	const MyMessage = ({msgText}) =>{
			return (<Flex color={DESKTOP_BG_LIGHT} m={1}>
			<Center minWidth={30} padding={2}>
				{/* <Text>Box 1</Text> */}
			</Center>
			<Box flex='1' padding={2}>
				{/* <Text>Box 2</Text> */}
			</Box>
			<Box bg='teal.700' borderRadius={30} padding={2}>
				<Text color='gray.300'>{msgText}</Text>
			</Box>
			<Box bg={DESKTOP_BG_LIGHT} minWidth={5}>
				{/* <Text color='gray.300'>{msgText}</Text> */}
			</Box>
		</Flex>);
	}

	const OtherMessage = ({msgText}) =>{
		return (<Flex color={DESKTOP_BG_LIGHT} m={1}>
			<Box bg={DESKTOP_BG_LIGHT} minWidth={5}></Box>
			<Box bg='gray.300' borderRadius={30} padding={2}>
					<Text color='teal.700'>{msgText}</Text>
			</Box>

			<Box flex='1' padding={2}>
					{/* <Text>Box 2</Text> */}
			</Box>
			<Center minWidth={20} padding={2}>
			{/* <Text>Box 1</Text> */}
			</Center>
		</Flex>);
	}
		
		const onSend = async () => {
			await sendMessage(latestMessage);
			setLatestMessage("");
		}

		const updateMessage = async (event) =>{
			setLatestMessage(event.target.value)
		}

	return(<div> 
		<Flex>
			<SideDoctor/>
			<Flex direction='column' bg={DESKTOP_BG_LIGHT} maxHeight='100vh' minHeight='100vh' w='80%' ml='20%'>
				<Header patientName={location.state.name}/>
				<Box w='100%' flex={1} overflowY='auto'>
							{messageList.map((msg,itemIndex) => {
								return(
								(msg.senderId === state.id)? 
										<MyMessage  msgText={msg.content} key={msg.messageId} />
								:
										<OtherMessage msgText={msg.content} key={msg.messageId}/>
										
							)})}    
				</Box>         
				<Box w='100%' >            
							<Input value={latestMessage} onChange={updateMessage} minHeight='100%' w='100%' borderColor='gray.300' placeholder='Type Here' />
							<Button onClick={onSend}>Send</Button>
				</Box>
			</Flex>
			
		</Flex>
	</div>);
	
}

export default DoctorChat;