import { Flex, Card, Button, RadioGroup, Radio,Text, Box, VStack,  HStack,  Heading, Input, CardBody, extendTheme, withDefaultVariant, ButtonGroup } from '@chakra-ui/react'
import SideAdmin from "../../Components/SideAdmin";
import {useEffect, useState} from 'react';
import { useNavigate, useLocation, Form, } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import axios from 'axios';
import FormTask from './Task';



function AddQuestions() {
	const navigate = useNavigate();
	const location = useLocation();
	const [numberOfQuestions,setNumberOfQuestions] = useState(0)
	const [tasks,setTasks] = useState([])
	const [state,dispatch] = useStateValue();

	const onSubmit = () =>{
		var dict = {...location.state,tasks:tasks}

		const auth = {
            headers: {
                Authorization: `Bearer ${state.adminToken}`
            }
        }

		const details = {
			content: JSON.stringify(dict)
		}

        axios.post('http://localhost:8080/api/v1/app/addModule',details, auth)
            .then(response=>{
                console.log(response.data)
				navigate("/admin/modules")
            })
	}

	const addNewTask = () => {
		setNumberOfQuestions(numberOfQuestions+1)
		var temp = tasks
		temp.push({
			type:0,
			description:"",
			content:"",
			title:""
		})
		setTasks(temp)
	}

	return (<div>
		<Flex>
			<SideAdmin />
			<Box bg='white' minHeight='100vh' flex='1'>
				<VStack flexDirection='column' align='left'  mt={10}>
					<Heading> <Text color='teal.700' ml={7} mt={3}> Add Tasks</Text> </Heading>
					<Box w='100%' color='teal.700' padding={3} align='center'>
						{tasks.map((task,index)=>{
							return (<FormTask  index={index} tasks={tasks} setTasks={setTasks}/>)
						})}
						<ButtonGroup w='50%' align='center'>
							<Button onClick={addNewTask} w='30%' align='center' bg='teal.700' color='white' m={3}>Add Task</Button>
							<Button onClick={onSubmit} w='30%' align='center' bg='teal.700' color='white' m={3}> Submit </Button>
						</ButtonGroup>
					</Box>
				</VStack>
			</Box>

		</Flex>
	</div>);

}

export default AddQuestions;