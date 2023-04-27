import { faChartPie, faDatabase, faStethoscope } from "@fortawesome/free-solid-svg-icons";
import logo from "../Assets/Logo/Logo_name.png";
import { DESKTOP_BG_MEDIUM, } from "../Constants";
import { Button, Image, Box, VStack, Center } from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate, useLocation, } from 'react-router-dom'

function SideAdmin() {
	const navigate = useNavigate();
	const location = useLocation();

	const clickDashBoard = () => {
		navigate('/home')	
	}

	const onClickDoctors = ()=>{
        navigate('/doctor')
    }
	const onClickModules = () => {
        navigate('/admin/modules')
    }

    const onClickPatients = () => {
        navigate("/admin/patients")
    }

	

	return (
	// <Box >
		<VStack bg={DESKTOP_BG_MEDIUM} w='20%' minHeight='100vh' spacing={3} align='center'>
			<Image src={logo} h='9em' />
			<Box>

			</Box>
			<Center>
				<VStack width="100%">
					<Button onClick={clickDashBoard} width='100%' bg='teal.700' color='white'>
						<FontAwesomeIcon icon={faChartPie} style={{ marginRight: "0.5em" }} />  Dashboard
					</Button>

					<Button onClick={onClickDoctors} width='100%' bg='teal.700' color='white'>
						<FontAwesomeIcon icon={faStethoscope} style={{ marginRight: "0.5em" }} />  Doctors
					</Button>
					
					<Button onClick={onClickModules} width='100%' bg='teal.700' color='white'>
						<FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5em" }} />  Modules
					</Button>
				</VStack>
			</Center>




		</VStack>
	// </Box>
	);
}

export default SideAdmin;