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
import FormQuestion from './FormQuestion';


function AssignModules() {
	const location = useLocation();
	const [numberOfQuestions,setNumberOfQuestions] = useState(0)
	const [tasks,setQuestions] = useState([])
    const [allModules,setAllModules] = useState([]);
	const [state,dispatch] = useStateValue();

	const onSubmit = () =>{
		const auth = {
			headers: {
			    Authorization: `Bearer ${state.adminToken}`
			}
		}

		for(let i = 0;i<tasks.length;i++){
			var dict = {
				patientId:location.state.id,
				moduleId:parseInt(tasks[i].moduleId), 
				scheduled:tasks[i].date,
			}

			console.log(dict)

			axios.post('http://localhost:8080/api/v1/app/assignModule',dict, auth)
			    .then(response=>{
			        console.log(response.data)
			})
		}
	}

	useEffect(()=>{
        const auth = {
            headers: {
                Authorization: `Bearer ${state.adminToken}`
            }
        }

        axios.get('http://localhost:8080/api/v1/app/getAllModules', auth)
            .then(response=>{
                const val = response.data; 
				let array = []
                 
				for(let i = 0; i<val.length;i++){
                    let temp = JSON.parse(val[i].content)
                    temp["moduleId"] = val[i].moduleId
					array.push(temp)
				}
				setAllModules(array)
                console.log(array)
        })
	},[])

	const addNewTask = () => {
		setNumberOfQuestions(numberOfQuestions+1)
		var temp = tasks
		temp.push({
			moduleId:-1,
			date:new Date()
		})
		setQuestions(temp)
	}




	return (<div>
		<Flex>
			<SideDoctor />
			<Box bg='white' minHeight='100vh' flex='1'>
				<VStack flexDirection='column' align='left' margin={4} mt={10}>
					<Heading> <Text color='teal.700' ml={3} mt={3}> Assign Modules</Text> </Heading>
					<Box w='100%' color='teal.700' padding={3} align='center'>
						{tasks.map((task,index) => 
						<FormQuestion tasks={tasks} setTasks={setQuestions} index={index} allModules={allModules}/>
						)}
						<ButtonGroup w='50%' align='center'>
							<Button onClick={addNewTask} w='30%' align='center' bg='teal.700' color='white' m={3}>Add Module</Button>
							<Button onClick={onSubmit} w='30%' align='center' bg='teal.700' color='white' m={3}> Assign </Button>
						</ButtonGroup>
					</Box>
					
				</VStack>
			</Box>

		</Flex>
	</div>);

}

export default AssignModules;