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
} from '@chakra-ui/react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const custom = defineStyle({
    color: "DARK_OLIVE"
})

function UserForm(response){
    const navigate = useNavigate(); 

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
                Authorization: `Bearer ${response.response.adminToken}`
            }
        }

        axios.post('http://localhost:8080/api/v1/app/createDoctor',credentials, auth)
            .then(response=>{
                console.log(response.data)
            })

        // navigate('/doctor',{
        //     state:response
        // })
    }

    return(
        <form>
            <FormControl>
                <FormLabel mt={6} color={DARK_GREEN}>License ID</FormLabel>
                <Input onChange={handleChangeLicense} type='password' placeholder='License ID'/>
            </FormControl>

            <FormControl>
                <FormLabel mt={6} color={DARK_GREEN}>Biography</FormLabel>
                <Input onChange={handleChangeBio} type='text' placeholder='Biography'/>
            </FormControl>

            <FormControl>
                <FormLabel mt={6} color={DARK_GREEN}>Degree</FormLabel>
                <Input onChange={handleChangeDegree} type='text' placeholder='Degree'/>
            </FormControl>

            <FormControl>
                <FormLabel mt={6} color={DARK_GREEN}>Current Position</FormLabel>
                <Input onChange={handleChangeCurrentPos} type='text' style={{color:'teal'}} placeholder="Current Position" />           
             </FormControl>

             <FormControl>
                <FormLabel mt={6} color={DARK_GREEN}>Phone</FormLabel>
                <Input onChange={handleChangePhone} type='text' style={{color:'teal'}} placeholder="Phone" />           
             </FormControl>
            
            <Button onClick={onSubmit} width="full" mt={4} colorScheme='teal' variant="solid" >
                Add Doctor
            </Button>
        </form>
    )
}

function UpdateDoctor_user(){
    const location = useLocation();
    const navigate = useNavigate(); 

    useEffect(()=>{
        console.log("UpdateDoctor Location Response - ",location.state)
    })

    const onClickDoctors = ()=>{
        // console.log(location.state)
        navigate('/doctor',{
            state:location.state
        })
    }

    const onClickDashboard = ()=>{
        navigate('/home',{
            state:location.state
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
                                        <UserForm response={location.state}/>
                                </GridItem>                               
                            </Grid>           
                        </GridItem>

                   </Grid>
                </GridItem>
            </Grid>
        </div>
    ); 
}


export default UpdateDoctor_user; 

 