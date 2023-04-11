import { Flex, Grid, GridItem, Button, ButtonGroup, Text, Box, VStack, HStack, StackDivider, Heading, Card, CardBody, useDisclosure, AlertDialog, AlertDialogHeader, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react'
import SideDoctor from "../../Components/SideDoctor";
import { DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM } from "../../Constants";

import CalendarHeatmap from 'react-calendar-heatmap';
import './HeatMap.css';


import { Tooltip as ReactTooltip } from 'react-tooltip'

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

import React from 'react';
import { useNavigate, useLocation, } from 'react-router-dom'



function ViewPatient(){
	const navigate = useNavigate();
	const location = useLocation();
	// const clickChat = () => {
	// 	navigate('/dummyloc', {
	// 		state: location.state
	// 	})
	// }

	// const clickModule = () => {
	// 	navigate('/dummyloc', {
	// 		state: location.state
	// 	})
	// }

	// const clickAccept = () => {
	// 	navigate('/dummyloc', {
	// 		state: location.state
	// 	})
	// }

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
							<Heading flex={1}> <Text noOfLines={1} color='#285e61'> {name}</Text> </Heading>
						</HStack>
						<Text h={100} color='teal.700' noOfLines={3}> {desc} </Text>
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

    function shiftDate(date, numDays) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + numDays);
        return newDate;
    }

    function getRange(count) {
        return Array.from({ length: count }, (_, i) => i);
    }
      
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function intToMood(val){
        if(val === 1){ return "Energetic" };
        if(val === 2){ return "Happy" };
        if(val === 3){ return "Calm" };
        if(val === 4){ return "Mood Swings" };
        if(val === 5){ return "Sad" };
        if(val === 6){ return "Irritated" };
        return "Unknown"
    }

    const CalHeatMap = ({data}) => {
        // console.log("hi", data);
        const today = new Date();
        const randomValues = getRange(200).map(index => {
            return {
              date: shiftDate(today, -index),
              count: getRandomInt(1, 6),
            };
          });
        // console.log(randomValues)
        return(<div w='100%'>
            <Heading color='teal.700'> Moods Recorded </Heading>
            <CalendarHeatmap
              startDate={shiftDate(today, -100)}
              endDate={today}
              values={randomValues}
              width='100%'
              classForValue={(value) => {
                if (!value) {
                  return "color-empty";
                }
                return `color-mood-${value.count}`;
              }}
              tooltipDataAttrs={(value) => {
                return {
                  "tooltip": `${value.date.toISOString().slice(0, 10)} has count: ${
                    value.count
                  }`
                };
              }}
              horizontal={false}
              onClick={(value) =>
                alert(`Mood on ${value.date.toISOString().slice(0, 10)}: ${intToMood(value.count)}`)
              }
            />
            <ReactTooltip />
          </div>
        );
    }

    var values = [
        { date: new Date("2023/01/01"), count: 1 },
        { date: new Date("2023/01/02"), count: 2 },
        { date: new Date("2023/01/03"), count: 2 },
        { date: new Date("2023/01/04"), count: 3 },
        { date: new Date("2023/01/05"), count: 100 },
        { date: new Date("2023/01/06"), count: 5 },
        { date: new Date("2023/01/07"), count: 3 }
    ];

	return(<div> 
		<Flex>

			{/* This be side nav bar */}
			<SideDoctor/>

			{/* This be main screen */}
			<Box bg={DESKTOP_BG_LIGHT} minHeight='100vh' w='80%' ml='20%'>
				<VStack flexDirection='column' align='left' margin={4} mt={10} divider={<StackDivider borderColor='gray.200' />}>
					
					{/* existing patients heading */}
					<Grid templateColumns='repeat(7, 1fr)' w='flex' gap={6} margin={3} minHeight='5vh' maxHeight='5vh'>
						<GridItem colSpan={2}>
							<Heading color='teal.700'> Patient name </Heading>
						</GridItem>

						<GridItem colSpan={4}>
							{/* <Input placeholder='SEARCH'></Input> */}
						</GridItem>

						<GridItem align='right'>
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

					<HStack w='100%'>
                        {/* module cards */}
                        <Box minWidth='25%'>
                            <CalHeatMap data={values}/>
                        </Box>
                        <Box w='flex' maxHeight='80vh' overflowY='scroll' display='block'>
                            <Grid templateColumns='repeat(2, 1fr)' m={3} gap={3}>
                                {/* <GridItem> 
                                    <CalHeatMap data={values}/>
                                </GridItem> */}
                                <GridItem> 
                                    <BasicModuleCard/>
                                </GridItem>
                                <GridItem> 
                                    <BasicModuleCard/>
                                </GridItem>
                                <GridItem> 
                                    <BasicModuleCard/>
                                </GridItem>
                                <GridItem> 
                                    <BasicModuleCard/>
                                </GridItem>
                                <GridItem> 
                                    <BasicModuleCard/>
                                </GridItem>
                                <GridItem> 
                                    <BasicModuleCard/>
                                </GridItem>
                                <GridItem> 
                                    <BasicModuleCard/>
                                </GridItem>
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
                        {/* calendar */}
                        
                    </HStack>
				</VStack>
			</Box>
			
		</Flex>
	</div>);
	
}

export default ViewPatient;