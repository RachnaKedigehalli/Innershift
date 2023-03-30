import { Grid, GridItem ,Heading,Image, Button,Center,Input, defineStyle, defineStyleConfig, Text} from '@chakra-ui/react'
import Navbar from '../Components/Navbar';
import {DESKTOP_BG_LIGHT,DESKTOP_BG_MEDIUM,DARK_OLIVE, LIGHT_GREEN, DARK_GREEN} from "../Constants" 
import logo from "../Assets/Logo/Logo_name.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie,faDatabase,faStethoscope,faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
// import { headingTheme } from './components/heading'

// export const theme = extendTheme({
//   components: { Heading: headingTheme },
// })


const custom = defineStyle({
    color: "DARK_OLIVE"
    // let's also provide dark mode alternatives
})

function UserForm() {
    return(
        <form>
            <FormControl isRequired mt={6}>
                <FormLabel color={DARK_GREEN}>Name</FormLabel>
                <Input type='text' placeholder='Full Name'/>
                {/* <FormHelperText>Full Name</FormHelperText> */}
            </FormControl>

            <FormControl>
                <FormLabel mt={6} color={DARK_GREEN}>Email address</FormLabel>
                <Input type='email' placeholder='We will never share your email'/>
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>

            <FormControl>
                <FormLabel mt={6} color={DARK_GREEN}>Phone</FormLabel>
                <Input type='text' style={{color:'teal'}} placeholder="Enter Phone Number" />
                {/* <FormHelperText>Full Name</FormHelperText> */}
            </FormControl>
            
            <Button width="full" mt={4} colorScheme='teal' variant="solid" type="submit" >
              Continue
            </Button>
        </form>
        
    );
}

function AddDoctor_user(){
    return(
        <div>
            <Grid
                h='60em'
                templateRows='repeat(20, 1fr)'
                templateColumns='repeat(5, 1fr)'
                >

                {/* Side bar */}
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

                                {/* <MyForm/> */}
                                {/* <GridItem rowSpan={2} colSpan={1}  >
                                    <Button  colorScheme='teal' size='md' style={{color:"black"}}>
                                    <FontAwesomeIcon icon={faCirclePlus} style={{marginRight:"0.5em"}}/> Add Doctor
                                    </Button>
                                </GridItem>

                                <GridItem colSpan={2} rowSpan={2} mr='5em'>
                                    <Input placeholder='?? Doctor'/> 
                                </GridItem>  */}

                                <GridItem colSpan={5} rowSpan={2}>
                                    <Heading color={DARK_GREEN}>Enter Doctor's Data</Heading>
                                </GridItem>
                                <GridItem colSpan={2} rowSpan={2} mr='5em'>
                                    <UserForm/>
                                </GridItem>



                               
                            </Grid>           
                        </GridItem>

                   </Grid>
                </GridItem>
            </Grid>
        </div>
    ); 
}

export default AddDoctor_user; 

 