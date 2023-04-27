import { Flex, Grid, GridItem, Button, ButtonGroup, Text, Box, VStack, HStack, StackDivider, Heading, Card, CardBody, useDisclosure, AlertDialog, AlertDialogHeader, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react'
import SideDoctor from "../../Components/SideDoctor";
import { DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM } from "../../Constants";
import axios from 'axios'

import styled from "@emotion/styled";


import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import 'react-calendar/dist/Calendar.css';

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'

import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';


function UpdateOrder(){
    const navigate = useNavigate();
	const location = useLocation(); 

	const [state,dispatch] = useStateValue();
    const [date,updateDate] = useState(location.state.module.scheduled); 

    useEffect(()=>{
        console.log(date)
    },[])

    const onSubmit = () =>{
        console.log(date)
        const auth = {
            headers: {
                Authorization: `Bearer ${state.adminToken}`
            }
        }

        const dict = {
            moduleAssignedId:location.state.module.moduleAssignedId, 
            scheduled:date 
        }

        axios.post('http://localhost:8080/api/v1/app/updateOrder',dict, auth)
            .then(response=>{
                console.log(response.data)
        })
    }

    return(<div> 
		<Flex>

			{/* This be side nav bar */}
			<SideDoctor/>

			{/* This be main screen */}
			<Box bg='white' minHeight='100vh'>
				<VStack flexDirection='column' align='left' m={4} mt={10} divider={<StackDivider borderColor='gray.200' />}>
					
                    <Heading color='teal.700' m={3}> Reschedule Module</Heading>

                    <Heading mt = '3vw' color='teal.700' m={3} size='md'>Update Schedule</Heading>
                    <DatePicker onChange={(event)=>updateDate(event)} minDate={new Date()} value={location.state.module.scheduled}/>

                    <Button onClick={onSubmit} ml = '5em' mt = '2em' w = '12em' colorScheme='teal' variant='solid'>
                        Update Schedule
                    </Button>
				</VStack>
			</Box>
			
		</Flex>
	    </div>
    )

}

export default UpdateOrder;