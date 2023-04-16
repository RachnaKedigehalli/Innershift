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
        
        console.log(details)
        axios.post('http://localhost:8080/api/v1/app/getDoctorById',details,auth)
        .then(response=>{
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
			<Box bg={DESKTOP_BG_LIGHT} minHeight='100vh' w='80%' ml='20%'>
				<VStack flexDirection='column' align='left' m={4} mt={10} divider={<StackDivider borderColor='gray.200' />}>
					
                    <Heading color='teal.700' m={3}> My Profile </Heading>
                    <ProfileDetails name= {doctorDetails[4] + " " + doctorDetails[5]}  email={doctorDetails[4]+"."+doctorDetails[5]+"@gmail.com"} phone="9876543210" license="1234567890" bio={doctorDetails[2]} degree={doctorDetails[3]} position={doctorDetails[1]}/>
					
				</VStack>
			</Box>
			
		</Flex>
	</div>);
	
}

export default DoctorProfile;