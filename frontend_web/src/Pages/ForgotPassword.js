import { Grid, GridItem, Image,Center,Heading,Input,Button, VStack, HStack, Box, Flex, Text, useBoolean } from '@chakra-ui/react'
// import Navbar from '../Components/Navbar';
import {DARK_OLIVE, DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM, LIGHT_GREEN} from "../Constants" 

import {faAngleLeft, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'

import logo from "../Assets/Logo/Logo_white.png"
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useStateValue } from '../StateProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ForgotPassword(){
    const [email,setEmail] = useState({target:{value:""}})
    const [state, dispatch] = useStateValue();


    const navigate = useNavigate();

    // const onSubmit = ()=>{
    //     const credentials = {email:email,password:password}
    //     axios.post('http://localhost:8080/api/v1/auth/authenticate',credentials)
    //         .then(async (response)=>{
                
    //             await dispatch({
    //                 type: "setAdminToken",
    //                 payload: {
    //                   adminToken: response.data.token,
    //                 },
    //               });
    //             await dispatch({
    //                 type:"setRole",
    //                 payload: {
    //                     role:response.data.role,
    //                 },
    //             }); 

    //             await dispatch({
    //                 type:"setFirstName",
    //                 payload: {
    //                     firstName:response.data.firstName,
    //                 },
    //             });

    //             await dispatch({
    //                 type:"setLastName",
    //                 payload: {
    //                     lastName:response.data.lastName,
    //                 },
    //             });

    //             await dispatch({
    //                 type:"setUserId",
    //                 payload: {
    //                     id:response.data.id,
    //                 },
    //             });
                
    //             navigate("/home",{
    //                 state:{response:response.data}}
    //             )
    //         })
        
    // }

    const [validEmail, setValidEmail] = useState(true);

    const sendOTP = () => {
        setValidEmail(false);
        const credentials = {email:email.target.value} 
        axios.post("http://localhost:8080/api/v1/auth/forgotPassword",credentials)
        .then((response)=>
            console.log(response.data)
        )

        navigate("/confirmOTP",{
            state:{
                email:email.target.value
            }
        });
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
                    <Heading color='teal.700' size='sm' >Email</Heading>
                        <Input onChange={setEmail} w='30%'size='lg' bgColor={LIGHT_GREEN} />
                    {validEmail? <></> : <Text color='red'><FontAwesomeIcon icon={faTriangleExclamation} style={{color: "#ff0000",}} />   Invalid email</Text>}
                    <Button bg='teal.700' color='white' size='md' style={{marginTop:"1em"}} onClick={sendOTP}>
                                    Send OTP
                    </Button>
                    <Button  color='gray.500' bg='white' onClick={navAuth}> <FontAwesomeIcon icon={faAngleLeft} color='gray.500' style={{marginRight:"0.5em"}} /> Back to Login </Button>
                </VStack>
            </Flex>
        </div>
    ); 
}

export default ForgotPassword; 