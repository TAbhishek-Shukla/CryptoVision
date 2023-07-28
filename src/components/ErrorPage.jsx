import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorPage = ({msg}) => {
  return (
    <Alert status='error'  w={'container.md'} position={'fixed'}
    bottom={'4'} left={'50%'} transform={'translate(-50%)'}
    >
      <AlertIcon />
      {msg}
    </Alert>
  )
}

export default ErrorPage