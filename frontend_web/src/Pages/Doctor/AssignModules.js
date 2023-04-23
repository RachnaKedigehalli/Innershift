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



function AssignModules() {
	const navigate = useNavigate();
	const location = useLocation();
	const [numberOfQuestions,setNumberOfQuestions] = useState(0)
	const [tasks,setQuestions] = useState([])
    const [allModules,setAllModules] = useState([]);
	const [state,dispatch] = useStateValue();

	const onSubmit = () =>{
		// var dict = {...location.state,tasks:tasks}

		// const auth = {
        //     headers: {
        //         Authorization: `Bearer ${state.adminToken}`
        //     }
        // }

		// const details = {
		// 	content: JSON.stringify(dict)
		// }

        // axios.post('http://localhost:8080/api/v1/app/addModule',details, auth)
        //     .then(response=>{
        //         console.log(response.data)
		// 		navigate("/admin/modules")
        //     })
	}

	useEffect(()=>{
		// setQuestions([{
		// 	type:0,
		// 	title:"",
		// 	description:"",
		// 	content:""
		// }])
		// setNumberOfQuestions(1)

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
			moduleId:0 
		})
		setQuestions(temp)
	}

   const onChangeDropdown = (index,event) => {
		console.log(index)
   }

    function FormQuestions(qno){
        return(<Box w = 'flex' m={3} padding={2}>
			<Card bg={DESKTOP_BG_LIGHT}>
				<CardBody color='teal.700'>
					<Heading color='teal.700' align='left' size='lg'>Module {qno.qno} </Heading>
					<Select placeholder='Select A Module' onChange={(event)=> onChangeDropdown(qno.qno-1,event)}>
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

	function QuestionsForm(){
        var displayQuestions = [];
        
        for(var i=1; i<=numberOfQuestions ; i++){
            displayQuestions.push(<FormQuestions key={i} qno={i}/>)
        }

		return (<form>
            {displayQuestions}
			<ButtonGroup w='50%' align='center'>
				<Button onClick={addNewTask} w='30%' align='center' bg='teal.700' color='white' m={3}>Add Module</Button>
				<Button onClick={onSubmit} w='30%' align='center' bg='teal.700' color='white' m={3}> Assign </Button>
			</ButtonGroup>
			
		</form>);
	}


	return (<div>
		<Flex>
			<SideDoctor />
			<Box bg={DESKTOP_BG_LIGHT} minHeight='100vh' w='80%' ml='20%'>
				<VStack flexDirection='column' align='left' margin={4} mt={10}>
					<Heading> <Text color='teal.700' ml={3} mt={3}> Assign Modules</Text> </Heading>
					<Box w='100%' color='teal.700' padding={3} align='center'>
						<QuestionsForm />
					</Box>
					
				</VStack>
			</Box>

		</Flex>
	</div>);

}

export default AssignModules;