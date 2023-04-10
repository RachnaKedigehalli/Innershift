import { Flex, Grid, GridItem, Button, ButtonGroup, Image, Text, Box, VStack, HStack, StackDivider, Heading, Input, Card, CardHeader, CardBody, useDisclosure, AlertDialog, AlertDialogHeader, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react'
import SideDoctor from "../../Components/SideDoctor";
import { DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM } from "../../Constants";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus, 
    faComments,
    faHeadphones,
	faBookOpen,
	faCirclePlay,
	faListUl,
	faQuestion
} from "@fortawesome/free-solid-svg-icons";

import React from 'react';
import { useNavigate, useLocation, } from 'react-router-dom'



function ViewPatient(){
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

    function UnAssignDialog() {
		const { isOpen, onOpen, onClose } = useDisclosure()
		const cancelRef = React.useRef()

		return (
			<>
				<Button bg='teal.700' color='white' w='50%' onClick={onOpen}>
					Unassign
				</Button>

				<AlertDialog
					isOpen={isOpen}
					leastDestructiveRef={cancelRef}
					onClose={onClose}
				>
					<AlertDialogOverlay>
						<AlertDialogContent>
							<AlertDialogHeader fontSize='lg' fontWeight='bold'>
								<Text color='teal.700'> Confirm Action </Text>
							</AlertDialogHeader>

							<AlertDialogBody>
								<Text color='teal.700'> Are you sure? You can't undo this action afterwards. </Text>
							</AlertDialogBody>

							<AlertDialogFooter>
								<Button color='teal.700' ref={cancelRef} onClick={onClose}>
									Cancel
								</Button>
								<Button bg='teal.700' color='white' onClick={onClose} ml={3}>
									Unassign
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
	
	const ModuleCard = ({ name, type, desc, status }) => {
		return (<div>
			<Card bg={DESKTOP_BG_MEDIUM} h='20%'>
				<CardBody>
					<VStack spacing={3} align='left'>
						<HStack>
							<ModuleIcon type={type} />
							<Heading flex={1}> <Text noOdLines={1} color='#285e61'> {name}</Text> </Heading>
						</HStack>
						<Text h={75} color='teal.700' noOfLines={3}> {desc} </Text>
						<ButtonGroup variant='solid' spacing={2} w='flex' align='center'>
							<Button bg='teal.700' color='white' width='50%'>Review</Button>
							<UnAssignDialog/>
							{/* <Button bg='teal.700' color='white' onClick={clickEditModule} size='md'>Delete</Button> */}
						</ButtonGroup>
					</VStack>
					
				</CardBody>
			</Card>
		</div>);
	}

	const BasicModuleCard = () => {
		return <ModuleCard name="Module Name" desc="jasdfb sfbasbfs asfbsbdf sfbsbfs fsjvbfusdf sfugsi sfbsibf rfbidbfsk jasdfb sfbasbfs asfbsbdf sfbsbfs fsjvbfusdf sfugsi sfbsibf rfbidbfskjasdfb sfbasbfs asfbsbdf sfbsbfs fsjvbfusdf sfugsi sfbsibf rfbidbfsk" type="unknown" />;
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
							{/* <Input placeholder='SEARCH'></Input> */}
						</GridItem>

						<GridItem align='right' mr={10}>
							<Button
								onClick={clickSearch}
								bg="teal.700"
                                color='white'
								size="md"
                                w='100%'
								// style={{ color: "black" }}
							>
								<FontAwesomeIcon
									icon={faComments}
									style={{ marginRight: "0.5em" }}
								/>{" "}
								Chat
							</Button>
						</GridItem>
					</Grid>

					{/* Existing patients cards */}
					<HStack w='100%'>
                        <Box w = '50%'>
                            <Grid templateColumns='repeat(2, 1fr)' m={3} gap={3}>
                                <GridItem> 
                                    <BasicModuleCard/>
                                </GridItem>
                                <GridItem> 
                                    <BasicModuleCard/>
                                </GridItem>
                                <GridItem> 
                                    <BasicModuleCard/>
                                </GridItem>
                            </Grid>
                        </Box>
                    </HStack>
				</VStack>
			</Box>
			
		</Flex>
	</div>);
	
}

export default ViewPatient;