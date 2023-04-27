import { Flex, Grid, GridItem, Button, ButtonGroup, Text, Box, VStack, HStack, Heading, Input, Card,  CardBody, useDisclosure, AlertDialog, AlertDialogHeader, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogFooter} from '@chakra-ui/react'
import SideAdmin from "../../Components/SideAdmin";
import { DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM } from "../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCirclePlus,
	faHeadphones,
	faBookOpen,
	faCirclePlay,
	faListUl,
	faQuestion
} from "@fortawesome/free-solid-svg-icons";

import React, { useEffect, useState } from 'react';

import { useNavigate, useLocation, } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import axios from 'axios';



function AdminModules() {
	const navigate = useNavigate();
	const [state,dispatch] = useStateValue();
	const [allModules, setAllModules] = useState([]); 

	const clickAddModule = () => {
		console.log("dashboard clicked");
		navigate('/admin/addmodule')
	}

	const clickEditModule = () => {
		console.log("edit clicked");
	}

	useEffect(()=>{
		const auth = {
            headers: {
                Authorization: `Bearer ${state.adminToken}`
            }
        }

        axios.get('http://localhost:8080/api/v1/app/getAllModules', auth)
            .then(response=>{
                const val = response.data; 
				let array = []
				for(let i = 0; i<val.length;i++){
					array.push(JSON.parse(val[i].content))
				}
				setAllModules(array)
            })
	},[])

	function DeleteAlertDialog() {
		const { isOpen, onOpen, onClose } = useDisclosure()
		const cancelRef = React.useRef()

		return (
			<>
				<Button bg='teal.700' color='white' w='50%' onClick={onOpen}>
					Delete
				</Button>

				<AlertDialog
					isOpen={isOpen}
					leastDestructiveRef={cancelRef}
					onClose={onClose}
				>
					<AlertDialogOverlay>
						<AlertDialogContent>
							<AlertDialogHeader fontSize='lg' fontWeight='bold'>
								<Text color='teal.700'> Delete </Text>
							</AlertDialogHeader>

							<AlertDialogBody>
								<Text color='teal.700'> Are you sure? You can't undo this action afterwards. </Text>
							</AlertDialogBody>

							<AlertDialogFooter>
								<Button color='teal.700' ref={cancelRef} onClick={onClose}>
									Cancel
								</Button>
								<Button bg='teal.700' color='white' onClick={onClose} ml={3}>
									Delete
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialogOverlay>
				</AlertDialog>
			</>
		)
	}

	const ModuleIcon = ({type}) => {
		if(type === "audio"){
			return <FontAwesomeIcon icon={faHeadphones} size="2xl" style={{ color: "#285e61", }} />
		}
		if(type === "reading"){
			return <FontAwesomeIcon icon={faBookOpen} size="2xl" style={{ color: "#285e61", }} />
		}
		if (type === "video") {
			return <FontAwesomeIcon icon={faCirclePlay} size="2xl" style={{ color: "#285e61", }} />
		}
		if (type === "form") {
			return <FontAwesomeIcon icon={faListUl} size="2xl" style={{ color: "#285e61", }} />
		}
		return <FontAwesomeIcon icon={faQuestion} size="2xl" style={{ color: "#285e61", }} />
	}
	
	const ModuleCard = ({ name, type, desc }) => {
		return (<div>
			<Card bg={DESKTOP_BG_MEDIUM} h='20%'>
				<CardBody>
					<VStack spacing={3} align='left'>
						<HStack>
							<ModuleIcon type={type} />
							<Heading flex={1}> <Text noOfLines={1} color='#285e61'> {name}</Text> </Heading>
						</HStack>
						<Text h={75} color='teal.700' noOfLines={3}> {desc} </Text>
						<ButtonGroup variant='solid' spacing={2} w='flex' align='center'>
							<Button bg='teal.700' color='white' onClick={clickEditModule} width='50%'>Edit</Button>
							<DeleteAlertDialog/>
						</ButtonGroup>
					</VStack>
					
				</CardBody>
			</Card>
		</div>);
	}
	

	return (<div>
		<Flex>

			{/* This be side nav bar */}
			<SideAdmin />

			{/* This be main screen */}
			<Box bg='white' minHeight='100vh' flex='1'>
				<VStack flexDirection='column' align='left' margin={4} mt={10}>

					{/* Moules heading*/}
					<Grid templateColumns='repeat(6, 1fr)' w='flex' gap={6} margin={3}>
						<GridItem colSpan={1} ml={7}>
							<Heading color='teal.700'>Modules</Heading>
						</GridItem>

						<GridItem colSpan={4}>
							<Input placeholder='SEARCH'></Input>
						</GridItem>

						<GridItem>
							<Button
								onClick={clickAddModule}
								width='100%' bg='teal.700' color='white'
							>
								<FontAwesomeIcon
									icon={faCirclePlus}
									style={{ marginRight: "0.5em" }}
								/>{" "}
								ADD
							</Button>
						</GridItem>
					</Grid>

					{/* Existing patients cards */}
					<Box height="flex" overflowY='auto'>
					<Grid templateColumns='repeat(3, 1fr)' w='flex' gap={2} mx={8} my={3}>
						{allModules.map((item,index)=>{
							return(
								<GridItem key={index}>
									<ModuleCard name={item.title} desc={item.description} type="form"/>
								</GridItem>
							)
                        })}
					</Grid>
					</Box>
				</VStack>
			</Box>

		</Flex>
	</div>);

}

export default AdminModules;