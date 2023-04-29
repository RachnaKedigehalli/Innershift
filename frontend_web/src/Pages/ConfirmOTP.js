import { Grid, GridItem, Image,Center,Heading,Input,Button, VStack, HStack, Box, Flex, Text, useBoolean } from '@chakra-ui/react'
// import Navbar from '../Components/Navbar';
import {DARK_OLIVE, DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM, LIGHT_GREEN} from "../Constants" 

import {faAngleLeft, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'

import logo from "../Assets/Logo/Logo_white.png"
import { useState } from 'react';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom'
import { useStateValue } from '../StateProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ConfirmOTP(){
    const location = useLocation()

    const [otp,setOTP] = useState({target:{value:""}})
    const [state, dispatch] = useStateValue();
    


    const navigate = useNavigate();
    const [validEmail, setValidEmail] = useState(true);

    const sendOTP = () => {
        const credentials = {
            email:location.state.email,
            token:otp.target.value  
        }

        axios.post("http://localhost:8080/api/v1/auth/confirmForgotPasswordOTP",credentials)
        .then((response)=>
            navigate("/resetpassword",{
                state:{
                    email:location.state.email,
                    otp:otp.target.value, 
                    authToken:response.data.token, 
                }
            })
        )
    }

    const navAuth = () => {
        navigate("/auth");
    }

    return(
        <div>
            <Flex>
                <Box bg={DESKTOP_BG_MEDIUM} w='20%' minHeight='100vh'/>
                <VStack minHeight='100vh' align='center' w='100%'>
                    <Image src={logo} h='15em' mt={61} />
                    <Heading color='teal.700' > Reset Password</Heading>
                    {/* <Heading color='teal.700' size='sm'>Please Enter Your Details</Heading> */}
                    <Heading color='teal.700' size='sm' >Confirm OTP</Heading>
                        <Input onChange={setOTP} w='30%'size='lg' bgColor={LIGHT_GREEN} />
                    {validEmail? <></> : <Text color='red'><FontAwesomeIcon icon={faTriangleExclamation} style={{color: "#ff0000",}} />Invalid OTP</Text>}
                    <Button bg='teal.700' color='white' size='md' style={{marginTop:"1em"}} onClick={sendOTP}>
                                    Confirm OTP
                    </Button>
                    <Button  color='gray.500' bg='white' onClick={navAuth}> <FontAwesomeIcon icon={faAngleLeft} color='gray.500' style={{marginRight:"0.5em"}} /> Back to Login </Button>
                </VStack>
            </Flex>
        </div>
    ); 
}

export default ConfirmOTP; 