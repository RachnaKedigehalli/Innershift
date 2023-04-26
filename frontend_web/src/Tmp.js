import { Flex, Grid, GridItem, Button, ButtonGroup, Text, Box, VStack, HStack, StackDivider, Heading, Card, CardBody, useDisclosure, AlertDialog, AlertDialogHeader, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogFooter, FormControl, Input } from '@chakra-ui/react'
import SideDoctor from "./Components/SideDoctor";

import { DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM } from "./Constants";
import axios from 'axios'

import styled from "@emotion/styled";


import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import 'react-calendar/dist/Calendar.css';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    // faCirclePlus, 
    faComments,
    faHeadphones,
	faBookOpen,
	faCirclePlay,
	faListUl,
	faQuestion
} from "@fortawesome/free-solid-svg-icons";

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, } from 'react-router-dom'
import { useStateValue } from './StateProvider'

import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-calendar/dist/Calendar.css';

import RescheduleModule from './RescheduleModule';
function Tmp(){
	// add styles as css
	const StyleWrapper = styled.div`
	.fc-button.fc-prev-button, .fc-button.fc-next-button, .fc-button.fc-button-primary{
		background: #285E61;
		background-image: none;
		border: #285E61;
	}
	.portlet.calendar .fc-event .fc-time {
		color: #285E61;
	}
	.fc .fc-toolbar-title {
		color: #285E61;
	}
	.fc-day{
		color: #285E61;
	}
	`
	const navigate = useNavigate();
	const location = useLocation(); 

	// const [state,dispatch] = useStateValue();
    // const [patientMoods, setPatientMoods]  = useState([]); 
	// const [allModules, setAllModules] = useState([]);

	const clickChat = (id,consultationId,name) => {
		// navigate('/doctor/chat',{
		// 	state:{
		// 		id:id,
		// 		consultationId:consultationId,
		// 		name:name
		// 	}
		// })
	}

	const onClickReschedule = (id,index)=>{
		// navigate('/doctor/reorder',{
		// 	state:{
		// 		id:id,
		// 		module:allModules[index]
		// 	}
		// })
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

    const [date,updateDate] = useState("hi"); 
    const RescheduleDialog = () => {
        const { isOpen, onOpen, onClose } = useDisclosure()
        const cancelRef = React.useRef();
        // const [date,updateDate] = useState(location.state.module.scheduled);

        const completeReschedule = () =>{
            console.log(date)
            // const auth = {
            //     headers: {
            //         Authorization: `Bearer ${state.adminToken}`
            //     }
            // }
    
            // const dict = {
            //     moduleAssignedId:location.state.module.moduleAssignedId, 
            //     scheduled:date 
            // }
    
            // axios.post('http://localhost:8080/api/v1/app/updateOrder',dict, auth)
            //     .then(response=>{
            //         console.log(response.data)
            // })
        }
        
         
        return (
            <>
                <Button flex='1' ml={2} bg='teal.700' color='white' align='center'  onClick={onOpen}>
                    Test
                </Button>
    
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                <Text color='teal.700'> Reschedule Date </Text>
                            </AlertDialogHeader>
    
                            <AlertDialogBody>
                                {/* <Text color='teal.700'>Some text here</Text> */}
                                <RescheduleModule/>
                                {/* <DatePicker onChange={(event)=>updateDate(event)} minDate={new Date()} value={date} /> */}
                                {/* <Box minHeight={260} bg='blue.100'>aaa </Box> */}
                            </AlertDialogBody>
    
                            <AlertDialogFooter>
                                <Button bg='gray.200' color='teal.700' onClick={onClose} ml={3}>
                                    Cancel
                                </Button>
                                <Button bg='teal.700' color='white' onClick={completeReschedule} ml={3}>
                                    Confirm
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </>
        )
    }

	

	const GenerateToken = () => {
		const { isOpen, onOpen, onClose } = useDisclosure()
        const cancelRef = React.useRef();

		function closeAll(){
			onClose();
			onClose();
		}

		const DisplayCode = () => {
			const { isOpen, onOpen, onClose } = useDisclosure()
			const cancelRef = React.useRef();
			return (
				<>
					<Button bg='teal.700' color='white' onClick={onOpen} ml={3}>
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
									<Text color='teal.700'> Note: This code can be used only once and only against the email provided. </Text>
								</AlertDialogBody>
		
								<AlertDialogFooter>
									{/* <Button bg='gray.200' color='teal.700' onClick={onClose} ml={3}>
										Cancel
									</Button> */}
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
                <Button flex='1' ml={2} bg='teal.700' color='white' align='center'  onClick={onOpen}>
                    Generate Token
                </Button>
    
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                <Text color='teal.700'> Generate Token </Text>
                            </AlertDialogHeader>
    
                            <AlertDialogBody>
                                <FormControl>
									<Text color='teal.700'> Enter Patient's Email:</Text>
									<Input color='teal.700' borderColor='teal.700' focusBorderColor='teal.700'/>
								</FormControl>
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
    
	
	const ModuleCard = ({ name, type, desc, date,index}) => {
		return (<Card bg={DESKTOP_BG_MEDIUM} >
            <CardBody bg={DESKTOP_BG_MEDIUM}>
                <VStack spacing={3} align='left'>
                    {/* <HStack> */}
                        {/* <ModuleIcon type={type} /> */}
                        <Heading flex={1}> <Text noOfLines={1} color='#285e61'> {name}</Text> </Heading>
                    {/* </HStack> */}
                    <Text h={75} bg='blue.100' color='teal.700' noOfLines={3}> {desc} </Text>
                    <Flex>
                        <Text> To be unlocked on: </Text>
                        <Text ml={1} bg='yellow' color='teal.700'>  {date} </Text>
                        {/* <Button flex='1' ml={2} onClick={()=>onClickReschedule(location.state.id,index)} bg='teal.700' color='white' align='center' >Edit</Button> */}
                        <RescheduleDialog/>
                    </Flex>
                    {/* <Text h={10} bg='yellow' color='teal.700' noOfLines={3}> To be unlocked on: {date} </Text> */}
                    {/* <ButtonGroup variant='solid' spacing={2} w='flex' align='center'> */}
                        {/* <Button onClick={()=>onClickReschedule(location.state.id,index)} bg='teal.700' color='white' align='center' >Reschedule</Button> */}
                        {/* <Button onClick={()=>onClickReschedule(location.state.id,index)} bg='teal.700' color='white' width='50%'>Reschedule</Button> */}
                    {/* </ButtonGroup> */}
                </VStack>
                
            </CardBody>
        </Card>);
	}


    function getMoodString(val){
        if(val === 1){ return "Energetic" };
        if(val === 2){ return "Happy" };
        if(val === 3){ return "Calm" };
        if(val === 4){ return "Mood Swings" };
        if(val === 5){ return "Sad" };
        if(val === 6){ return "Irritated" };
        return "Unknown"
    }

	function getMoodColor(val){
		val--;
		if(val === 0){
			return "#FFCE85"
		}
		
		if(val === 1){
			return "#FFCE85"
		}
		
		if(val === 2){
			return "#FEF285"
		}
		
		if(val === 3){
			return "#8AC8C2"
		}
		
		if(val === 4){
			return "#D0E06B"
		}
		
		if(val === 5){
			return "#E2B68D"
		}
		
		if(val === 6){
			return "#C5784C"
		}
		return "#FFFFFF"
	}

	const today = new Date();
	
	//   export default events;
	function formatMoodData(data){
		var output = []
		for(var d in data){
			var tmp = {
				title: getMoodString(data[d].value),
				start: data[d].date,
				// end: data[d].date,
				color: getMoodColor(data[d].value),
			}
			output.push(tmp)
		}
		return output
	}
	  
    const CalHeatMap = ({data}) => {
		return (
			<div w='100%'><StyleWrapper>
				<FullCalendar
					// defaultView="dayGridMonth"
					// themeSystem="Simplex"
					headerToolbar={{
					  left: "prev",
					  center: "title",
					  right: "next",
					}}
					plugins={[dayGridPlugin]}
					events={formatMoodData(data)}
					// events={events}
					displayEventEnd="true"
					eventTextColor= '#285E61'
					// dayMaxEvents={true}
				/>

			</StyleWrapper></div>
		);
    }

	return(<div> 
		<Flex>

			{/* This be side nav bar */}
			<SideDoctor/>

			{/* This be main screen */}
			<Box bg='white' minHeight='100vh' w='100%' ml='20%'>
				<VStack flexDirection='column' align='left' margin={4} mt={10} divider={<StackDivider borderColor='gray.200' />}>
					
					{/* heading */}
					<Grid templateColumns='repeat(7, 1fr)' w='flex' gap={6} margin={3} minHeight='5vh' maxHeight='5vh'>
						<GridItem colSpan={2}>
							<Heading color='teal.700'>Patient Name</Heading>
							{/* <Heading color='teal.700'>{location.state.name}</Heading> */}
						</GridItem>

						<GridItem colSpan={4}>
							{/* <Input placeholder='SEARCH'></Input> */}
						</GridItem>

						<GridItem align='right'>
							<Button
								onClick={()=>clickChat(1, 2, 3)}
								// onClick={()=>clickChat(location.state.id,location.state.consultationId,location.state.name)}
								bg="teal.700"
                                color='white'
								size="md"
                                w='100%'
							>
								<FontAwesomeIcon
									icon={faComments}
									style={{ marginRight: "0.5em" }}
								/>{" "}
								Chat
							</Button>
						</GridItem>
					</Grid>

					<HStack w='100%'>
                        {/* module cards */}
                        <Box w='45%' bg='teal.100'  >
                            <GenerateToken/>
                            {/* <CalHeatMap data={patientMoods}/> */}
                        </Box>

                        <Box maxHeight='80vh' w='100%' overflowY='scroll' display='block'>
                            <Grid templateColumns='repeat(2, 1fr)' m={3} gap='1em'>
							{/* {allModules.map((item,index)=>{
								return(
									<GridItem mt='7em' mr='5em' key={index}>
										<ModuleCard name={item.title} desc={item.description} date={item.scheduled.slice(0,10)} index={index} type="form"/>
									</GridItem>
								)
							})} */}

                            <GridItem> <ModuleCard name="module 1" desc="module desc one module desc one module desc one module desc one module desc one module desc one module desc one module desc one module desc one module desc one module desc one " date="module date 1" type="form"/> </GridItem>
                            <GridItem> <ModuleCard name="module 2" desc="module desc two" date="module date 2" type="form"/> </GridItem>
                            <GridItem> <ModuleCard name="module 3" desc="module desc three" date="module date 3" type="form"/> </GridItem>

                            </Grid>
                        </Box>
                        {/* calendar */}
                        
                    </HStack>
				</VStack>
			</Box>
			
		</Flex>
	</div>);
	
}

export default Tmp;