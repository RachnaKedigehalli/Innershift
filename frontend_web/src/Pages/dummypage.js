import { Flex, Box, Heading, } from '@chakra-ui/react'
import SideDoctor from "../Components/SideDoctor";
import { DESKTOP_BG_LIGHT } from "../Constants";
import SideAdmin from '../Components/SideAdmin';




function Dummypage() {
	
	return (<div>
		<Flex>

			{/* This be side nav bar */}
			<SideAdmin />

			{/* This be main screen */}
			<Box bg={DESKTOP_BG_LIGHT} minHeight='100vh' w='80%' color='teal' ml='20%'>
				<Heading> This is a dummy page</Heading>
			</Box>

		</Flex>
	</div>);

}

export default Dummypage;