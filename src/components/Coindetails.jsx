import { Badge, Box, Button, Container, HStack, Image, Progress, Select, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { server_api } from '../main'
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import ChartBox from './chartBox';
import ErrorPage from './ErrorPage';

const Coindetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { coin, coin_loading,
    coin_error, currency,
    currencySymbol, days ,chartarray
  } = useSelector(state => state.coindetails);
  
  const btns=['24h','7d','14d','30d','60d','200d','1y','max'];

  const getCoin = async (url1,url2) => {
    try {

      const coinres = await fetch(url1);
      const coindata = await coinres.json();

      const chartres = await fetch(url2);
      const chartdata = await chartres.json();
      dispatch({ type: "SET_COINDETAILS", payload: coindata })
      if(chartdata){
        dispatch({ type: "SET_COINCHART", payload: chartdata.prices })
      }
      dispatch({ type: "COIN_LOADING" });
    }
    catch (err) {
      dispatch({ type: "COIN_LOADING" });
      dispatch({ type: 'COIN_ERROR' })
      console.log(err);
    }
  }
  
  const selectCurrency = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SELECT_CURRENCY', payload: value })
  }
  useEffect(() => {
    getCoin(`${server_api}/coins/${id}`,
    `${server_api}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
  }, [currency, id, days]);

  const handleDays=(value)=>{
    if(value !== days){
      dispatch({type:"CHANGE_DAYS",payload:value})
    }
  }


  if (coin_error) return <ErrorPage msg={'Error While Fetching Coin Details'} />

  return (
    <Container maxW={'container.xl'} >
      {
        coin_loading ? <Loader /> :
          <>
            <Box w={'full'} borderWidth={1} >
              <ChartBox currency={currencySymbol} arr={chartarray} days={days}/>
            </Box>
            
            {/* button days  */}
             <HStack p={'4'} wrap={'wrap'} w={'full'}>
              {
                btns.map((i)=>{
                  return(
                    <Button  key={i} onClick={()=>handleDays(i)}>
                      {i}
                    </Button>
                  )
                })
              }
             </HStack>
            <Select value={currency} onChange={selectCurrency} maxW={20} m={'4'}>
              <option value='inr'> ₹</option>
              <option value='usd'>$</option>
              <option value='eur'>€</option>
            </Select>

            <VStack spacing={'4'} p={'16'} alignItems={'flex-start'}>
              <Text fontSize={'sm'} alignSelf={'center'}>
                Last Updated On {Date(coin.last_updated).split("G")[0]}</Text>
              <Image src={coin?.image?.large} alt={coin.id} w={'16'} h={'16'} objectFit={'contain'} />
              <Stat>
                <StatLabel >{coin.name}</StatLabel>
                <StatNumber >{`${currencySymbol}${coin?.market_data?.current_price[currency]}`}</StatNumber>
                <StatHelpText>
                  <StatArrow type={coin?.market_data?.price_change_percentage_24h > 0 ? 'increase' : 'decrease'} />
                  {coin?.market_data?.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>
              <Badge fontSize={'2xl'}
                bgColor={'blackAlpha.800'}
                color={'white'}
              >
                {`#${coin.market_cap_rank}`}
              </Badge>

              <Custombar
                low={`${currencySymbol}${coin?.market_data?.low_24h[currency]}`}
                high={`${currencySymbol}${coin?.market_data?.high_24h[currency]}`}

              />
              <Box w={'full'} p={'4'}>
                <Item title={'Max Supply'} value={`${coin?.market_data?.max_supply}`} />
                <Item title={'Circulating Supply'} value={`${coin?.market_data?.circulating_supply}`} />
                <Item title={'Market Cap'} value={`${currencySymbol}${coin?.market_data?.market_cap[currency]}`} />
                <Item title={'All Time Low'} value={`${currencySymbol}${coin?.market_data?.atl[currency]}`} />
                <Item title={'All Time High'} value={`${currencySymbol}${coin?.market_data?.ath[currency]}`} />
              </Box>
            </VStack>

          </>
      }
    </Container>
  )
}
const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
      <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>
        {title}
      </Text>
      <Text >{value}</Text>
    </HStack>
  )
}

const Custombar = ({ high, low }) => {
  return (
    <VStack w={'full'}>
      <Progress value={50} colorScheme={'teal'} w={'full'} />
      <HStack justifyContent={'space-between'} w={'full'} >
        <Badge colorScheme='red' children={low} />
        <Text fontSize={'sm'} >24h Range</Text>
        <Badge colorScheme='green' children={high} />
      </HStack>
    </VStack>
  )
}
export default Coindetails