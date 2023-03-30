import { Flex, Grid, GridItem, Center, Button, ButtonGroup, Image, Spacer, Text, Box, VStack, HStack, StackDivider, Heading, Input, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
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

function PatientCard({name, photo, desc}){
	return(<div>
		<Card bg={DESKTOP_BG_LIGHT} h='20%'>
			<CardHeader>
				<HStack>
					<Image
						src='/default_user.jpg'
						alt='Picture'
						borderRadius='full'
						w='20%'
					/>
					<Heading> <Text color='teal'> {name}</Text> </Heading>
				</HStack>
			</CardHeader>
			<CardBody>
				<VStack w='flex'>
					<Text  h={75} color='teal' noOfLines={3}> {desc} </Text>
					<ButtonGroup variant='solid' spacing={2} w='flex' align='center'>
						<Button bg='teal' color='white' size='md'>Chat</Button>
						<Button bg='teal' color='white' size='md'>Module Progress</Button>
					</ButtonGroup>
				</VStack>
			</CardBody>

		</Card>
	</div>);
}

function RequestPatientCard({ name, photo, desc }) {
	return (<div>
		<Card bg={DESKTOP_BG_LIGHT} h='20%'>
			<CardHeader>
				<HStack>
					<Image
						src='/default_user.jpg'
						alt='Picture'
						borderRadius='full'
						w='20%'
					/>
					<Heading> <Text color='teal'> {name}</Text> </Heading>
				</HStack>
			</CardHeader>
			<CardBody>
				<VStack w='flex'>
					<Text h={50} color='teal' noOfLines={2}> {desc} </Text>
						<Button bg='teal' color='white' size='md'>Accept</Button>
					
				</VStack>
			</CardBody>

		</Card>
	</div>);
}

function EmptyPatient(){
	return <PatientCard name="Patient Name" desc="jasdfb sfbasbfs asfbsbdf sfbsbfs fsjvbfusdf sfugsi sfbsibf rfbidbfsk jasdfb sfbasbfs asfbsbdf sfbsbfs fsjvbfusdf sfugsi sfbsibf rfbidbfskjasdfb sfbasbfs asfbsbdf sfbsbfs fsjvbfusdf sfugsi sfbsibf rfbidbfsk"/>;
}

function EmptyRequestPatient() {
	return <RequestPatientCard name="Patient Name" desc="jasdfb sfbasbfs asfbsbdf sfbsbfs fsjvbfusdf sfugsi sfbsibf rfbidbfsk jasdfb sfbasbfs asfbsbdf sfbsbfs fsjvbfusdf sfugsi sfbsibf rfbidbfskjasdfb sfbasbfs asfbsbdf sfbsbfs fsjvbfusdf sfugsi sfbsibf rfbidbfsk" />;
}

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
				<VStack flexDirection='column' align='left' margin={4} mt={10} divider={<StackDivider borderColor='gray.200' />}>
					
					{/* existing patients heading */}
					<Grid templateColumns='repeat(7, 1fr)' w='flex' gap={6} margin={3}>
						<GridItem colSpan={2} ml={7}>
							<Heading color='teal'>Existing Patients</Heading>
						</GridItem>

						<GridItem colSpan={4}>
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

					{/* Existing patients cards */}
					<Grid templateColumns='repeat(3, 1fr)' w='flex' gap={6} mx={8} my={3}>
						<GridItem>
							<PatientCard name="Avantika" desc='jasdfb sfbasbfs asfbsbdf sfbsbfs fsjvbfusdf sfugsi sfbsibf rfbidbfsk'/>
						</GridItem>
						<GridItem>
							<EmptyPatient/>
						</GridItem>
						<GridItem>
							<EmptyPatient />
						</GridItem>
						
					</Grid>

					{/* <Spacer /> */}
					{/* Request header */}
					<Heading ml={10}> <Text color='teal' align='left'> Pending Requests </Text></Heading>

					{/* Request Cards */}
					<Grid templateColumns='repeat(3, 1fr)' w='flex' gap={6} mx={8} my={3}>
						<GridItem>
							<RequestPatientCard name="Avantika" desc='jasdfb sfbasbfs asfbsbdf sfbsbfs fsjvbfusdf sfugsi sfbsibf rfbidbfsk' />
						</GridItem>
						<GridItem>
							<EmptyRequestPatient />
						</GridItem>
						<GridItem>
							<EmptyRequestPatient />
						</GridItem>

					</Grid>
				</VStack>
			</Box>
			
		</Flex>
	</div>);
	
}

export default Doctor_Patients;