import {
	Grid,
	GridItem,
	Heading,
	Image,
	Button,
	Center,
	Input,
	Card,
	CardHeader,
	HStack,
	CardBody,
	VStack,
	Text,
	Flex,
	Box,
} from "@chakra-ui/react";
import { DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM } from "../../Constants";
import logo from "../../Assets/Logo/Logo_name.png";
import face from "../../Assets/Images/profile1.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChartPie,
	faDatabase,
	faStethoscope,
	faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStateValue } from "../../StateProvider";
import SideAdmin from "../../Components/SideAdmin";

const onAddDoctor = (navigate) => {
	navigate("/adddoctor/page1");
};

function PatientCard({ name, bio, currPos, license, degree }) {
	if(typeof name === 'undefined'){
		name = "Unavailable";
	}
	if(typeof name === 'undefined'){
		name = "Unavailable";
	}
	if(typeof bio === 'undefined'){
		bio = "Unavailable";
	}
	if(typeof currPos === 'undefined'){
		currPos = "Unavailable";
	}
	if(typeof license === 'undefined'){
		license = "Unavailable";
	}
	if(typeof degree === 'undefined'){
		degree = "Unavailable";
	}
	return (
		<div>
			<Card bg={DESKTOP_BG_MEDIUM}>
				<CardHeader>
					<HStack>
						<Image src={face} alt="Picture" borderRadius="full" w="3em" />
						<Heading size="md">
							{" "}
							<Text color="teal"> {name}</Text>{" "}
						</Heading>
					</HStack>
				</CardHeader>
				<CardBody>
					<VStack w="flex">
						<Flex w='100%' minW='100%'>
							<Text color='teal.700' as='b'>Bio:</Text>
							<Text color='teal.700' as='b' ml={1} noOfLines={3}>{bio}</Text>
						</Flex>

						<Flex w='100%' minW='100%'>
							<Text color='teal.700' as='b'>Degree:</Text>
							<Text color='teal.700' as='b' ml={1} >{degree}</Text>
						</Flex>
						
						<Flex w='100%' minW='100%'>
							<Text color='teal.700' as='b'>Current Position:</Text>
							<Text color='teal.700' as='b' ml={1} >{currPos}</Text>
						</Flex>

						<Flex w='100%' minW='100%'>
							<Text color='teal.700' as='b'>License ID:</Text>
							<Text color='teal.700' as='b' ml={1} >{license}</Text>
						</Flex>

					</VStack>
				</CardBody>
			</Card>
		</div>
	);
}

function Doctor() {
	const location = useLocation();
	const navigate = useNavigate();
	const [state, dispatch] = useStateValue();
	const [allDoctors, setAllDoctors] = useState([]);

	useEffect(() => {
		const auth = {
			headers: {
				Authorization: `Bearer ${state.adminToken}`,
			},
		};

		axios
			.get("http://localhost:8080/api/v1/app/getAllDoctors", auth)
			.then((response) => {
				console.log(response.data);
				setAllDoctors(response.data);
			});
	}, []);

	return (
		<Flex>
			<SideAdmin />
			<VStack minH="100vh" flex="1" overflowX="false" w="100%" p={3} pr={10}>
				<Grid ml={3} mt={10} templateColumns="repeat(7,1fr)" w="full" gap={3}>
					<GridItem colSpan={2}>
						{" "}
						<Heading color="teal.700"> Doctors </Heading>{" "}
					</GridItem>
					<GridItem colSpan={4}>
						<Input placeholder="Search Doctor" />
					</GridItem>

					<GridItem colSpan={1}>
						<Button
							onClick={() => onAddDoctor(navigate)}
							bg="teal.700"
							w="full"
							mr={5}
							style={{ color: "white" }}
						>
							<FontAwesomeIcon
								icon={faCirclePlus}
								style={{ marginRight: "0.5em" }}
							/>{" "}
							Add Doctor
						</Button>
					</GridItem>
				</Grid>

				<Box maxW="100%" minW="100%" maxHeight="85vh" overflowY="auto">
					{" "}
					<Grid templateColumns="repeat(4,1fr)" m={4} gap={4}>
						{allDoctors.map((item, index) => {
							return (
								<GridItem key={index}>
									<PatientCard
										name={item.firstName + " " + item.lastName}
										degree={item.degree}
										bio={item.biography}
										currPos={item.currentPos}
										license={item.licenseId}
									/>
								</GridItem>
							);
						})}
					</Grid>
				</Box>
			</VStack>

		</Flex>
	);
}

export default Doctor;
