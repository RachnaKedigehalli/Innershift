import { Grid, GridItem } from '@chakra-ui/react'
import Navbar from '../Components/Navbar';
import {DARK_OLIVE,BRIGHT_GREEN} from "../Constants" 

function Auth(){
    return(
        <div>
            <Navbar/>
            
            <Grid
                h='56em'
                templateRows='repeat(20, 1fr)'
                templateColumns='repeat(5, 1fr)'
                >
                <GridItem rowSpan={20} colSpan={1} bg={DARK_OLIVE} />
                <GridItem rowSpan={20} colSpan={4} bg={BRIGHT_GREEN} />
            </Grid>
        </div>
    ); 
}

export default Auth; 