import { Grid, GridItem ,Heading,Image, Button,Center,Input,Card,CardHeader,HStack,CardBody,VStack,Text } from '@chakra-ui/react'
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
		<Card bg={DESKTOP_BG_LIGHT} h='100%'>
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


function Doctor(){
    
    const location = useLocation();
    const navigate = useNavigate(); 
    const [state, dispatch] = useStateValue();
    const [allDoctors, setAllDoctors] = useState([]); 

    useEffect(()=>{
        
        const auth = {
            headers: {
                Authorization: `Bearer ${state.adminToken}`
            }
        }

        axios.get('http://localhost:8080/api/v1/app/getAllDoctors',auth)
        .then(response=>{
            setAllDoctors(response.data)
        })
    },[])
    
    return(
        <div>
            <Grid
                h='60em'
                templateRows='repeat(20, 1fr)'
                templateColumns='repeat(5, 1fr)'
                >

                <GridItem rowSpan={20} colSpan={1} bg={DESKTOP_BG_MEDIUM}>
                    <SideAdmin/>
                </GridItem>
                
                
                <GridItem ml = '5em' mt = '6em' rowSpan={20} colSpan={4}>
                   <Grid h='15em' templateRows='repeat(2,1fr)' templateColumns='repeat(4,1fr)'>
                     
                        <GridItem rowSpan={2} colSpan={4}>
                            <Grid templateRows='repeat(2,1fr)' templateColumns='repeat(4,1fr)'>
                                <GridItem colSpan={2} rowSpan={2} mr='5em'>
                                    <Input placeholder='Search Doctor'/> 
                                </GridItem>

                                <GridItem rowSpan={2} colSpan={1}  >
                                    <Button onClick={()=>onAddDoctor(navigate)} colorScheme='teal' size='md' style={{color:"black"}}>
                                        <FontAwesomeIcon icon={faCirclePlus} style={{marginRight:"0.5em"}}/> Add Doctor
                                    </Button>
                                </GridItem>        
                            </Grid>           
                        </GridItem>

                        
                        <GridItem rowSpan={16} colSpan={4}>
                            <Grid templateRows='repeat(2,1fr)' templateColumns='repeat(4,1fr)'>
                                {allDoctors.map((item,index)=>{
                                    return(
                                        <GridItem mt='7em' mr='5em'>
                                                <PatientCard name={item[4] + " " + item[5]} desc={item[3]} key={index}/>
                                        </GridItem>
                                    )
                                })}
                           </Grid>
                        </GridItem>
                   </Grid>

                </GridItem>
            </Grid>
        </div>
    ); 
}

export default Doctor; 

 