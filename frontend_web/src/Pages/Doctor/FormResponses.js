import { Flex, Text, VStack, StackDivider, Heading, Card, CardBody, Divider } from '@chakra-ui/react'
import SideDoctor from "../../Components/SideDoctor";
import { DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM } from "../../Constants";
import axios from 'axios'

import styled from "@emotion/styled";

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'




function FormResponse(){

    const [state,dispatch] = useStateValue();
    const [currDiagnosis,setDiagnosis] =  useState({target:{value:""}});
    const [numberOfDiagnosis,setNumberofDiagnosis] = useState(0); 
    const [allDiagnosis,setAllDiagnosis] = useState([])
    
    const location = useLocation(); 

    // useEffect(()=>{
    //     const auth = {
    //         headers: {
    //             Authorization: `Bearer ${state.adminToken}`
    //         }
    //     }

    //     const content = {
    //         consultationId:location.state.consultationId, 
    //     }

    //     axios.post('http://localhost:8080/api/v1/app/getDiagnosisByCid',content,auth)
    //     .then(response=>{
    //         console.log(response.data)
    //         setAllDiagnosis(response.data)
    //     })
    // },[numberOfDiagnosis])

    const Response = ({qno, question, response}) =>{
        return(<Card minW='100%' bg={DESKTOP_BG_MEDIUM} >
			<CardBody>
				<Flex minW='100%'>
					<Text color='teal.700' w='11ch' align='right' as='b'> Question {qno}:</Text>
					<Text color='teal.700'ml={3} flex='1'>{question}</Text>
				</Flex>
				<Flex minW='100%'>
					<Text color='teal.700' w='11ch' align='right' as='b'> Response:</Text>
					<Text color='teal.700'ml={3} flex='1'>{response}</Text>
				</Flex>
				
			</CardBody>
		</Card>)
    }


	return(<div> 
		<Flex>

			{/* This be side nav bar */}
			<SideDoctor/>

			{/* This be main screen */}
			<Flex bg='white' minHeight='100vh' maxHeight='100vh' flex='1' p={5} pt={10} direction='column'>
                    <Heading color="teal.700" mt={3}> Jaggu's responses for module 1</Heading>

                    <Divider borderColor='gray.600' mb={2}/>

                    <VStack overflowY = "auto" flex='1' w='100%' minW='100%' align='left' divider={<StackDivider borderColor='gray.200' gap={2} mr={2} mt={2} />}>
						<Response qno={1} question="question" response="this be patients response"/>
						<Response qno={1} question="question" response="this be patients response"/>
						<Response qno={1} question="question" response="this be patients response"/>
						<Response qno={1} question="question" response="this be patients response"/>
						<Response qno={1} question="question" response="this be patients response"/>
						<Response qno={1} question="question" response="this be patients response"/>
						<Response qno={1} question="question" response="this be patients response"/>
						<Response qno={1} question="question" response="this be patients response"/>
                    </VStack> 
                </Flex>
            {/* </Box> */}
			
		</Flex>
	</div>);
	
}

export default FormResponse;