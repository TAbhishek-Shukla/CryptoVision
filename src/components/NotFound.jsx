import { Button, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
  return (
   <Box>
    <Text textTransform={'capitalize'}>the page you are looking for is not here, go back to home page</Text >
     <NavLink  to={'/'}>
     <Button boxSize={'md'}>go back</Button>
     </NavLink>
   </Box>
  )
}

export default NotFound