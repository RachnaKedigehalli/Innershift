import { Flex, Card, Button, RadioGroup, Radio,Text, Box, VStack,  HStack,  Heading, Input, CardBody } from '@chakra-ui/react'
import SideAdmin from "../../Components/SideAdmin";
import { DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM } from "../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
} from '@chakra-ui/react'

import react, {useEffect, useState} from 'react';

import { useNavigate, useLocation, Form, } from 'react-router-dom'




function AddQuestions() {
	const navigate = useNavigate();
	const location = useLocation();
	const [numberOfQuestions,setNumberOfQuestions] = useState(0)
	const [questions,setQuestions] = useState([])

	useEffect(()=>{
		// setNumberOfQuestions(location.state.numberOfQuestions)
		
		// var temp = []
		// for(var i=1; i<=location.state.numberOfQuestions; i++){
        //     temp.push({
		// 		type:0,
		// 		description:"",
		// 		content:""
		// 	})
        // }	
		// setQuestions(temp) 	

		
		var temp = []
		
		temp.push({
			type:0,
			description:"",
			content:""
		})

        setNumberOfQuestions(1)
		setQuestions([{
			type:0,
			title:"",
			description:"",
			content:""
		}])
		
	},[])


	const clickAddTask = () =>{
		var dict = {...location.state,tasks:questions}
		console.log(dict) 

		// axios.post('http://localhost:8080/api/v1/auth/register',credentials)
        //     .then(response=>{
        //         console.log(response.data)
        //         const newDict = {...response.data,adminToken:data.data.token}
        //         navigate("/updatedoctor",{
        //             state:newDict
        //         })
        // })
	}

	const onTitleChange = (event,qno)=>{
		var temp = questions
		temp[qno-1].title = event.target.value 
		setQuestions(temp) 
	}

	const onDescriptionChange = (event,qno)=>{
		var temp = questions
		temp[qno-1].description = event.target.value 
		setQuestions(temp) 
	}

	const handleChangeModuleType = (event,qno) =>{
		var temp = questions
		temp[qno-1].type = parseInt(event) 
		setQuestions(temp)
	}

	const handleContentChange =  (event,qno)=>{
		var temp = questions
		temp[qno-1].content = event.target.value 
		setQuestions(temp) 
	}

	const addNewTask = () => {
		setNumberOfQuestions(numberOfQuestions+1)
		var temp = questions 
		temp.push({
			type:0,
			description:"",
			content:""
		})
	}
    function FormQuestions(qno){
        return(
		
		<div>
			<Card >
				<CardBody color='teal.700'>
					<FormControl>
						<FormLabel>Module Type</FormLabel>
						<RadioGroup onChange={(event) => handleChangeModuleType(event,qno.qno)}>
							<HStack spacing='24px'>
								<Radio value='0'>Form</Radio>
								<Radio value='1'>Video</Radio>
								<Radio value='2'>Reading</Radio>
							</HStack>
						</RadioGroup>

						<FormLabel> <Text> Question {qno.qno} Title</Text> </FormLabel>
						<Input  type='text' onChange={(event) => onTitleChange(event,qno.qno)}/>

						<FormLabel> <Text> Question {qno.qno} Description</Text> </FormLabel>
						<Input  type='text' onChange={(event) => onDescriptionChange(event,qno.qno)}/>

						<FormLabel> <Text> Question {qno.qno} Content</Text> </FormLabel>
						<Input type='text' onChange={(event) => handleContentChange(event,qno.qno)}/>

					</FormControl>
				</CardBody>
			</Card>
        </div>);
    }

	function QuestionsForm(number){
        var questions = [];
        
        for(var i=1; i<=number.number; i++){
            questions.push(<FormQuestions key={i} qno={i}/>)
        }

		return (<form>
            {questions}

			<Button onClick={clickAddTask} align='center' bg='teal.700' color='white' m={3}> Submit </Button>
		</form>);
	}


	return (<div>
		<Flex>

			{/* This be side nav bar */}
			<SideAdmin />

			{/* This be main screen */}
			<Box bg={DESKTOP_BG_LIGHT} minHeight='100vh' w='80%' ml='20%'>
				<VStack flexDirection='column' align='left' margin={4} mt={10}>
					<Heading> <Text color='teal.700' ml={3} mt={3}> Add Questions </Text> </Heading>

					<Button onClick={addNewTask}>Add New</Button>
					<Box w='50%' color='teal.700' padding={3} align='center'>
						<QuestionsForm number={numberOfQuestions}/>
					</Box>
					
				</VStack>
			</Box>

		</Flex>
	</div>);

}

export default AddQuestions;