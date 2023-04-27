import { Flex, Card, Button, RadioGroup, Radio,Text, Box, VStack,  HStack,  Heading, Input, CardBody, extendTheme, withDefaultVariant, ButtonGroup } from '@chakra-ui/react'
import { DESKTOP_BG_LIGHT, DESKTOP_BG_MEDIUM } from "../../Constants";

import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
} from '@chakra-ui/react'

import {useEffect, useState} from 'react';


function FormTask({tasks,setTasks,index}){

    const [type,setType] = useState(0)
    const [title,setTitle] = useState({target:{value:""}})
    const [description,setDescription] = useState({target:{value:""}})
    const [content,setContent] = useState({target:{value:""}})

    useEffect(()=>{
        var temp = tasks; 
        temp[index].type = type
        temp[index].title = title.target.value
        temp[index].description = description.target.value
        temp[index].content = content.target.value
        setTasks(temp)
    },[type,title,description,content])

    return(
        <Box w = 'flex' padding={2} key={index}>
			<Card bg={DESKTOP_BG_LIGHT}>
				<CardBody color='teal.700'>
					<Heading color='teal.700' align='left' size='lg'>Question {index+1} </Heading>
					<FormControl>
						<FormLabel mt={2} m={1}> <Text as='b'> Module Type </Text></FormLabel>
						<RadioGroup onChange={(event)=>setType(parseInt(event))}>
							<HStack spacing='24px' ml={2}>
								<Radio borderColor='gray.400' colorScheme='teal' value="1">Form</Radio>
								<Radio borderColor='gray.400' colorScheme='teal' value="2">Video</Radio>
								<Radio borderColor='gray.400' colorScheme='teal' value="3">Reading</Radio>
							</HStack>
						</RadioGroup>

						<FormLabel  mt={2} m={1}> <Text as='b'> Title</Text> </FormLabel>
						<Input value={title.target.value} borderColor='gray.400' focusBorderColor='teal.700' type='text' onChange={setTitle}/>

						<FormLabel  mt={2} m={1}> <Text as='b'>Description</Text> </FormLabel>
						<Input value ={description.target.value} borderColor='gray.400' focusBorderColor='teal.700' type='text' onChange={setDescription}/>

						<FormLabel  mt={2} m={1}> <Text as='b'> Content</Text> </FormLabel>
						<Input value = {content.target.value} borderColor='gray.400' focusBorderColor='teal.700' type='text' onChange={setContent}/>

					</FormControl>
				</CardBody>
			</Card>
		</Box>
    )
}

export default FormTask; 