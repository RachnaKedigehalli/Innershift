import { Grid, GridItem, Image,Center,Heading,Input,Button, VStack, HStack, Box, Flex} from '@chakra-ui/react'
// import Navbar from '../Components/Navbar';
import {DARK_OLIVE, DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM, LIGHT_GREEN} from "../Constants" 


import logo from "../Assets/Logo/Logo_white.png"
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useStateValue } from '../StateProvider';

function Auth(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [state, dispatch] = useStateValue();
    const handleChangeEmail = (event) => setEmail(event.target.value)
    const handleChangePassword = (event) => setPassword(event.target.value)

    const navigate = useNavigate();

    const onSubmit = ()=>{
        const credentials = {email:email,password:password}
        axios.post('http://localhost:8080/api/v1/auth/authenticate',credentials)
            .then(async (response)=>{
                
                await dispatch({
                    type: "setAdminToken",
                    payload: {
                      adminToken: response.data.token,
                    },
                  });
                await dispatch({
                    type:"setRole",
                    payload: {
                        role:response.data.role,
                    },
                }); 

                await dispatch({
                    type:"setFirstName",
                    payload: {
                        firstName:response.data.firstName,
                    },
                });

                await dispatch({
                    type:"setLastName",
                    payload: {
                        lastName:response.data.lastName,
                    },
                });

                await dispatch({
                    type:"setUserId",
                    payload: {
                        id:response.data.id,
                    },
                });
                
                navigate("/home",{
                    state:{response:response.data}}
                )
            })
        
    }

    return(
        <div>
            <Flex>
                <Box bg={DARK_OLIVE} w='20%' minHeight='100vh'/>
                <VStack minHeight='100vh' align='center' w='100%'>
                    <Image src={logo} h='15em' mt={90} />
                    <Heading color='teal.700' > Welcome Back</Heading>
                    <Heading color='teal.700' size='sm'>Please Enter Your Details</Heading>
                    <Heading color='teal.700' size='sm' >Username/Email</Heading>
                        <Input w='30%' value={email}  onChange={handleChangeEmail} size='lg' bgColor={LIGHT_GREEN} />
                    <Heading color='teal.700' size='sm' >Password</Heading>
                        <Input w='30%' value={password} type='password' onChange={handleChangePassword} size='lg' bgColor={LIGHT_GREEN} />
                    <Button onClick={onSubmit} bg='teal.600' color='white' size='lg'>
                                    Login
                        </Button>
                    <Heading color='teal.700' size="xs"> Forgot Password?</Heading>
                </VStack>
            </Flex>
            
            
            {/* <Grid
                h='61em'
                templateRows='repeat(20, 1fr)'
                templateColumns='repeat(5, 1fr)'
                >
                <GridItem rowSpan={20} colSpan={1} bg={DARK_OLIVE}>
                    
                </GridItem>
                
                <GridItem rowSpan={20} colSpan={4}>
                    <Grid>
                        <Center mt = '5em'>
                            <GridItem rowSpan={4}>
                                <Image src={logo} h='15em' />
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

                        
                        <GridItem mt='12em' ml = '25em' mr='25em'>
                            <Heading size='sm' >Username/Email</Heading>
                                <Input value={email}  onChange={handleChangeEmail} size='lg' bgColor={LIGHT_GREEN} />
                        </GridItem>
                        
                        <GridItem mt='2em' ml = '25em' mr='25em'>
                            <Heading size='sm' >Password</Heading>
                                <Input value={password} type='password' onChange={handleChangePassword} size='lg' bgColor={LIGHT_GREEN} />
                        </GridItem>

                        <Center mt='2em'>
                            <Button onClick={onSubmit} colorScheme='teal' size='lg' style={{color:"black"}}>
                                        Login
                            </Button>
                        </Center>

                        <Center mt='2em'>
                            <Heading size="xs"> Forgot Password?</Heading>
                        </Center>
                    </Grid>

                </GridItem>

            </Grid> */}
        </div>
    ); 
}

export default Auth; 