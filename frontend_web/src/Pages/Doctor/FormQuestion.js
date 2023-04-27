import { Flex, Card, Button, RadioGroup, Radio,Text, Box, VStack,  HStack,  Heading, Input, CardBody, extendTheme, withDefaultVariant, ButtonGroup } from '@chakra-ui/react'
import SideAdmin from "../../Components/SideAdmin";
import { DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM } from "../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { Select } from '@chakra-ui/react'


import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
} from '@chakra-ui/react'

import react, {useEffect, useState} from 'react';
import { useNavigate, useLocation, Form, } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import axios from 'axios';
import SideDoctor from '../../Components/SideDoctor';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

function FormQuestion({tasks,setTasks,index,allModules}){
    const [date,setDate] = useState(new Date()); 
    const [module, setModule] = useState({target:{value:-1}}); 

    useEffect(()=>{
        var temp = tasks; 
        temp[index].date = date; 
        temp[index].moduleId = module.target.value
        setTasks(temp)
    },[date,module])

    return(<Box w = 'flex' m={3} padding={2}>
			<Card bg={DESKTOP_BG_LIGHT}>
				<CardBody color='teal.700'>
					<Heading mb = "1vw" color='teal.700' align='left' size='lg'>Module {index} </Heading>

					<Heading color='teal.700' align='left' size='md'>Choose the Date: </Heading>

					<DatePicker onChange={setDate} minDate={new Date()} value={date} />

					<Heading mt='1vw' mb = '1vw' color='teal.700' align='left' size='md'>Choose the Module:</Heading>
					<Select value={module.target.value} placeholder='Select A Module' onChange={setModule}>
                        {
                            allModules.map((item,index)=>{
                                return (<option value = {item.moduleId} key={index} >{item.title}</option>)
                            })
                        }
                    </Select>
				</CardBody>
			</Card>
		</Box>);
}

export default FormQuestion; 