import { Grid, GridItem ,Heading,Image, Button,Center,Box, HStack, VStack, Flex, Card, CardBody, Text} from '@chakra-ui/react'
import {DESKTOP_BG_MEDIUM, DARK_GREEN, DESKTOP_BG_LIGHT} from "./Constants" 
import logo from "./Assets/Logo/Logo_name.png"

import admin_dp from "./Assets/Images/admin_dp.png"
import doctor_dp from "./Assets/Images/profile1.jpg"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie,faDatabase,faStethoscope,faUser } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { useStateValue } from './StateProvider'
import PieChart from './Components/DoughnutAdmin'
import PieChartDoctor from './Components/DoughnutDoctor'
import SideAdmin from './Components/SideAdmin'
import SideDoctor from './Components/SideDoctor'


function Tmp(){
    // const location = useLocation();
    // const navigate = useNavigate();
    // const [state, dispatch] = useStateValue(); 

    // useEffect(()=>{
    //     console.log(state)
    // },[location])

	const InfoDetail = ({field, value, lines}) => {
		if(typeof lines === 'undefined'){
			lines=1;
		}
		return(<Flex w='100%'>
			<Text color='teal.700' verticalAlign='top' fontWeight='bold' >{field}:</Text>
			<Text color='teal.700' ml={1} noOfLines={lines}>{value}</Text>
		</Flex>);
	}

	const PersonalInfo = ({name, email, photo, phone, user}) => {
		if(typeof photo === 'undefined'){
			user === 'admin'? photo = admin_dp : photo = doctor_dp;
		}
	

		return(<Card m='1' bg={DESKTOP_BG_MEDIUM}>
			<CardBody>
				<VStack>
					<Image src={photo} alt={name} boxSize='50%' borderRadius='full' align='center'/>
					<InfoDetail field="Name" value={name}/>
					<InfoDetail field="Email" value={email}/>
					<InfoDetail field="Phone" value={phone}/>
				</VStack>
			</CardBody>
		</Card>)
	}

	const DoctorInfo = ({license, bio, degree, position}) => {
		return(<Card bg={DESKTOP_BG_MEDIUM} w='100%' m={1}>
			<CardBody>
				<Heading color='teal.700'> Bio </Heading>
				<InfoDetail field="License ID" value={license}/>
				<InfoDetail field="Bio" value={bio} lines={3}/>
				<InfoDetail field="Degree" value={degree}/>
				<InfoDetail field="Current Position" value={position}/>
				
			</CardBody>
		</Card>)
	}

    return(
        <Flex>
			<SideAdmin/>
			<Box flex='1'm={3} >
				<VStack mt={10}>
					<HStack w='100%'>
						<Heading  size='lg' color='gray.600'> Welcome,</Heading> 
						<Heading color='teal.700'> User Name </Heading>
					</HStack>
					<Flex w='100%'>
						<VStack w='25%'> 
							{/* {(state.role === 'ADMIN')?
								<PersonalInfo name="Admin Name" email="admin@somemail.com" phone="9876543210" user="admin"/>
							:       
								<PersonalInfo name="Doctor Name" email="admin@somemail.com" phone="9876543210" user="doctor/>
							} */}
							<PersonalInfo name="Admin Name" email="admin@somemail.com" phone="9876543210" user="doctor"/>
							<DoctorInfo license='123456789' bio='this is my bio. i am a doctor. i work in so and so hospital and this is my specialization. i have so and so awards and have these other merits.' degree='mbbs' position='doctor'/>
						</VStack>
						<VStack flex='1'>
							<Box bg='gray.100' w='100%'>
								Charts
							</Box>
						</VStack>
					</Flex>
				</VStack>

			</Box>
            {/* <Grid
                h='60em'
                templateRows='repeat(20, 1fr)'
                templateColumns='repeat(5, 1fr)'
                >

                <GridItem rowSpan={20} colSpan={1} bg={DESKTOP_BG_MEDIUM}>
                    {(state.role === 'ADMIN')?
                        <SideAdmin/>:
                        <SideDoctor/>
                    } 
					<SideAdmin/>
                </GridItem>
                
                
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
					<Box maxW="20rem"  minH="20rem" maxH="20rem" mt = '5rem' bg='blue.100'> Donut chart </Box>
                </GridItem>
            </Grid> */}
        </Flex>
    ); 
}

export default Tmp; 

 