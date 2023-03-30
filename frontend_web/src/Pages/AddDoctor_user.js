import { Grid, GridItem ,Heading,Image, Button,Center,Input, defineStyle, defineStyleConfig, Text} from '@chakra-ui/react'
import Navbar from '../Components/Navbar';
import {DESKTOP_BG_LIGHT,DESKTOP_BG_MEDIUM,DARK_OLIVE, LIGHT_GREEN, DARK_GREEN} from "../Constants" 
import logo from "../Assets/Logo/Logo_name.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie,faDatabase,faStethoscope,faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const custom = defineStyle({
    color: "DARK_OLIVE"
})

function UserForm(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
     
    const handleChangeEmail = (event) => setEmail(event.target.value)
    const handleChangePassword = (event) => setPassword(event.target.value)
    const handleChangeFirstName= (event) => setFirstName(event.target.value)
    const handleChangeLastName= (event) => setLastName(event.target.value)

    const onSubmit = ()=>{
        const credentials = {
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password
        }
        console.log(credentials)

        axios.post('http://172.16.141.35:8080/api/v1/auth/register',credentials)
            .then(response=>{
                console.log(response.data)
            })
    }

    return(
        <form>
            <FormControl>
                <FormLabel mt={6} color={DARK_GREEN}>First Name</FormLabel>
                <Input onChange={handleChangeFirstName} type='text' placeholder='First Name'/>
            </FormControl>

            <FormControl>
                <FormLabel mt={6} color={DARK_GREEN}>Last Name</FormLabel>
                <Input onChange={handleChangeLastName} type='text' placeholder='Last Name'/>
            </FormControl>

            <FormControl>
                <FormLabel mt={6} color={DARK_GREEN}>Email address</FormLabel>
                <Input onChange={handleChangeEmail} type='email' placeholder='We will never share your email'/>
            </FormControl>

            <FormControl>
                <FormLabel mt={6} color={DARK_GREEN}>Password</FormLabel>
                <Input onChange={handleChangePassword} type='password' style={{color:'teal'}} placeholder="Enter Password" />            </FormControl>
            
            <Button onClick={onSubmit} width="full" mt={4} colorScheme='teal' variant="solid" >
                    Continue
            </Button>
        </form>
    )
}

function AddDoctor_user(){
    const location = useLocation();
    const navigate = useNavigate(); 

    const onClickDoctors = ()=>{
        navigate('/doctor',{
            state:location.state.response
        })
    }

    const onClickDashboard = ()=>{
        navigate('/home',{
            state:location.state.response
        })
    }

    return(
        <div>
            <Grid
                h='60em'
                templateRows='repeat(20, 1fr)'
                templateColumns='repeat(5, 1fr)'
                >

                {/* Side bar */}
                <GridItem rowSpan={20} colSpan={1} bg={DESKTOP_BG_MEDIUM}>
                    <Center mt = '5em' mb = '12em'>  
                        <Image src={logo} h='9em' />
                    </Center>

                    <Button onClick={onClickDashboard} ml = '5em' w = '12em' colorScheme='teal' variant='solid'>
                        <FontAwesomeIcon icon={faChartPie} style={{marginRight:"0.5em"}}/>  Dashboard
                    </Button>
                    
                    <Button onClick={onClickDoctors} ml = '5em' mt = '2em' w = '12em' colorScheme='teal' variant='solid'>
                        <FontAwesomeIcon icon={faStethoscope} style={{marginRight:"0.5em"}}/>  Doctors
                    </Button>

                    <Button ml = '5em' mt = '2em' w = '12em' colorScheme='teal' variant='solid'>
                        <FontAwesomeIcon icon={faDatabase} style={{marginRight:"0.5em"}}/>  Modules
                    </Button>

                </GridItem>
                
                
                <GridItem ml = '5em' mt = '6em' rowSpan={20} colSpan={4}>
                   <Grid h='15em' templateRows='repeat(20,1fr)' templateColumns='repeat(4,1fr)'>     
                        <GridItem rowSpan={2} colSpan={4}>
                            <Grid templateRows='repeat(2,1fr)' templateColumns='repeat(4,1fr)'>
                                <GridItem colSpan={5} rowSpan={2}>
                                    <Heading color={DARK_GREEN}>Enter Doctor's Data</Heading>
                                </GridItem>
                                <GridItem colSpan={2} rowSpan={2} mr='5em'>
                                        <UserForm/>
                                </GridItem>                               
                            </Grid>           
                        </GridItem>

                   </Grid>
                </GridItem>
            </Grid>
        </div>
    ); 
}

export default AddDoctor_user; 

 