import { Grid, GridItem ,Image, Button} from '@chakra-ui/react'
import Navbar from '../Components/Navbar';
import {DESKTOP_BG_LIGHT,DESKTOP_BG_MEDIUM} from "../Constants" 
import logo from "../Assets/Logo/Logo_transparent.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie,faDatabase,faStethoscope } from '@fortawesome/free-solid-svg-icons'

function Dashboard(){
    return(
        <div>
            <Navbar/>
            
            <Grid
                h='56em'
                templateRows='repeat(20, 1fr)'
                templateColumns='repeat(5, 1fr)'
                >
                <GridItem rowSpan={20} colSpan={1} bg={DESKTOP_BG_LIGHT}>
                    {/* Logo Grid */}
                    <Grid 
                        h = '20em'
                        templateRows ='repeat(1,1fr)'
                        templateColumns='repeat(2,1fr)'
                        gap={2}
                    >
                        <GridItem mt = '3em' ml = '5em' colSpan={1}>
                                <Image src={logo} h='5em' />
                        </GridItem>
                        

                        <GridItem mt = '5em' colSpan={1}>
                            <h2>Innershift</h2>
                        </GridItem>
                    </Grid>
                    
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
                
                
                <GridItem rowSpan={20} colSpan={4} bg={DESKTOP_BG_MEDIUM} />
            </Grid>
        </div>
    ); 
}

export default Dashboard; 