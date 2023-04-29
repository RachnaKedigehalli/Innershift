import { Flex, Grid, GridItem, Button, ButtonGroup, Image, Text, Box, VStack, HStack, StackDivider, Heading, Input, Card, CardHeader, CardBody, useDisclosure, AlertDialog, AlertDialogHeader, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogFooter, FormControl  } from '@chakra-ui/react'
import SideDoctor from "../../Components/SideDoctor";
import { DESKTOP_BG_LIGHT} from "../../Constants";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate, useLocation, } from 'react-router-dom'
import React, { useEffect,useState} from 'react';
import axios from 'axios'
import { useStateValue } from '../../StateProvider'


function DoctorPatients(){
	const navigate = useNavigate();
	const [state, dispatch] = useStateValue();
    const [allPatients, setAllPatients] = useState([]);
	const [render,setRender] = useState(0) 
	 

	useEffect(()=>{
	
        const auth = {
            headers: {
                Authorization: `Bearer ${state.adminToken}`
            }
        }
		
		const details = {
			doctorId: state.id
		}

		if(state.role === 'DOCTOR'){
			axios.post('http://localhost:8080/api/v1/app/getPatientsByDoctor',details,auth)
			.then(response=>{
				setAllPatients(response.data)
				console.log(response.data)
			})
		}else{
			axios.get('http://localhost:8080/api/v1/app/getAllPatients',auth)
			.then(response=>{
				setAllPatients(response.data)
				console.log(response.data)
			})
		}
        
		
    },[render])

	const clickChat = (id,consultationId,name) => {
		navigate('/doctor/chat',{
			state:{
				id:id,
				consultationId:consultationId,
				name:name
			}
		})
	}

	const clickDiagnosis = (consultationId,name) => {
		navigate("/doctor/diagnosis",
		{
			state:{
				consultationId:consultationId,
				name:name
			}
		})
	}

	const clickModule = (id,consultationId,name) => {
		navigate('/doctor/viewpatient',{
			state:{
				id:id,
				consultationId:consultationId,
				name:name
			}
		})
	}

	const assignModule = (id,consultationId,name) => {
		navigate('/doctor/assignmodules',{
			state:{
				id:id,
				consultationId:consultationId,
				name:name
			}
		})
	}

	const clickAccept = (consultationId,status) => {
		const auth = {
            headers: {
                Authorization: `Bearer ${state.adminToken}`
            }
        }
		
		const details = {
			consultationId: consultationId,
			status:status
		}

        axios.post('http://localhost:8080/api/v1/app/acceptConsultation',details,auth)
        .then(response=>{
			console.log(response.data)
			setRender(render+1)
        })
		
	}

	const clickSearch = () => {
		navigate('/dummyloc')
	}
	const PatientCard = ({ name, photo, desc, patientId,consultationId}) => {
		return (<div>
			<Card bg={DESKTOP_BG_LIGHT} maxW='40vh' minW='40vh'>
				<CardHeader>
					<HStack>
						<Image
							src='/default_user.jpg'
							alt='Picture'
							borderRadius='full'
							w='20%'
						/>
						<Heading> <Text color='teal.700' noOfLines={1}> {name}</Text> </Heading>
					</HStack>
				</CardHeader>
				<CardBody>
					<VStack w='flex'>
						<Text h={75} color='teal.700' noOfLines={3}> {desc} </Text>
						<VStack w='100%'>
							<ButtonGroup variant='solid' spacing={2} w='100%' align='center'>
								<Button bg='teal.700' color='white' w='100%' onClick={() => clickChat(patientId,consultationId,name)} size='md'>Chat</Button>
								<Button bg='teal.700' color='white' w='100%' onClick={() => clickDiagnosis(consultationId,name)} size='md'>Diagnosis</Button>
							</ButtonGroup>

							<ButtonGroup variant='solid' spacing={2} w='100%' align='center'>
								<Button bg='teal.700' color='white' w='50%' onClick={() => clickModule(patientId,consultationId,name)} size='md'>View Patient</Button>
								<Button bg='teal.700' color='white' w='50%' onClick={() => assignModule(patientId,consultationId,name)} size='md'>Assign Modules</Button>
							</ButtonGroup>
							
						</VStack>
						
					</VStack>
				</CardBody>

			</Card>
		</div>);
	}

	const RequestPatientCard = ({ name, photo, desc,consultationId,status}) => {
		return (<div>
			<Card bg={DESKTOP_BG_LIGHT} maxW='40vh' minW='40vh'>
				<CardHeader>
					<HStack>
						<Image
							src='/default_user.jpg'
							alt='Picture'
							borderRadius='full'
							w='20%'
						/>
						<Heading> <Text color='teal.700' noOfLines={1}> {name}</Text> </Heading>
					</HStack>
				</CardHeader>
				<CardBody>
					<VStack w='flex'>
						<Text h={50} color='teal.700' noOfLines={2}> {desc} </Text>
						<Button bg='teal.700' color='white' onClick={() => clickAccept(consultationId,true)} size='md'>Accept</Button>
					</VStack>
				</CardBody>
			</Card>
		</div>);
	}

	// Generate Token Component
	const GenerateToken = () => {
		const { isOpen, onOpen, onClose } = useDisclosure()
        const cancelRef = React.useRef();
		const [referral, setReferral] = useState("");

		function closeAll(){
			onClose();
			onClose();
		}

		const onGenerateToken = ()=>{
			console.log("Hi")
			const auth = {
				headers: {
					Authorization: `Bearer ${state.adminToken}`
				}
			}
			
			const details = {
				doctorId: state.id
			}
	
			axios.post('http://localhost:8080/api/v1/app/getReferralByDoctor',details,auth)
			.then(response=>{
				setReferral(response.data.referral)
				console.log(response.data.referral)
				onOpen(); 
			})
			
		}

		const DisplayCode = () => {
			const { isOpen, onOpen, onClose } = useDisclosure()
			const cancelRef = React.useRef();
			return (
				<>
					<Button bg='teal.700' color='white'  onClick={onOpen} ml={3}>
						Confirm
					</Button>
		
					<AlertDialog
						isOpen={isOpen}
						leastDestructiveRef={cancelRef}
						onClose={onClose}
					>
						<AlertDialogOverlay>
							<AlertDialogContent>
								<AlertDialogHeader fontSize='lg' fontWeight='bold'>
									<Text color='teal.700'> Token Generated </Text>
								</AlertDialogHeader>
		
								<AlertDialogBody>
									<Text  color='teal.700'>Referral Code: {referral}</Text>
								</AlertDialogBody>
		
								<AlertDialogFooter>
									<Button bg='teal.700' color='white' onClick={closeAll} ml={3}>
										Done
									</Button>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialogOverlay>
					</AlertDialog>
				</>
			)
		}

        return (
            <>
                <Button flex='1' ml={2} bg='teal.700' w='100%' color='white' align='center'  onClick={onGenerateToken}>
                    Generate Referral
                </Button>
    
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                <Text color='teal.700'> Generate Referral</Text>
                            </AlertDialogHeader>
    
                            <AlertDialogBody>
									<Text color='teal.700'>The generated token is unique. Are you sure you want to view the referral</Text>
                            </AlertDialogBody>
    
                            <AlertDialogFooter>
                                <Button bg='gray.200' color='teal.700' onClick={onClose} ml={3}>
                                    Cancel
                                </Button>
                                <DisplayCode/>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </>
        )
	}
    


	return(<div> 
		<Flex>

			{/* This be side nav bar */}
			<SideDoctor/>

			{/* This be main screen */}
			<Box bg='white' minHeight='100vh' flex='1' ml={5}>
				<VStack flexDirection='column' align='left' margin={4} mt={10} divider={<StackDivider borderColor='gray.200' />}>
					
					{/* existing patients heading */}
					<Grid templateColumns='repeat(8, 1fr)' w='flex' gap={3} mt={3}>
						<GridItem colSpan={2} >
							<Heading color='teal.700'>Existing Patients</Heading>
						</GridItem>

						<GridItem colSpan={4}>
							<Input placeholder='SEARCH'></Input>
						</GridItem>

						<GridItem >
							<Button
								onClick={clickSearch}
								bg="teal.700"
								color='white'
								w='100%'
								// style={{ color: "black" }}
							>
								<FontAwesomeIcon
									icon={faCirclePlus}
									style={{ marginRight: "0.5em" }}
								/>{" "}
								Search
							</Button>
						</GridItem>
						<GridItem mr={5} >
							<GenerateToken/>
						</GridItem>
					</Grid>

					{/* Existing patients cards */}
					{/* <Grid templateColumns='repeat(3, 1fr)' w='flex' gap={6} mx={8} my={3}> */}
					<HStack overflowX='auto'>
						{allPatients.map((item,index)=>{
							return(
								item.status == true?
								<PatientCard name={item.firstName + " " + item.lastName} desc={item.gender} key={index} patientId={item.patientId} consultationId={item.consultationId}/>
								:
								<></>
							)
                        })}
					</HStack>
				

					{/* <Spacer /> */}
					{/* Request header */}

					<Heading > <Text color='teal.700' align='left'> Pending Requests </Text></Heading>:

					{/* Request Cards */}
					<HStack overflowX='auto'>
					{allPatients.map((item,index)=>{
							return(
								item.status == false?
								
										<RequestPatientCard  name={item.firstName + " " + item.lastName} desc={item.gender} key={index} patientId={item.patientId} consultationId={item.consultationId} status={item.status}/>
								:
								<></>
							)
                        })}
					</HStack>
				</VStack>
			</Box>
			
		</Flex>
	</div>);
	
}

export default DoctorPatients;