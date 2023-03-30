import { Flex, Grid, GridItem, Center, Button, Image, Spacer, Box, VStack, Heading, Input} from '@chakra-ui/react'
import Navbar from "../../Components/Navbar";
import { DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM, DARK_OLIVE, LIGHT_GREEN, DARK_GREEN,} from "../../Constants";
import logo from "../../Assets/Logo/Logo_name.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartPie,
    faDatabase,
    faStethoscope,
    faCirclePlus,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";


function Doctor_Patients(){
	return(<div> 
		<Flex>

			{/* This be side nav bar */}
			<Box bg={DESKTOP_BG_MEDIUM} w='20%' minHeight='100vh'>
				<VStack spacing={3} align='center'>
						<Image src={logo} h='9em' />
						<Box>

						</Box>
						<Button ml='5em' w='12em' colorScheme='teal' variant='solid'>
							<FontAwesomeIcon icon={faChartPie} style={{ marginRight: "0.5em" }} />  Dashboard
						</Button>

						<Button ml='5em' mt='2em' w='12em' colorScheme='teal' variant='solid'>
							<FontAwesomeIcon icon={faStethoscope} style={{ marginRight: "0.5em" }} />  Doctors
						</Button>

						<Button ml='5em' mt='2em' w='12em' colorScheme='teal' variant='solid'>
							<FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5em" }} />  Modules
						</Button>

					

				</VStack>
			</Box>

			{/* This be main screen */}
			<Box bg={DESKTOP_BG_LIGHT} flex='1' minHeight='100vh'>
				<Flex flexDirection='column'>
					{/* Top padding */}
					<Box h={10}>

					</Box>
					
					<Grid templateColumns='repeat(4, 1fr)' w='flex' gap={6} margin={3}>
						<GridItem colSpan={1} ml={1}>
							<Heading>Existing Patients</Heading>
						</GridItem>

						<GridItem colSpan={2}>
							<Input placeholder='SEARCH'></Input>
						</GridItem>

						<GridItem align='right' mr={10}>
							<Button
								colorScheme="teal"
								size="md"
								style={{ color: "black" }}
							>
								<FontAwesomeIcon
									icon={faCirclePlus}
									style={{ marginRight: "0.5em" }}
								/>{" "}
								Search
							</Button>
						</GridItem>
					</Grid>

					<Box h='flex' bg='teal'></Box>
				</Flex>
			</Box>
			
		</Flex>
	</div>);
	
}

export default Doctor_Patients;