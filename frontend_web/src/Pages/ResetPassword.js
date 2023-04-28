import { Grid, GridItem, Image,Center,Heading,Input,Button, VStack, HStack, Box, Flex, Text, useBoolean, FormControl } from '@chakra-ui/react'
// import Navbar from '../Components/Navbar';
import {DARK_OLIVE, DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM, LIGHT_GREEN} from "../Constants" 

import {faAngleLeft, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'

import logo from "../Assets/Logo/Logo_white.png"
import { useState } from 'react';
import axios from 'axios';
import {Form, useNavigate} from 'react-router-dom'
import { useStateValue } from '../StateProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ResetPassword(){
    // const [email,setEmail] = useState("")
    // const [password,setPassword] = useState("")
    // const [state, dispatch] = useStateValue();
    // const handleChangeEmail = (event) => setEmail(event.target.value)
    // const handleChangePassword = (event) => setPassword(event.target.value)

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

    const [matchPasswords, CheckPasswords] = useState('true');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [c_password, setConfirm] = useState('');

    const handleOtpChange = (e) => setOtp(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmChange = (e) => setConfirm(e.target.value);
    const confirmReset = () => {
        // validate otp

        // match passwords
        console.log("aaaaa", password, c_password);
        if(password != c_password){
            CheckPasswords(false);
            return;
        }
        navigate("/auth");
    }

    const navAuth = () => {
        console.log("hi");
        navigate("/auth");
    }

    return(
        <div>
            <Flex>
                <Box bg={DESKTOP_BG_MEDIUM} w='20%' minHeight='100vh'/>
                <VStack minHeight='100vh' align='center' w='100%'>
                    <Image src={logo} h='15em' mt={30} />
                    <Heading color='teal.700' > Reset Password</Heading>
                    {/* <Heading color='teal.700' size='sm'>Please Enter Your Details</Heading> */}
                    {/* <Form> */}
                            <Text color='teal.700' size='sm' >OTP</Text>
                        <FormControl align='center' isRequired>
                            <Input w='30%'size='lg' value={otp} onChange={handleOtpChange} focusBorderColor='teal.700' bgColor={LIGHT_GREEN} />
                        </FormControl>
                            <Text color='teal.700' size='sm' >Password</Text>
                        <FormControl align='center' isRequired>
                            <Input w='30%'size='lg' value={password} onChange={handlePasswordChange} type='password' focusBorderColor='teal.700' bgColor={LIGHT_GREEN} />
                        </FormControl>
                            <Text color='teal.700' size='sm' >Confirm Password</Text>
                        <FormControl align='center' isRequired>
                            <Input w='30%'size='lg' value={c_password} onChange={handleConfirmChange} type='password' focusBorderColor='teal.700' bgColor={LIGHT_GREEN} />
                        </FormControl>
                        <FormControl align='center'>
                            {matchPasswords? <></> : <Text color='red'><FontAwesomeIcon icon={faTriangleExclamation} style={{color: "#ff0000",}} /> Passwords do not match</Text>}
                            <Button bg='teal.700' color='white' size='md' style={{marginTop:"1em"}} onClick={confirmReset}>
                                Reset Password
                            </Button>
                        </FormControl>
                                                
                    {/* </Form> */}
                    {/* <Button  color='gray.500' bg='white' onClick={navAuth}> <FontAwesomeIcon icon={faAngleLeft} color='gray.500' style={{marginRight:"0.5em"}} /> Back to Login </Button> */}
                </VStack>
            </Flex>
        </div>
    ); 
}

export default ResetPassword; 