import { faChartPie, faDatabase, faStethoscope, faUser} from "@fortawesome/free-solid-svg-icons";
import logo from "../Assets/Logo/Logo_name.png";
import { DESKTOP_BG_MEDIUM, } from "../Constants";
import { Button, Image, Box, VStack, Center} from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation, } from 'react-router-dom'
import { useStateValue } from '../StateProvider'

function SideDoctor() {
	const navigate = useNavigate();
	const location = useLocation();
	const [state,dispatch] = useStateValue();

	const clickDashBoard = () => {
		navigate('/home')
	}

    const onClickModules = () => {
        navigate('/admin/modules')
    }

    const onClickPatients = () => {
        navigate("/doctor/patients")
    }

    const onClickProfile = ()=>{
        navigate("/profile")
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

					<Button onClick={onClickPatients} ml='5em' mt='2em' w='12em' bg='teal.700' color='white'>
						<FontAwesomeIcon icon={faStethoscope} style={{ marginRight: "0.5em" }} />  Patients
					</Button>

					<Button onClick={onClickModules} ml='5em' mt='2em' w='12em' bg='teal.700' color='white'>
						<FontAwesomeIcon icon={faDatabase} style={{ marginRight: "0.5em" }} />  Modules
					</Button>

					<Button onClick={onClickProfile} ml = '5em' mt ='2em' w = '12em' bg='teal.700' color='white'>
                            <FontAwesomeIcon icon={faUser} style={{marginRight:"0.5em"}}/>  Profile
                    </Button>
				</VStack>
			</Center>
			



		</VStack>
	</Box>);
}

export default SideDoctor;