import { Flex, Grid, GridItem, Button, ButtonGroup, Image, Text, Box, VStack, HStack, StackDivider, Heading, Input, Card, CardHeader, CardBody } from '@chakra-ui/react'
import SideDoctor from "../../Components/SideDoctor";
import { DESKTOP_BG_LIGHT} from "../../Constants";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate, useLocation, } from 'react-router-dom'



function DoctorPatients(){
	const navigate = useNavigate();
	const location = useLocation();
	const clickChat = () => {
		navigate('/dummyloc', {
			state: location.state
		})
	}

	const clickModule = () => {
		navigate('/dummyloc', {
			state: location.state
		})
	}

	const clickAccept = () => {
		navigate('/dummyloc', {
			state: location.state
		})
	}

	const clickSearch = () => {
		navigate('/dummyloc', {
			state: location.state
		})
	}
	const PatientCard = ({ name, photo, desc }) => {
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
						<Heading> <Text color='teal.700'> {name}</Text> </Heading>
					</HStack>
				</CardHeader>
				<CardBody>
					<VStack w='flex'>
						<Text h={75} color='teal.700' noOfLines={3}> {desc} </Text>
						<ButtonGroup variant='solid' spacing={2} w='flex' align='center'>
							<Button bg='teal.700' color='white' onClick={clickChat} size='md'>Chat</Button>
							<Button bg='teal.700' color='white' onClick={clickModule} size='md'>Module Progress</Button>
						</ButtonGroup>
					</VStack>
				</CardBody>

			</Card>
		</div>);
	}

	const RequestPatientCard = ({ name, photo, desc }) => {
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
						<Heading> <Text color='teal.700'> {name}</Text> </Heading>
					</HStack>
				</CardHeader>
				<CardBody>
					<VStack w='flex'>
						<Text h={50} color='teal.700' noOfLines={2}> {desc} </Text>
						<Button bg='teal.700' color='white' onClick={clickAccept} size='md'>Accept</Button>

					</VStack>
				</CardBody>

			</Card>
		</div>);
	}

	const EmptyPatient = () => {
		return <PatientCard name="Patient Name" desc="jasdfb sfbasbfs asfbsbdf sfbsbfs fsjvbfusdf sfugsi sfbsibf rfbidbfsk jasdfb sfbasbfs asfbsbdf sfbsbfs fsjvbfusdf sfugsi sfbsibf rfbidbfskjasdfb sfbasbfs asfbsbdf sfbsbfs fsjvbfusdf sfugsi sfbsibf rfbidbfsk" />;
	}

	const EmptyRequestPatient = () => {
		return <RequestPatientCard name="Patient Name" desc="jasdfb sfbasbfs asfbsbdf sfbsbfs fsjvbfusdf sfugsi sfbsibf rfbidbfsk jasdfb sfbasbfs asfbsbdf sfbsbfs fsjvbfusdf sfugsi sfbsibf rfbidbfskjasdfb sfbasbfs asfbsbdf sfbsbfs fsjvbfusdf sfugsi sfbsibf rfbidbfsk" />;
	}

	return(<div> 
		<Flex>

			{/* This be side nav bar */}
			<SideDoctor/>

			{/* This be main screen */}
			<Box bg={DESKTOP_BG_LIGHT} minHeight='100vh' w='80%' ml='20%'>
				<VStack flexDirection='column' align='left' margin={4} mt={10} divider={<StackDivider borderColor='gray.200' />}>
					
					{/* existing patients heading */}
					<Grid templateColumns='repeat(7, 1fr)' w='flex' gap={6} margin={3}>
						<GridItem colSpan={2} ml={7}>
							<Heading color='teal.700'>Existing Patients</Heading>
						</GridItem>

						<GridItem colSpan={4}>
							<Input placeholder='SEARCH'></Input>
						</GridItem>

						<GridItem align='right' mr={10}>
							<Button
								onClick={clickSearch}
								bg="teal.700"
								color='white'
								size="md"
								// style={{ color: "black" }}
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
					<Heading ml={10}> <Text color='teal.700' align='left'> Pending Requests </Text></Heading>

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

export default DoctorPatients;