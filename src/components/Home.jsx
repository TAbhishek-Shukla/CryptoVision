
import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Box, Container, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react';
import coinback from '../assets/coinback.jpg'
import coininvest from '../assets/invest.jpg'
import { server_api } from '../main';


const Home = () => {
    const [arr, setarr] = useState([]);
    const getData = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data) {
                setarr(data);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData(`${server_api}/coins/markets?vs_currency=inr&page=1`)
    }, []);

    return (
        <>
            <Box backgroundImage={coinback} w={'full'} h={'50vh'} display={'flex'} justifyContent={'center'}
                alignItems={'center'} overflow={'hidden'}
            >
                <Carousel autoPlay infiniteLoop interval={1000}
                    showThumbs={false} showArrows={false} showStatus={false}
                    // showIndicators={false}
                >
                    {
                        arr.slice(0, 5).map((elem) => {
                            const { image, id, symbol } = elem;
                            return (
                                <Box w={{'base':'20%','sm':'15%'}} h={'auto'} display={'flex'} justifyContent={'center'} alignContent={'center'}
                                    alignItems={'center'} mx={'auto'} my={10}
                                    key={id} bgColor={'transparent'} >
                                    <Image src={image} alt={id} objectFit={'contain'} alignSelf={'center'}
                                    />
                                </Box>
                            )
                        })
                    }
                </Carousel>
            </Box>
            <Stack direction={['column','row']} spacing='2rem' p={'4'} w={'full'}  overflow={'hidden'} mx={'auto'} >
                <Box  
                 alignItems={['center', 'left']} w={{'base':'100%','md':'50%'}} h={'auto'} mt={[3,4]}>
                    <Image src={coininvest} alt={'coininvest'} objectFit={'contain'} w={'100%'} h={'auto'}
                     />
                </Box>

                    <VStack display={'flex'}  maxW={['100%','50%']}>
                    <Heading mx={'auto'}>CoinVision</Heading>

                    <Text fontSize={'2xl'} textTransform={'capitalize'}  letterSpacing={'widest'} textAlign={'center'}  lineHeight={'2'}>
                    we the world's most-referenced price-tracking website for cryptoassets in the rapidly growing cryptocurrency space. Its mission is to make crypto discoverable and efficient globally by empowering retail users with unbiased, high quality and accurate information for drawing their own informed conclusions.
                </Text>
                    </VStack>
            </Stack>
        </>

    )
}

export default Home