import { Avatar, Box, Image, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import abhik from '../assets/founder.png'
const Footer = () => {
  return (
    <Box bgColor={'blackAlpha.900'} color={"whiteAlpha.800"}
    minH={'48'}
    px={'16'}
    py={['16',"8"]}
    >
     <Stack direction={['column','row']} h={'full'} alignItems={'center'}>
        <VStack w={'full'} alignItems={['center','flex-start']} textTransform={'capitalize'}>
           <Text fontWeight={'bold'}>about us</Text>
            <Text fontSize={'md'} letterSpacing={'widest'} textAlign={['center','left']} maxW={'container.lg'} > we the world's most-referenced price-tracking website for cryptoassets in the rapidly growing cryptocurrency space</Text>
        </VStack>
        <VStack textAlign={'center'}>
            <Image src={abhik} alt={'founder'} w={10} h={'auto'} 
            objectFit={'contain'} borderRadius={'full'} transform={'scalex(-1)'} mt={[3,0]}/>
            <Text textTransform={'capitalize'}>Abhishek Shukla</Text>
            <Text textTransform={'capitalize'}>(Founder)</Text>
        </VStack>
     </Stack>
    </Box>
  )
}

export default Footer