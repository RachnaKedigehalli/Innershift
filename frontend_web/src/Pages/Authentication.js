import { Grid, GridItem, Image,Center,Heading,Input} from '@chakra-ui/react'
import Navbar from '../Components/Navbar';
import {DARK_OLIVE,BRIGHT_GREEN, DARK_GREEN} from "../Constants" 

import logo from "../Assets/Logo/Logo_transparent.png"

function Auth(){
    return(
        <div>
            {/* <Navbar/> */}
            
            <Grid
                h='59em'
                templateRows='repeat(20, 1fr)'
                templateColumns='repeat(5, 1fr)'
                >
                <GridItem rowSpan={20} colSpan={1} bg={DARK_OLIVE}>
                    
                </GridItem>
                
                <GridItem rowSpan={20} colSpan={4}>
                    <Grid>
                        <Center mt = '5em'>
                            <GridItem rowSpan={4}>
                                <Image src={logo} h='5em' />
                            </GridItem>
                        </Center>

                        <Center>
                            <GridItem rowSpan={4}>
                                <Heading> Welcome Back</Heading>
                            </GridItem>
                        </Center>

                        <Center>
                            <GridItem rowSpan={4}>
                                <Heading size='sm'>Please Enter Your Details</Heading>
                            </GridItem>
                        </Center>

                        
                        <GridItem mt='15em' ml = '15em' mr='15em'>
                            <Heading size='sm' >Username/Email</Heading>
                                <Input size='lg' bgColor={DARK_OLIVE} />
                        </GridItem>
                        
                        <GridItem mt='3em' ml = '15em' mr='15em'>
                            <Heading size='sm' >Password</Heading>
                                <Input size='lg' bgColor={DARK_OLIVE} />
                        </GridItem>

                        <Center mt='2em'>
                            <Heading size="xs" color={DARK_GREEN}> Forgot Password?</Heading>
                        </Center>
                    </Grid>

                </GridItem>

            </Grid>
        </div>
    ); 
}

export default Auth; 