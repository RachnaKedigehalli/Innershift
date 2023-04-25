import { Flex, Grid, GridItem, Button, ButtonGroup, Image, Text, Box, VStack, HStack, StackDivider, Heading, Input, Card, CardHeader, CardBody } from '@chakra-ui/react'
import SideDoctor from "../../Components/SideDoctor";
import { DESKTOP_BG_LIGHT} from "../../Constants";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate, useLocation, } from 'react-router-dom'
import { useEffect,useState} from 'react';
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
			<Card bg={DESKTOP_BG_LIGHT}>
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
						<ButtonGroup variant='solid' spacing={2} w='flex' align='center'>
							<Button bg='teal.700' color='white' onClick={() => clickChat(patientId,consultationId,name)} size='md'>Chat</Button>
							<Button bg='teal.700' color='white' onClick={() => clickModule(patientId,consultationId,name)} size='md'>View Patient</Button>
							<Button bg='teal.700' color='white' onClick={() => assignModule(patientId,consultationId,name)} size='md'>Assign Modules</Button>
						</ButtonGroup>
					</VStack>
				</CardBody>

			</Card>
		</div>);
	}

	const RequestPatientCard = ({ name, photo, desc,consultationId,status}) => {
		return (<div>
			<Card bg={DESKTOP_BG_LIGHT}>
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


	return(<div> 
		<Flex>

			{/* This be side nav bar */}
			<SideDoctor/>

			{/* This be main screen */}
			<Box bg='white' minHeight='100vh' w='80%' ml='20%'>
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
						{allPatients.map((item,index)=>{
							return(
								item.status == true?
								<GridItem>
										<PatientCard name={item.firstName + " " + item.lastName} desc={item.gender} key={index} patientId={item.patientId} consultationId={item.consultationId}/>
								</GridItem>:
								<></>
							)
                        })}
					</Grid>

					{/* <Spacer /> */}
					{/* Request header */}
					{
						state.role === 'DOCTOR'?
							<Heading ml={10}> <Text color='teal.700' align='left'> Pending Requests </Text></Heading>:
							<></>

					}

					{/* Request Cards */}
					<Grid templateColumns='repeat(3, 1fr)' w='flex' gap={6} mx={8} my={3}>
					{allPatients.map((item,index)=>{
							return(
								item.status == false?
								<GridItem>
										<RequestPatientCard name={item.firstName + " " + item.lastName} desc={item.gender} key={index} patientId={item.patientId} consultationId={item.consultationId} status={item.status}/>
								</GridItem>:
								<></>
							)
                        })}
					</Grid>
				</VStack>
			</Box>
			
		</Flex>
	</div>);
	
}

export default DoctorPatients;