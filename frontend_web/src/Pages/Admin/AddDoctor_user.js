import { Grid, GridItem ,Heading,Image, Button,Center,Input, defineStyle } from '@chakra-ui/react'
// import Navbar from '../../Components/Navbar';
import { DESKTOP_BG_MEDIUM, DARK_GREEN} from "../../Constants" 
import logo from "../../Assets/Logo/Logo_name.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie,faDatabase,faStethoscope } from '@fortawesome/free-solid-svg-icons'
// import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
    FormControl,
    FormLabel,
} from '@chakra-ui/react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import SideAdmin from '../../Components/SideAdmin'



const custom = defineStyle({
    color: "DARK_OLIVE"
})

function UserForm(){ 
    const [state, dispatch] = useStateValue();

    const navigate = useNavigate(); 

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

        axios.post('http://localhost:8080/api/v1/auth/register',credentials)
            .then(response=>{
                
                const newDict = {...response.data}
                navigate("/updatedoctor",{
                    state:newDict
                })
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
                <Input onChange={handleChangePassword} type='password' style={{color:'teal'}} placeholder="Enter Password" />          
             </FormControl>
            
            <Button onClick={onSubmit} width="full" mt={4} colorScheme='teal' variant="solid" >
                    Continue
            </Button>
        </form>
    )
}

function AddDoctor_user(){
    const navigate = useNavigate(); 
  
    const onClickDoctors = ()=>{
        navigate('/doctor')
    }

    const onClickDashboard = ()=>{
        navigate('/home')
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
                   <SideAdmin/>
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

 