import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <HStack shadow={'base'} p={'4'} bgColor={'blackAlpha.900'}>
       <NavLink to={'/'} >
         <Button variant={'unstyled'}  color={'white'}
          textTransform={'capitalize'}
         >home</Button>
       </NavLink>
       <NavLink to={'/exchanges'} >
         <Button variant={'unstyled'}  color={'white'}
          textTransform={'capitalize'}
         >exchanges</Button>
       </NavLink>
       <NavLink to={'/coins'} >
         <Button variant={'unstyled'}  color={'white'}
          textTransform={'capitalize'}
         >coins</Button>
       </NavLink>
    </HStack>
    )
}

export default Header