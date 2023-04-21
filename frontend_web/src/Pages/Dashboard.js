import { Grid, GridItem ,Heading,Image, Button,Center,Box} from '@chakra-ui/react'
import {DESKTOP_BG_MEDIUM, DARK_GREEN} from "../Constants" 
import logo from "../Assets/Logo/Logo_name.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie,faDatabase,faStethoscope,faUser } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import PieChart from '../Components/DoughnutAdmin'


function Dashboard(){
    const location = useLocation();
    const navigate = useNavigate();
    const [state, dispatch] = useStateValue(); 

    useEffect(()=>{
        console.log(state)
    },[location])

    const onClickDoctors = ()=>{
        navigate('/doctor',{
            state:location.state.response,
        })
    }

    const onClickModules = () => {
        navigate('/admin/modules')
    }

    const onClickPatients = () => {
        navigate("/doctor/patients")
    }

    const onClickProfile = ()=>{
        navigate("/profile")
    }
    
    return(
        <div>
            <Grid
                h='60em'
                templateRows='repeat(20, 1fr)'
                templateColumns='repeat(5, 1fr)'
                >

                <GridItem rowSpan={20} colSpan={1} bg={DESKTOP_BG_MEDIUM}>
                    <Center mt = '3em' mb = '12em'>  
                        <Image src={logo} h='9em' />
                    </Center>

                    <Button ml = '5em' w = '12em' colorScheme='teal' variant='solid'>
                        <FontAwesomeIcon icon={faChartPie} style={{marginRight:"0.5em"}}/>  Dashboard
                    </Button>

                    
                    {(state.role === 'ADMIN')?
                        <Button onClick={onClickDoctors} ml = '5em' mt = '2em' w = '12em' colorScheme='teal' variant='solid'>
                            <FontAwesomeIcon icon={faStethoscope} style={{marginRight:"0.5em"}}/>  Doctors
                        </Button>:
                        <></>
                    }
                    <Button onClick={onClickPatients} ml = '5em' mt = '2em' w = '12em' colorScheme='teal' variant='solid'>
                            <FontAwesomeIcon icon={faStethoscope} style={{marginRight:"0.5em"}}/>  Patients
                    </Button>
                    

                    <Button onClick={onClickModules} ml = '5em' mt ='2em' w = '12em' colorScheme='teal' variant='solid'>
                        <FontAwesomeIcon icon={faDatabase} style={{marginRight:"0.5em"}}/>  Modules
                    </Button>
                    
                    {(state.role === 'DOCTOR')?     
                        <Button onClick={onClickProfile} ml = '5em' mt ='2em' w = '12em' colorScheme='teal' variant='solid'>
                            <FontAwesomeIcon icon={faUser} style={{marginRight:"0.5em"}}/>  Profile
                        </Button>
                    :<></>}
                    

                </GridItem>
                
                
                <GridItem ml = '5em' mt = '6em' rowSpan={20} colSpan={4}>
                   <Heading  size='lg'> Welcome, <div style={{color:DARK_GREEN}}>{location.state.response.firstName} {location.state.response.lastName}</div> </Heading>
                   
                   {(state.role === 'ADMIN')?
                        <Box maxW="20rem" maxH="20rem" mt = '5rem'>
                            <PieChart/>
                        </Box>
                    :
                        <></>
                    }
                </GridItem>
            </Grid>
        </div>
    ); 
}

export default Dashboard; 

 