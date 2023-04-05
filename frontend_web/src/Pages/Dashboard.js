import { Grid, GridItem ,Heading,Image, Button,Center} from '@chakra-ui/react'
import Navbar from '../Components/Navbar';
import {DESKTOP_BG_LIGHT,DESKTOP_BG_MEDIUM,DARK_OLIVE, LIGHT_GREEN, DARK_GREEN} from "../Constants" 
import logo from "../Assets/Logo/Logo_name.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie,faDatabase,faStethoscope } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

function Dashboard(){
    const location = useLocation();
    const navigate = useNavigate(); 

    useEffect(()=>{
        console.log("Dashboard Location Response - ",location.state)
    },[location])

    const onClickDoctors = ()=>{
        navigate('/doctor',{
            state:location.state.response,
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

                    <Button ml = '5em' mt ='2em' w = '12em' colorScheme='teal' variant='solid'>
                        <FontAwesomeIcon icon={faDatabase} style={{marginRight:"0.5em"}}/>  Modules
                    </Button>

                </GridItem>
                
                
                <GridItem ml = '5em' mt = '6em' rowSpan={20} colSpan={4}>
                   <Heading  size='lg'> Welcome, <div style={{color:DARK_GREEN}}>{location.state.response.firstName} {location.state.response.lastName}</div> </Heading>
                </GridItem>
            </Grid>
        </div>
    ); 
}

export default Dashboard; 

 