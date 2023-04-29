import { Flex, Grid, GridItem, Button, Textarea, Text, Box, VStack, HStack, StackDivider, Heading, Card, CardBody, useDisclosure, AlertDialog, AlertDialogHeader, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogFooter, Divider, Switch } from '@chakra-ui/react'
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


// changes
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';



function Diagnosis(){

    const [date,updateDate] = useState(new Date()); 

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
                    

                    {/* <VStack mb='1vw'>
                    </VStack> */}

                    <Divider borderColor='gray.600'/>

                    <Heading size='md' color="teal.700" mt={5}>Add Diagnosis</Heading>
                    <HStack w='100%' my={2}>
                        <Textarea placeholder='Append Diagnosis'></Textarea>
                        <Button bg='teal.700' h='100%' color='white' padding={5}>Append <br/>Diagnosis</Button>
                    </HStack>

                    <Divider borderColor='gray.600'/>

                    <Heading size='md' color="teal.700" mt={5}>Previous Diagnosis</Heading>
                    <VStack overflowY = "auto" maxHeight='70vh' w='100%' divider={<StackDivider borderColor='gray.200' />}>
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