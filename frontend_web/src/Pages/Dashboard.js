import { Grid, GridItem ,Heading,Image, Button,Center,Box, Flex, VStack, HStack} from '@chakra-ui/react'
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

    return(
        <Flex>
            {(state.role === 'ADMIN')?
                <SideAdmin/>:
                <SideDoctor/>
            }

            

            <VStack m={3}>
                {/* <HStack>
                <Heading  size='lg'> Welcome, <div style={{color:DARK_GREEN}}>{state.firstName} {state.lastName}</div> </Heading>
                </HStack> */}
                <HStack w='100%' mt={10}>
						<Heading  size='lg' color='gray.600'> Welcome,</Heading> 
						<Heading color='teal.700'> {state.firstName} {state.lastName} </Heading>
					</HStack>

                {(state.role === 'ADMIN')?
                    <Box maxW="20rem" maxH="20rem" mt = '5rem'>
                        <PieChart/>
                    </Box>
                :       
                    <Box maxW="20rem" maxH="20rem" mt = '5rem'>
                        <PieChartDoctor/>
                    </Box>
                }
            </VStack>

            {/* <Grid
                h='60em'
                templateRows='repeat(20, 1fr)'
                templateColumns='repeat(5, 1fr)'
                >
                
                
                <GridItem ml = '5em' mt = '6em' rowSpan={20} colSpan={4}>
                   <Heading  size='lg'> Welcome, <div style={{color:DARK_GREEN}}>{state.firstName} {state.lastName}</div> </Heading>
                   
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
            </Grid> */}
        </Flex>
    ); 
}

export default Dashboard; 

 