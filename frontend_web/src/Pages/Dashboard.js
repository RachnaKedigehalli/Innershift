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
import PieChartDoctor from '../Components/DoughnutDoctor'
import SideAdmin from '../Components/SideAdmin'
import SideDoctor from '../Components/SideDoctor'


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
                    {/* <Center mt = '3em' mb = '12em'>  
                        <Image src={logo} h='9em' />
                    </Center> */}

                    {(state.role === 'ADMIN')?
                        <SideAdmin/>:
                        <SideDoctor/>
                    }
                </GridItem>
                
                
                <GridItem ml = '5em' mt = '6em' rowSpan={20} colSpan={4}>
                   <Heading  size='lg'> Welcome, <div style={{color:DARK_GREEN}}>{location.state.response.firstName} {location.state.response.lastName}</div> </Heading>
                   
                   {(state.role === 'ADMIN')?
                        <Box maxW="20rem" maxH="20rem" mt = '5rem'>
                            <PieChart/>
                        </Box>
                    :       
                        <Box maxW="20rem" maxH="20rem" mt = '5rem'>
                            <PieChartDoctor/>
                        </Box>
                    }
                </GridItem>
            </Grid>
        </div>
    ); 
}

export default Dashboard; 

 