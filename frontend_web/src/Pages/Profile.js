import { Flex, Button, Text, Box, VStack, HStack, StackDivider, Heading } from '@chakra-ui/react'
import SideDoctor from "../Components/SideDoctor";
import { DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM } from "../Constants";


import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import axios from 'axios';


function DoctorProfile(){
    const [state,dispatch] = useStateValue(); 
    const [doctorDetails,setDoctorDetails] = useState([]); 

    useEffect(()=>{

		const auth = {
            headers: {
                Authorization: `Bearer ${state.adminToken}`
            }
        }

		const details = {
			doctorId:state.id
		}
        
        
        axios.post('http://localhost:8080/api/v1/app/getDoctorById',details,auth)
        .then(response=>{
            console.log(response.data)
            setDoctorDetails(response.data)
        })
    },[])

    const InfoCard = ({field, value, nLines}) =>{
        if(!nLines){
            nLines = 1;
        }
        return(<HStack m={3}>
            <Box w = {180}>
                <Text color='teal.700' as='b' fontSize='xl'> {field}: </Text>
            </Box>
            <Box w = 'flex'>
                <Text noOfLines={nLines} color='teal.700'> {value}</Text>
            </Box>
        </HStack>)
    }

    const ProfileDetails = ({name, email, phone, license, bio, degree, position}) => {
        return (<Box>
            <InfoCard field="Name" value={name}/>
            <InfoCard field="Email" value={email}/>
            <InfoCard field="Phone Number" value={phone}/>
            <InfoCard field="License ID" value={license}/>
            <InfoCard field="Biography" value={bio}/>
            <InfoCard field="Degree" value={degree}/>
            <InfoCard field="Current Position" value={position}/>
            
        </Box>);
    }

    

	return(<div> 
		<Flex>

			{/* This be side nav bar */}
			<SideDoctor/>

			{/* This be main screen */}
			<Box minHeight='100vh'flex='1'>
				<VStack flexDirection='column' align='left' m={4} mt={10} divider={<StackDivider borderColor='gray.200' />}>
                    <Heading color='teal.700' m={3}> My Profile </Heading>
                    <ProfileDetails name= {doctorDetails.firstName + " " + doctorDetails.lastName}  email={doctorDetails.firstName+"."+doctorDetails.lastName+"@gmail.com"} phone={doctorDetails.phoneNumber} license={doctorDetails.licenseId} bio={doctorDetails.biography} degree={doctorDetails.degree} position={doctorDetails.currentPos}/>
				</VStack>
			</Box>
			
		</Flex>
	</div>);
	
}

export default DoctorProfile;