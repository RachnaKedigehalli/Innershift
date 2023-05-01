import { Flex, Button, Textarea, Text, VStack, HStack, StackDivider, Heading, Divider, } from '@chakra-ui/react'
import SideDoctor from "../../Components/SideDoctor";
import { DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM } from "../../Constants";
import axios from 'axios'


import 'react-calendar/dist/Calendar.css';

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'





function Diagnosis(){

    const [state,dispatch] = useStateValue();
    const [currDiagnosis,setDiagnosis] =  useState({target:{value:""}});
    const [numberOfDiagnosis,setNumberofDiagnosis] = useState(0); 
    const [allDiagnosis,setAllDiagnosis] = useState([])
    
    const location = useLocation(); 

    useEffect(()=>{
        const auth = {
            headers: {
                Authorization: `Bearer ${state.adminToken}`
            }
        }

        const content = {
            consultationId:location.state.consultationId, 
        }

        axios.post('http://localhost:8080/api/v1/app/getDiagnosisByCid',content,auth)
        .then(response=>{
            console.log(response.data)
            setAllDiagnosis(response.data)
        })
    },[numberOfDiagnosis])

    const DiagnosisCard = ({date, diagnosis}) =>{
        return(<Flex w='100%'>
            <Text as='b' color='teal.700' w='16ch' align='right'> {date} </Text>
            <Text color='teal.700' flex='1' ml={1} > {diagnosis} </Text>
        </Flex>)
    }

    const addDiagnosis = ()=>{
        const auth = {
            headers: {
                Authorization: `Bearer ${state.adminToken}`
            }
        }

        const date = new Date(); 
        date.setHours(8); 

        const content = {
            consultationId:location.state.consultationId, 
            diagnosis:currDiagnosis.target.value,
            date:date 
        }

        axios.post('http://localhost:8080/api/v1/app/addDiagnosis',content,auth)
        .then(response=>{
            console.log(response.data)
            setNumberofDiagnosis(numberOfDiagnosis+1)
        })

        
        setDiagnosis({target:{value:""}})
    }

	return(<div> 
		<Flex>

			{/* This be side nav bar */}
			<SideDoctor/>

			{/* This be main screen */}
			<Flex bg='white' minHeight='100vh' maxHeight='100vh' flex='1' p={3} pt={10} direction='column'>
                <Heading color="teal.700"> {location.state.name}'s Diagnosis</Heading>

                <Divider borderColor='gray.600'/>

                <Heading size='md' color="teal.700" my={2}>Previous Diagnosis</Heading>
                <VStack overflowY = "auto" flex='1' w='100%' divider={<StackDivider borderColor='gray.200' />}>
                    {
                        
                        allDiagnosis.map((item,index)=>{
                            const temp = new Date(item.date); 
                            const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

                            return(
                                <DiagnosisCard date={temp.getDate()+" "+month[temp.getUTCMonth()] + " " + temp.getFullYear()} diagnosis={item.diagnosis}/>
                            )
                        })
                    }
                </VStack>

                <HStack w='100%'>
                    <Textarea value={currDiagnosis.target.value} placeholder='Append Diagnosis' onChange={setDiagnosis}/>
                    <Button onClick={addDiagnosis} bg='teal.700' h='100%' color='white' padding={5}>Append <br/>Diagnosis</Button>
                </HStack>
            </Flex>
			
		</Flex>
	</div>);
	
}

export default Diagnosis;