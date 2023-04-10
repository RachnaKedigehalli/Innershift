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
		console.log("dashboard clicked");
		navigate('/dummyloc', {
			// state: location.state
		})
	}

	const clickDoctors = () => {
		// console.log("i cri");
		navigate('/doctor', {
			state: location.state
		})
	}

	const clickModules = () => {
		navigate('/admin/modules', {
			// state: location.state
		})
	}
	return (<Box bg={DESKTOP_BG_MEDIUM} w='20%' minHeight='100vh' position='fixed'>
		<VStack spacing={3} align='center'>
			<Image src={logo} h='9em' />
			<Box>

			</Box>
			<Center>
				<VStack width="100%">
					<Button onClick={clickDashBoard} width='100%' bg='teal.700' color='white'>
						<FontAwesomeIcon icon={faChartPie} style={{ marginRight: "0.5em" }} />  Dashboard
					</Button>

					<Button onClick={clickDoctors} width='100%' bg='teal.700' color='white'>
						<FontAwesomeIcon icon={faStethoscope} style={{ marginRight: "0.5em" }} />  Doctors
					</Button>

					<Button onClick={clickModules} width='100%' bg='teal.700' color='white'>
						<FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5em" }} />  Modules
					</Button>
				</VStack>
			</Center>




		</VStack>
	</Box>);
}

export default SideAdmin;