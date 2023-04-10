import { Grid, GridItem, Image,Center,Heading,Input,Button} from '@chakra-ui/react'
import Navbar from '../Components/Navbar';
import {DARK_OLIVE,BRIGHT_GREEN, DARK_GREEN, LIGHT_GREEN} from "../Constants" 


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
                console.log("Authentication Response Data : ", response.data)
                await dispatch({
                    type: "setAdminToken",
                    payload: {
                      adminToken: response.data.token,
                    },
                  });
                navigate("/home",{
                    state:{response:response.data}}
                )
            })
    }

    return(
        <div>
            
            <Grid
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

            </Grid>
        </div>
    ); 
}

export default Auth; 