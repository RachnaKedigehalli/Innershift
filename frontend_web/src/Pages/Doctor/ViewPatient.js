import { Flex, Grid, GridItem, Button, ButtonGroup, Text, Box, VStack, HStack, StackDivider, Heading, Card, CardBody, useDisclosure, AlertDialog, AlertDialogHeader, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react'
import SideDoctor from "../../Components/SideDoctor";
import { DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM } from "../../Constants";
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
import { useStateValue } from '../../StateProvider'


// changes
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-calendar/dist/Calendar.css';


function ViewPatient(){
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

	const [state,dispatch] = useStateValue();
    const [patientMoods, setPatientMoods]  = useState([]); 
	const [allModules, setAllModules] = useState([]);
	const [date,updateDate] = useState(new Date());


	const clickChat = (id,consultationId,name) => {
		navigate('/doctor/chat',{
			state:{
				id:id,
				consultationId:consultationId,
				name:name
			}
		})
	}

	
    

    const RescheduleDialog = (moduleAssignedId) => {
		const { isOpen, onOpen, onClose } = useDisclosure()
        const cancelRef = React.useRef();
        

        const completeReschedule = () =>{

            const auth = {
                headers: {
                    Authorization: `Bearer ${state.adminToken}`
                }
            }
    
            const dict = {
                moduleAssignedId:moduleAssignedId.moduleAssignedId, 
                scheduled:date 
            }

			console.log(dict)
            axios.post('http://localhost:8080/api/v1/app/updateOrder',dict, auth)
                .then(response=>{
                    onClose();
            })
        }
        
		const onChangeDate = (event) =>{
			event.setHours(5)
			updateDate(event)
			console.log(event) 
		}
         
        return (
            <>
                <Button flex='1' ml={2} bg='teal.700' color='white' align='center'  onClick={onOpen}>
                    Edit
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
								<VStack flexDirection='column' align='left' m={4} mt={10} divider={<StackDivider borderColor='gray.200' />}>			
       								 <DatePicker onChange={onChangeDate} minDate={new Date()} value={date} />
    							</VStack>
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

	const ModuleCard = ({ name, type, desc, date,index,moduleAssignedId}) => {
		return (<Card bg={DESKTOP_BG_MEDIUM} >
            <CardBody bg={DESKTOP_BG_MEDIUM}>
                <VStack spacing={3} align='left'>
                        <Heading flex={1}> <Text noOfLines={1} color='#285e61'> {name}</Text> </Heading>
                    <Text h={75} bg='blue.100' color='teal.700' noOfLines={3}> {desc} </Text>
                    <Flex>
                        <Text> To be unlocked on: </Text>
                        <Text ml={1} color='teal.700'>  {date} </Text>
                        <RescheduleDialog moduleAssignedId={moduleAssignedId}/>
                    </Flex>
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


	
	useEffect(()=>{
		
		const auth = {
            headers: {
                Authorization: `Bearer ${state.adminToken}`
            }
        }

		const details = {
			patientId:location.state.id
		}

		
        axios.post('http://localhost:8080/api/v1/app/getMoodsByPid',details,auth)
        .then(response=>{
            var temp = response.data 
			var temp1 = [] 

			for(let i = 0;i<temp.length;i++){
				temp1.push(
					{
						date:temp[i].date.slice(0,10),
						value:temp[i].mood
					}
				)
			}
			setPatientMoods(temp1)
        })

		axios.post('http://localhost:8080/api/v1/app/getModulesByPid',details,auth)
        .then(response=>{
			const val = response.data; 
			let array = []
			for(let i = 0; i<val.length;i++){
				var temp = JSON.parse(val[i].module.content)
				array.push({...temp,moduleAssignedId:val[i].moduleAssignment.moduleAssignedId,scheduled:val[i].moduleAssignment.scheduled})
			}
			setAllModules(array)
			console.log(array)
        })


	},[])

	return(<div> 
		<Flex>

			{/* This be side nav bar */}
			<SideDoctor/>

			{/* This be main screen */}
			<Box bg='white' minHeight='100vh' w='80%' ml='20%'>
				<VStack flexDirection='column' align='left' margin={4} mt={10} divider={<StackDivider borderColor='gray.200' />}>
					
					{/* existing patients heading */}
					<Grid templateColumns='repeat(7, 1fr)' w='flex' gap={6} margin={3} minHeight='5vh' maxHeight='5vh'>
						<GridItem colSpan={2}>
							<Heading color='teal.700'>{location.state.name}</Heading>
						</GridItem>

						<GridItem colSpan={4}>
							{/* <Input placeholder='SEARCH'></Input> */}
						</GridItem>

						<GridItem align='right'>
							<Button
								onClick={()=>clickChat(location.state.id,location.state.consultationId,location.state.name)}
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
                        <Box w='30vw' >
                            <CalHeatMap data={patientMoods}/>
                        </Box>

                        <Box maxHeight='80vh' overflowY='scroll' display='block'>
                            <Grid templateColumns='repeat(2, 1fr)' m={3} gap={3}>
							{allModules.map((item,index)=>{
								return(
									<GridItem mt='7em' mr='5em' key={index}>
										<ModuleCard name={item.title} desc={item.description} date={item.scheduled.slice(0,10)} index={index} moduleAssignedId={item.moduleAssignedId} type="form"/>
									</GridItem>
								)
							})}

                            </Grid>
                        </Box>
                        {/* calendar */}
                        
                    </HStack>
				</VStack>
			</Box>
			
		</Flex>
	</div>);
	
}

export default ViewPatient;