import { Flex, Card, Button, RadioGroup, Radio,Text, Box, VStack,  HStack,  Heading, Input, CardBody, extendTheme, withDefaultVariant, ButtonGroup } from '@chakra-ui/react'
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
import { useStateValue } from '../../StateProvider'
import axios from 'axios';



function AddQuestions() {
	const navigate = useNavigate();
	const location = useLocation();
	const [numberOfQuestions,setNumberOfQuestions] = useState(1)
	const [tasks,setQuestions] = useState([])
	const [state,dispatch] = useStateValue();

	const onSubmit = () =>{
		var dict = {...location.state,tasks:tasks}

		const auth = {
            headers: {
                Authorization: `Bearer ${state.adminToken}`
            }
        }

		const details = {
			content: JSON.stringify(dict)
		}

        axios.post('http://localhost:8080/api/v1/app/addModule',details, auth)
            .then(response=>{
                console.log(response.data)
				navigate("/admin/modules")
            })
	}

	useEffect(()=>{
		setQuestions([{
			type:0,
			title:"",
			description:"",
			content:""
		}])
		setNumberOfQuestions(1)
	},[])

	const onTitleChange = (event,qno)=>{
		var temp = tasks
		temp[qno-1].title = event.target.value 
		setQuestions(temp) 
	}

	const onDescriptionChange = (event,qno)=>{
		var temp = tasks
		temp[qno-1].description = event.target.value 
		setQuestions(temp) 
	}

	const handleChangeModuleType = (event,qno) =>{
		var temp = tasks
		temp[qno-1].type = parseInt(event) 
		setQuestions(temp)
	}

	const handleContentChange =  (event,qno)=>{
		var temp = tasks
		temp[qno-1].content = event.target.value 
		setQuestions(temp) 
	}

	const addNewTask = () => {
		setNumberOfQuestions(numberOfQuestions+1)
		var temp = tasks
		temp.push({
			type:0,
			description:"",
			content:""
		})
		setQuestions(temp)
	}
    function FormQuestions(qno){
        return(<Box w = 'flex' m={3} padding={2}>
			<Card bg={DESKTOP_BG_LIGHT}>
				<CardBody color='teal.700'>
					<Heading color='teal.700' align='left' size='lg'>Question {qno.qno} </Heading>
					<FormControl>
						<FormLabel mt={2} m={1}> <Text as='b'> Module Type </Text></FormLabel>
						<RadioGroup onChange={(event) => handleChangeModuleType(event,qno.qno)}>
							<HStack spacing='24px' ml={2}>
								<Radio borderColor='gray.400' colorScheme='teal' value='0'>Form</Radio>
								<Radio borderColor='gray.400' colorScheme='teal' value='1'>Video</Radio>
								<Radio borderColor='gray.400' colorScheme='teal' value='2'>Reading</Radio>
							</HStack>
						</RadioGroup>

						<FormLabel mt={2} m={1}> <Text as='b'> Title</Text> </FormLabel>
						<Input borderColor='gray.400' focusBorderColor='teal.700' type='text' onChange={(event) => onTitleChange(event,qno.qno)}/>

						<FormLabel mt={2} m={1}> <Text as='b'>Description</Text> </FormLabel>
						<Input borderColor='gray.400' focusBorderColor='teal.700' type='text' onChange={(event) => onDescriptionChange(event,qno.qno)}/>

						<FormLabel mt={2} m={1}> <Text as='b'> Content</Text> </FormLabel>
						<Input borderColor='gray.400' focusBorderColor='teal.700' type='text' onChange={(event) => handleContentChange(event,qno.qno)}/>

					</FormControl>
				</CardBody>
			</Card>
		</Box>);
    }

	function QuestionsForm(number){
        var displayQuestions = [];
        
        for(var i=1; i<=number.number; i++){
            displayQuestions.push(<FormQuestions key={i} qno={i}/>)
        }

		return (<form>
            {displayQuestions}
			<ButtonGroup w='50%' align='center'>
				<Button onClick={addNewTask} w='30%' align='center' bg='teal.700' color='white' m={3}>Add Question</Button>
				<Button onClick={onSubmit} w='30%' align='center' bg='teal.700' color='white' m={3}> Submit </Button>
			</ButtonGroup>
			
		</form>);
	}


	return (<div>
		<Flex>

			{/* This be side nav bar */}
			<SideAdmin />

			{/* This be main screen */}
			<Box bg='white' minHeight='100vh' w='80%' ml='20%'>
				<VStack flexDirection='column' align='left' margin={4} mt={10}>
					<Heading> <Text color='teal.700' ml={3} mt={3}> Add Questions </Text> </Heading>
					<Box w='100%' color='teal.700' padding={3} align='center'>
						<QuestionsForm number={numberOfQuestions}/>
					</Box>
					
				</VStack>
			</Box>

		</Flex>
	</div>);

}

export default AddQuestions;