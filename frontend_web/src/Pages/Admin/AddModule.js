import { Flex, Grid, GridItem, Button, ButtonGroup, Image, Text, Box, VStack, HStack, StackDivider, Heading, Input, Center, form } from '@chakra-ui/react'
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

import { useNavigate, useLocation, } from 'react-router-dom'



function AddModule() {
	const navigate = useNavigate();
	const location = useLocation();

	const dummyFunction = () => {
		console.log("dashboard clicked");
		navigate('/dummyloc', {
			// state: location.state
		})
	}

	const clickEditModule = () => {

	}


	return (<div>
		<Flex>

			{/* This be side nav bar */}
			<SideAdmin />

			{/* This be main screen */}
			<Box bg={DESKTOP_BG_LIGHT} minHeight='100vh' w='80%' ml='20%'>
				<VStack flexDirection='column' align='left' margin={4} mt={10}>
					<Heading> <Text color='teal.700' ml={3} mt={3}> Add Module </Text> </Heading>

					<Box w='50%' color='teal.700' padding={3}>
						<form method='POST'>
							<FormControl>
								<FormLabel>Module Name</FormLabel>
								<Input type='text' />
							</FormControl>
							<FormControl mt={3}>
								<FormLabel> Description</FormLabel>
								<Input type='text' />
							</FormControl>
						</form>
					</Box>
					
					
				</VStack>
			</Box>

		</Flex>
	</div>);

}

export default AddModule;