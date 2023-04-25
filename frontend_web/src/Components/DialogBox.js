
function UnAssignDialog(buttonInfo,alertInfo) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    return (
        <>
            <Button bg='teal.700' color='white' w='50%' onClick={onOpen}>
                {buttonInfo}
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            <Text color='teal.700'> Confirm Action </Text>
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <Text color='teal.700'>{alertInfo}</Text>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button bg='teal.700' color='white' onClick={onClose} ml={3}>
                                OK
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}