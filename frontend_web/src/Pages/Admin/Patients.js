import { Grid, GridItem ,Heading,Image, Button,Center,Input,Card,CardHeader,HStack,CardBody,VStack,Text, StackDivider, Box } from '@chakra-ui/react'
import {DESKTOP_BG_LIGHT,DESKTOP_BG_MEDIUM } from "../../Constants" 
import logo from "../../Assets/Logo/Logo_name.png"
import face from "../../Assets/Images/profile1.jpg"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie,faDatabase,faStethoscope,faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate} from 'react-router-dom';
import { useEffect,useState} from 'react';
import axios from 'axios'
import { useStateValue } from '../../StateProvider'
import SideAdmin from '../../Components/SideAdmin'


const onAddDoctor = (navigate) =>{
    navigate("/adddoctor/page1")
}

function PatientCard({name, desc}){
	return(<div>
		<Card bg={DESKTOP_BG_MEDIUM}>
			<CardHeader>
				<HStack>
					<Image
						src={face}
						alt='Picture'
						borderRadius='full'
                        w='3em'
					/>
					<Heading size="md"> <Text color='teal'> {name}</Text> </Heading>
				</HStack>
			</CardHeader>
			<CardBody>
				<VStack w='flex'>
					<Text  h={75} color='teal' noOfLines={3}> {desc} </Text>
				</VStack>
			</CardBody>
		</Card>
	</div>);
}


function AdminPatients(){
    
    const location = useLocation();
    const navigate = useNavigate(); 
    const [state, dispatch] = useStateValue();
    const [allPatients, setAllPatients] = useState([]); 

    useEffect(()=>{
        
        const auth = {
            headers: {
                Authorization: `Bearer ${state.adminToken}`
            }
        }

        axios.get('http://localhost:8080/api/v1/app/getAllPatients',auth)
        .then(response=>{
            setAllPatients(response.data)
        })
    },[])
    
    return(
        <div>
            <SideAdmin/>
            <Box minHeight='100vh' w='80%' ml='20%'>
                <VStack flexDirection='column' align='left'>
                        
                    {/* existing patients heading */}
                    <Grid templateColumns='repeat(7, 1fr)' w='flex' gap={6} margin={3} mt='3em'>
                        <GridItem colSpan={2} ml={2} mt={1}> <Heading color='teal.700'> All Patients </Heading> </GridItem>
                        <GridItem colSpan={4} rowSpan={2} mt={1}>
                            <Input placeholder='Search Patient'/> 
                        </GridItem>

                        <GridItem  mt={1}>
                        {/* <Button onClick={()=>onAddDoctor(navigate)} bg='teal.700' size='md' style={{color:"white"}}> */}
                            <Button bg='teal.700' size='md' style={{color:"white"}}>
                                <FontAwesomeIcon icon={faCirclePlus} style={{marginRight:"0.5em"}}/> Add Doctor
                            </Button>
                        </GridItem>        
                    </Grid>           

                    <Box overflowY='auto' w='100%'>
                        <Grid templateColumns='repeat(4,1fr)' ml={5} mr={5} gap={3}>
                            {allPatients.map((item,index)=>{
                                return(
                                    <GridItem mt='7em' mr='5em' key={index}>
                                            <PatientCard name={item.firstName+ " " + item.lastName} desc={item.emergencyContact}/>
                                    </GridItem>
                                )
                            })}
                        </Grid>
                    </Box>
                </VStack>
            </Box>
        </div>
    ); 
}

export default AdminPatients; 

 