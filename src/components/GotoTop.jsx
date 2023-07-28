import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import {AiOutlineArrowUp} from 'react-icons/ai'

const GotoTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    useEffect(() => {
      window.addEventListener('scroll', () => {
          if (window.scrollY > 400) {
              setShowTopBtn(true);
          } else {
              setShowTopBtn(false);
          }
      });
      return removeEventListener('scroll',this);
  }, []);

  return (
   <>
    {
      showTopBtn && 
  
    <Box w={10} h={10} shadow={'none'} borderRadius={'50%'} display={'grid'} placeContent={'center'}
    bgColor={'gray.400'} 
    color={'white'}
    onClick={goToTop} 
    position={'fixed'}
    bottom={'5'}
    right={'5'}
    fontSize={'md'}
    fontWeight={'bold'}
    >
     <AiOutlineArrowUp />
    </Box>
  }
  </>
  )
}

export default GotoTop