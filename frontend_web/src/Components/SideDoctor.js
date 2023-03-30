import { faChartPie, faDatabase, faStethoscope } from "@fortawesome/free-solid-svg-icons";
import logo from "../Assets/Logo/Logo_name.png";
import { DESKTOP_BG_MEDIUM, } from "../Constants";
import { Button, Image, Box, VStack} from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate, useLocation, } from 'react-router-dom'

function SideDoctor() {
	const navigate = useNavigate();
	const location = useLocation();

	const clickDashBoard = () => {
		console.log("dashboard clicked");
		navigate('/dummyloc', {
			// state: location.state
		})
	}

	const clickPatients = () => {
		console.log("i cri");
		navigate('/doctor/patients', {
			state: location.state
		})
	}

	const clickModules = () => {
		navigate('/dummyloc', {
			// state: location.state
		})
	}
	return (<Box bg={DESKTOP_BG_MEDIUM} w='20%' minHeight='100vh' position='fixed'>
		<VStack spacing={3} align='center'>
			<Image src={logo} h='9em' />
			<Box>

			</Box>
			<Button onClick={clickDashBoard} ml='5em' w='12em' colorScheme='teal' variant='solid'>
				<FontAwesomeIcon icon={faChartPie} style={{ marginRight: "0.5em" }} />  Dashboard
			</Button>

			<Button onClick={clickPatients} ml='5em' mt='2em' w='12em' colorScheme='teal' variant='solid'>
				<FontAwesomeIcon icon={faStethoscope} style={{ marginRight: "0.5em" }} />  Patients
			</Button>

			<Button onClick={clickModules} ml='5em' mt='2em' w='12em' colorScheme='teal' variant='solid'>
				<FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5em" }} />  Modules
			</Button>



		</VStack>
	</Box>);
}

export default SideDoctor;