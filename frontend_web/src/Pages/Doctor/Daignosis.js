import { Flex, Grid, GridItem, Button, ButtonGroup, Text, Box, VStack, HStack, StackDivider, Heading, Card, CardBody, useDisclosure, AlertDialog, AlertDialogHeader, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogFooter, Divider, Switch } from '@chakra-ui/react'
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


function Diagnosis(){


    const DiagnosisCard = ({date, diagnosis}) =>{
        return(<HStack w='100%'>
            <Text as='b' color='teal.700' w='500px' align='right'> {date} </Text>
            <Text color='teal.700' > {diagnosis} </Text>
        </HStack>)
    }


	return(<div> 
		<Flex>

			{/* This be side nav bar */}
			<SideDoctor/>

			{/* This be main screen */}
			<Box bg='white' minHeight='100vh' flex='1' p={3}>
                <Flex mt={10} direction="column">
                    <Heading color="teal.700"> Jaggu's Diagnosis</Heading>
                    <HStack>
                        <Text color='teal.700'>Module Availability:</Text> 
                        <Switch colorScheme='teal' defaultChecked={true} size='md' />
                    </HStack>
                    <Divider borderColor='gray.600'/>
                    <VStack overflowY = "auto" maxHeight='85vh' w='100%' divider={<StackDivider borderColor='gray.200' />}>
                        <DiagnosisCard date="15 April 2023" diagnosis="tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo"/>
                        <DiagnosisCard date="15 April 2023" diagnosis="tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo"/>
                        <DiagnosisCard date="15 April 2023" diagnosis="tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo"/>
                        <DiagnosisCard date="15 April 2023" diagnosis="tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo"/>
                        <DiagnosisCard date="15 April 2023" diagnosis="tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo"/>
                        <DiagnosisCard date="15 April 2023" diagnosis="tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo"/>
                        <DiagnosisCard date="15 April 2023" diagnosis="tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo tsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfotsndfksdn sdis sfasuindhi id hwi fifis fwehfos wehoa hgidg efw weihfobf wfo"/>
                    </VStack>
                </Flex>
            </Box>
			
		</Flex>
	</div>);
	
}

export default Diagnosis;