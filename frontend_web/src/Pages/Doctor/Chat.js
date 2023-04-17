import { Flex, Button, Text, Box, VStack, HStack, StackDivider, Heading, FormControl, Input } from '@chakra-ui/react'
import SideDoctor from "../../Components/SideDoctor";
import { DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM } from "../../Constants";



// import { Tooltip as ReactTooltip } from 'react-tooltip'

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     // faCirclePlus, 
//     faComments,
//     faHeadphones,
// 	faBookOpen,
// 	faCirclePlay,
// 	faListUl,
// 	faQuestion
// } from "@fortawesome/free-solid-svg-icons";

import React from 'react';
import { useNavigate, useLocation, } from 'react-router-dom'



function DoctorChat(){
	const navigate = useNavigate();
	const location = useLocation();

	const clickSearch = () => {
		navigate('/dummyloc', {
			state: location.state
		})
	}


    const Header = ({patientName}) =>{
        return(<Heading color='teal.700' m={4} mt={12}> {patientName} </Heading>)
    }

    const MyMessage = ({msgText}) =>{
        return (<Box ml={30} align='right' bg='teal.700'>
            <Text color='gray.300'>{msgText}</Text>
        </Box>);
    }

    const OtherMessage = ({msgText}) =>{
        return (<Box mr={30} bg='gray.300'>
            <Text color='teal.700'>{msgText}</Text>
        </Box>);
    }


    var chatId = 0;

    const Chat = ({messages, myId}) =>{
        var chatMessages = []

        for(var msg in messages){
            // displayQuestions.push(<FormQuestions key={i} qno={i}/>)
            if(msg.senderId === myId){
                chatMessages.push(<MyMessage msgText={msg.content} key={chatId}/>)
            }
            else{
                chatMessages.push(<OtherMessage msgText={msg.content} key={chatId}/>)
            }
            chatId++;
        }

        // chatMessages.push(<MyMessage msgText='this is message from doctor' key={chatId}/>)
        // chatId+=1;
        // chatMessages.push(<OtherMessage msgText='patient says hi' key={chatId}/>)
        // chatId+=1;

        return(<Box w='100%' flex={1} overflowY='auto'>
            {chatMessages}
        </Box>);
    }

    const Footer = ({}) => {
        return(<Box w='100%' >
            <FormControl>
                <Input minHeight='100%' w='100%' borderColor='gray.300' placeholder='Type Here' />
                {/* <Button >Send</Button> */}
            </FormControl>
        </Box>);
    }

    

	return(<div> 
		<Flex>

			{/* This be side nav bar */}
			<SideDoctor/>

			{/* This be main screen */}
			<Flex direction='column' bg={DESKTOP_BG_LIGHT} maxHeight='100vh' minHeight='100vh' w='80%' ml='20%'>
				{/* <VStack h='100%' flexDirection='column' align='left' m={3} divider={<StackDivider borderColor='gray.200' />}> */}
					<Header patientName="test name"/>
                    <Chat/>
                    <Footer/>
				{/* </VStack> */}
			</Flex>
			
		</Flex>
	</div>);
	
}

export default DoctorChat;