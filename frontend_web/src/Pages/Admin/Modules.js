import { Flex, Grid, GridItem, Button, ButtonGroup, Image, Text, Box, VStack, HStack, StackDivider, Heading, Input, Card, CardHeader, CardBody, Popover, PopoverHeader, PopoverTrigger, Portal, PopoverContent, PopoverArrow, PopoverFooter, PopoverCloseButton, PopoverBody, Center} from '@chakra-ui/react'
import SideAdmin from "../../Components/SideAdmin";
import { DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM } from "../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCirclePlus,
	faHeadphones,
	faBookOpen,
	faCirclePlay,
	faAlignJustify,
	faQuestion
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate, useLocation, } from 'react-router-dom'



function AdminModules() {
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
			return <FontAwesomeIcon icon={faAlignJustify} size="2xl" style={{ color: "#285e61", }} />
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
							<Heading flex={1}> <Text noOdLines={1} color='#285e61'> {name}</Text> </Heading>
						</HStack>
						<Text h={75} color='teal.700' noOfLines={3}> {desc} </Text>
						<ButtonGroup variant='solid' spacing={2} w='flex' align='center'>
							<Button bg='teal.700' color='white' onClick={clickEditModule} width='50%'>Edit</Button>
							<Popover>
								<PopoverTrigger>
									<Button width='50%' bg='teal.700' color='white' onClick={clickEditModule}>Delete</Button>
								</PopoverTrigger>
								<Portal>
									<PopoverContent>
										<PopoverArrow />
										{/* <PopoverHeader>Header</PopoverHeader> */}
										<PopoverCloseButton color="teal.700" />
										<PopoverBody>
											<VStack align='center'>
												<Text color="teal.700">This action is irreversible.</Text>
											</VStack>
											<Center>
												<Button bg='teal.700' color='white' align='center'>Confirm</Button>
											</Center>
										</PopoverBody>
										{/* <PopoverFooter>This is the footer</PopoverFooter> */}
									</PopoverContent>
								</Portal>
							</Popover>
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

	return (<div>
		<Flex>

			{/* This be side nav bar */}
			<SideAdmin />

			{/* This be main screen */}
			<Box bg={DESKTOP_BG_LIGHT} minHeight='100vh' w='80%' ml='20%'>
				<VStack flexDirection='column' align='left' margin={4} mt={10} divider={<StackDivider borderColor='gray.200' />}>

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
								onClick={dummyFunction}
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
					<Grid templateColumns='repeat(3, 1fr)' w='flex' gap={6} mx={8} my={3}>
						<GridItem>
							<ModuleCard name="Module 1" desc='jasdfb sfbasbfs asfbsbdf sfbsbfs fsjvbfusdf sfugsi sfbsibf rfbidbfsk' type="form"/>
						</GridItem>
						<GridItem>
							<BasicModuleCard />
						</GridItem>
						<GridItem>
							<BasicModuleCard />
						</GridItem>

					</Grid>
					</Box>
				</VStack>
			</Box>

		</Flex>
	</div>);

}

export default AdminModules;