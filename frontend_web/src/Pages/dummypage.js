import { Flex, Grid, GridItem, Button, ButtonGroup, Image, Text, Box, VStack, HStack, StackDivider, Heading, Input, Card, CardHeader, CardBody } from '@chakra-ui/react'
import SideDoctor from "../../Components/SideDoctor";
import { DESKTOP_BG_LIGHT } from "../../Constants";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";





function Dummypage() {
	
	return (<div>
		<Flex>

			{/* This be side nav bar */}
			<SideDoctor />

			{/* This be main screen */}
			<Box bg={DESKTOP_BG_LIGHT} minHeight='100vh' w='80%' color='teal' ml='20%'>
				<Heading> This is a dummy page</Heading>
			</Box>

		</Flex>
	</div>);

}

export default Dummypage;