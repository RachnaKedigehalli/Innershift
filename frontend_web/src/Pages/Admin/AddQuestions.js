import { Flex, Grid, GridItem, Button, ButtonGroup, Image, Text, Box, VStack, NumberInput, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, HStack, StackDivider, Heading, Input, Center, form, NumberInputStepper } from '@chakra-ui/react'
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

import react, {useState} from 'react';

import { useNavigate, useLocation, Form, } from 'react-router-dom'



function AddQuestions() {
	const navigate = useNavigate();
	const location = useLocation();

	const dummyFunction = () => {
		console.log("dashboard clicked");
		navigate('/dummyloc', {
			// state: location.state
		})
	}
	
    function FormQuestions(qno){
        console.log(qno);
        return(<div>
            {/* <Heading as='h4' size='md'> <Text align='left'>Question {qno.qno} </Text></Heading> */}
            <FormControl>
                <FormLabel> <Text> Question {qno.qno} Description</Text> </FormLabel>
                <Input type='text'/>
            </FormControl>
        </div>);
    }

	function QuestionsForm(number){

		
		const clickAddTask = () => {

		}
        console.log(number);

        var questions = [];
        
        for(var i=1; i<=number.number; i++){
            console.log(i);
            questions.push(<FormQuestions key={i} qno={i}/>)
        }

        console.log(1, questions);
		return (<form>
            {questions}

              {/* <QuestionElement/> */}

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


					<Box w='50%' color='teal.700' padding={3} align='center'>
						<QuestionsForm number={5}/>
					</Box>
					
					
				</VStack>
			</Box>

		</Flex>
	</div>);

}

export default AddQuestions;