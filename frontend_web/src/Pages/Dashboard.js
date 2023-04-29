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
import StackAreaAdmin from '../Components/StackAreaAdmin'


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
                <HStack w='100%' mt={10}>
						<Heading  size='lg' color='gray.600'> Welcome,</Heading> 
						<Heading color='teal.700'> {state.firstName} {state.lastName} </Heading>
				</HStack>

                {(state.role === 'ADMIN')?
                    <HStack>   
                        <Box maxW="20rem" maxH="20rem" mt = '5rem' ml ='2vw' mr='25vw'>
                            <PieChart/>
                        </Box>
                        <Box h='15rem' w='30rem' mt = '5rem'>
                            <StackAreaAdmin/>
                        </Box>
                    </HStack>
                :    
                    <HStack>   
                        <Box maxW="20rem" maxH="20rem" mt = '5rem'>
                            <PieChartDoctor/>
                        </Box>
                    </HStack>
                }
            </VStack>
        </Flex>
    ); 
}

export default Dashboard; 

 