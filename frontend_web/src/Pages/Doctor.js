import { Grid, GridItem ,Heading,Image, Button,Center,Input} from '@chakra-ui/react'
import Navbar from '../Components/Navbar';
import {DESKTOP_BG_LIGHT,DESKTOP_BG_MEDIUM,DARK_OLIVE, LIGHT_GREEN, DARK_GREEN} from "../Constants" 
import logo from "../Assets/Logo/Logo_name.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie,faDatabase,faStethoscope,faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const onAddDoctor = (data,navigate) =>{
    
    console.log(data)
    navigate("/adddoctor/page1",{
        state:data
    })

}

function Doctor(){
    
    const location = useLocation();
    const navigate = useNavigate(); 

    useEffect(()=>{
        console.log(location.state)
    })
    
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

                    <Button ml = '5em' w = '12em' colorScheme='teal' variant='solid'>
                        <FontAwesomeIcon icon={faChartPie} style={{marginRight:"0.5em"}}/>  Dashboard
                    </Button>
                    
                    <Button ml = '5em' mt = '2em' w = '12em' colorScheme='teal' variant='solid'>
                        <FontAwesomeIcon icon={faStethoscope} style={{marginRight:"0.5em"}}/>  Doctors
                    </Button>

                    <Button ml = '5em' mt = '2em' w = '12em' colorScheme='teal' variant='solid'>
                        <FontAwesomeIcon icon={faDatabase} style={{marginRight:"0.5em"}}/>  Modules
                    </Button>

                </GridItem>
                
                
                <GridItem ml = '5em' mt = '6em' rowSpan={20} colSpan={4}>
                   <Grid h='15em' templateRows='repeat(20,1fr)' templateColumns='repeat(4,1fr)'>
                        {/* Search Bar */}
                        
                        <GridItem rowSpan={2} colSpan={4}>
                            <Grid templateRows='repeat(2,1fr)' templateColumns='repeat(4,1fr)'>
                                <GridItem colSpan={2} rowSpan={2} mr='5em'>
                                    <Input placeholder='Search Doctor'/> 
                                </GridItem>

                                <GridItem rowSpan={2} colSpan={1}  >
                                    <Button onClick={()=>onAddDoctor(location.state,navigate)} colorScheme='teal' size='md' style={{color:"black"}}>
                                        <FontAwesomeIcon icon={faCirclePlus} style={{marginRight:"0.5em"}}/> Add Doctor
                                    </Button>
                                </GridItem>

                               
                            </Grid>           
                        </GridItem>

                   </Grid>
                </GridItem>
            </Grid>
        </div>
    ); 
}

export default Doctor; 

 