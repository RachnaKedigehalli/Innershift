import { Flex, Grid, GridItem, Button, ButtonGroup, Image, Text, Box, VStack, NumberInput, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, HStack, StackDivider, Heading, Input, Center, form, NumberInputStepper, Radio, RadioGroup } from '@chakra-ui/react'
import SideAdmin from "../../Components/SideAdmin";
import { DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM } from "../../Constants";

import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
} from '@chakra-ui/react'

import react, {useState} from 'react';

import { useNavigate, useLocation, } from 'react-router-dom'



function AddModule() {
	const navigate = useNavigate();
	const location = useLocation();

	function AddModuleForm(){

		const [moduleName, setModuleName] = useState('');
		const [moduleDescription, setModuleDescription] = useState('');
		const [numberOfQuestions,setNumberOfQuestions] = useState(0)

		const clickAddTask = () =>{
			const module = {
				title: moduleName, 
				description:moduleDescription,
			}
			console.log(module)
			navigate('/admin/addquestions', {
				state:module
			});
		}

		const handleChangeModuleName = (event) => setModuleName(event.target.value); 
		const handleChangeModuleDescription = (event) => setModuleDescription(event.target.value);
		const handleChangeNumberOfQuestions = (event) => setNumberOfQuestions(event);

		return (<form>
			<FormControl>
				<FormLabel>Module Name</FormLabel>
				<Input type='text' value={moduleName} onChange={handleChangeModuleName}/>
			</FormControl>
			<FormControl mt={3}>
				<FormLabel> Description</FormLabel>
				<Input type='text' value={moduleDescription} onChange={handleChangeModuleDescription}/>
			</FormControl>
			{/* <FormControl mt={3}>
				<FormLabel>Number of questions</FormLabel>
				<NumberInput max={50} min={1} onChange={handleChangeNumberOfQuestions}>
					<NumberInputField />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
			</FormControl> */}

			<Button onClick={clickAddTask} align='center' bg='teal.700' color='white' m={3}> Add Questions </Button>
		</form>);
	}


	return (<div>
		<Flex>

			{/* This be side nav bar */}
			<SideAdmin />

			{/* This be main screen */}
			<Box bg={DESKTOP_BG_LIGHT} minHeight='100vh' w='80%' ml='20%'>
				<VStack flexDirection='column' align='left' margin={4} mt={10}>
					<Heading> <Text color='teal.700' ml={3} mt={3}> Add Module </Text> </Heading>


					<Box w='50%' color='teal.700' padding={3} align='center'>
						<AddModuleForm/>
					</Box>
					
					
				</VStack>
			</Box>

		</Flex>
	</div>);

}

export default AddModule;