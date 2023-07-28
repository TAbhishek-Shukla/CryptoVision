import { Heading, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'

const CoinCard = ( {id,img,price,symbol, name,currencySymbol}) => {
 
  
  return (
        <NavLink to={`/coin/${id}`} >
          <VStack w={'52'} p={'8'} spacing={'4'} borderRadius={'xl'} shadow={'lg'} m={'4'} transition={'all 0.3s ease'}
          css={{
            '&:hover':{
              transform:'scale(1.1)',
            }
          }}
          > 
          <Image src={img} alt={name}  w={'10'} h={'10'} objectFit={'contain'}
          />
          <Heading size={'md'} noOfLines={1} >{symbol}</Heading>
          <Text noOfLines={1}>{name}</Text>
          <Text noOfLines={1}>{ price ? `${currencySymbol}${price}`: 'NA'}</Text>
          </VStack>
        </NavLink>
  )
}

export default CoinCard