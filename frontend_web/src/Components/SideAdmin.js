import { faChartPie, faDatabase, faStethoscope } from "@fortawesome/free-solid-svg-icons";
import logo from "../Assets/Logo/Logo_name.png";
import { DESKTOP_BG_MEDIUM, } from "../Constants";
import { Button, Image, Box, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SideAdmin() {
	return (<Box bg={DESKTOP_BG_MEDIUM} w='20%' minHeight='100vh' position='fixed'>
		<VStack spacing={3} align='center'>
			<Image src={logo} h='9em' />
			<Box>

			</Box>
			<Button ml='5em' w='12em' colorScheme='teal' variant='solid'>
				<FontAwesomeIcon icon={faChartPie} style={{ marginRight: "0.5em" }} />  Dashboard
			</Button>

			<Button ml='5em' mt='2em' w='12em' colorScheme='teal' variant='solid'>
				<FontAwesomeIcon icon={faStethoscope} style={{ marginRight: "0.5em" }} />  Doctors
			</Button>

			<Button ml='5em' mt='2em' w='12em' colorScheme='teal' variant='solid'>
				<FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5em" }} />  Modules
			</Button>



		</VStack>
	</Box>);
}

export default SideAdmin;