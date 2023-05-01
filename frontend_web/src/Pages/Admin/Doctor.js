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

function PatientCard({ name, desc, bio }) {
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
            <Text h={45} color="teal" noOfLines={3}>
              {" "}
              {desc}{" "}
            </Text>
            <Text h={10} color="teal" noOfLines={3}>
              {" "}
              {bio}{" "}
            </Text>
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
                    desc={item.degree}
                    bio={item.biography}
                  />
                </GridItem>
              );
            })}
          </Grid>
        </Box>
      </VStack>

      {/* <Grid
                h='60em'
                templateRows='repeat(20, 1fr)'
                templateColumns='repeat(5, 1fr)'
                >

                
                
                <GridItem ml = '5em' mt = '6em' rowSpan={20} colSpan={4}>
                   <Grid h='15em' templateRows='repeat(2,1fr)' templateColumns='repeat(4,1fr)'>
                     
                        <GridItem rowSpan={2} colSpan={4}>
                               
                        </GridItem>

                        
                        <GridItem rowSpan={16} colSpan={4}>
                            <Grid templateRows='repeat(2,1fr)' templateColumns='repeat(4,1fr)'>
                                {allDoctors.map((item,index)=>{
                                    return(
                                        <GridItem mt='7em' mr='5em'>
                                                <PatientCard name={item[4] + " " + item[5]} desc={item[3]} key={index}/>
                                        </GridItem>
                                    )
                                })}
                           </Grid>
                        </GridItem>
                   </Grid>

                </GridItem>
            </Grid> */}
    </Flex>
  );
}

export default Doctor;
