import { Grid, GridItem ,Heading,Image, Button,Center,Input, Flex, Box, VStack } from '@chakra-ui/react'
// import Navbar from '../../Components/Navbar';
import { DESKTOP_BG_MEDIUM, DARK_GREEN} from "../../Constants" 
import logo from "../../Assets/Logo/Logo_name.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie,faDatabase,faStethoscope } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
    FormControl,
    FormLabel,
} from '@chakra-ui/react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import SideAdmin from '../../Components/SideAdmin'

import DialogBox from '../../Components/DialogBox'


function UserForm(response){
    const navigate = useNavigate(); 
    const [state, dispatch] = useStateValue();

    const [license,setLicense] = useState("")
    const [bio,setBio] = useState("")
    const [degree,setDegree] = useState("")
    const [currentPos,setCurrentPos] = useState("")
    const [phone,setPhone] = useState("")
     
    
    const handleChangeLicense = (event) => setLicense(event.target.value)
    const handleChangeBio = (event) => setBio(event.target.value)
    const handleChangeDegree= (event) => setDegree(event.target.value)
    const handleChangeCurrentPos= (event) => setCurrentPos(event.target.value)
    const handleChangePhone= (event) => setPhone(event.target.value)

    const onSubmit = ()=>{
        const credentials = {
            doctorId:response.response.id,
            licenseId:license,
            biography:bio,
            degree:degree,
            currentPos:currentPos,
            phoneNumber:phone
        }

        const auth = {
            headers: {
                Authorization: `Bearer ${state.adminToken}`
            }
        }

        axios.post('http://localhost:8080/api/v1/app/createDoctor',credentials, auth)
            .then(response=>{
                console.log(response.data)
            })
    }

    return(
        <form>
            <FormControl>
                <FormLabel mt={6} color='teal.700'>License ID</FormLabel>
                <Input onChange={handleChangeLicense} type='password' style={{color:'teal'}} placeholder='License ID'/>
            </FormControl>

            <FormControl>
                <FormLabel mt={6} color='teal.700'>Biography</FormLabel>
                <Input onChange={handleChangeBio} type='text' style={{color:'teal'}} placeholder='Biography'/>
            </FormControl>

            <FormControl>
                <FormLabel mt={6} color='teal.700'>Degree</FormLabel>
                <Input onChange={handleChangeDegree} type='text' style={{color:'teal'}} placeholder='Degree'/>
            </FormControl>

            <FormControl>
                <FormLabel mt={6} color='teal.700'>Current Position</FormLabel>
                <Input onChange={handleChangeCurrentPos} type='text' style={{color:'teal'}} placeholder="Current Position" />           
             </FormControl>

             <FormControl>
                <FormLabel mt={6} color='teal.700'>Phone</FormLabel>
                <Input onChange={handleChangePhone} type='text' style={{color:'teal'}} placeholder="Phone" />           
             </FormControl>
            
            <Button onClick={onSubmit} width="full" mt={4} bg='teal.700' color='white'>
                Add Doctor
            </Button>
        </form>
    )
}

function UpdateDoctor_user(){
    const location = useLocation();
    const navigate = useNavigate(); 

    return(
        <Flex>
            <SideAdmin/>
            <Box bg='white' minHeight='100vh' flex='1'>
				<VStack flexDirection='column' align='left' m={3} mt={10}>

					{/* Moules heading*/}
                    <Heading mt={13} color='teal.700'>Enter Doctor's Data</Heading>

					<Box w='50%'>
                         <UserForm response={location.state}/>
                    </Box>
				</VStack>
			</Box>
        </Flex>
    ); 
}


export default UpdateDoctor_user; 

 