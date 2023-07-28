import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CoinCard from './CoinCard';
import { Button, Container, HStack, Select } from '@chakra-ui/react';
import Loader from './Loader';
import { server_api } from '../main';
import ErrorPage from './ErrorPage';
import GotoTop from './GotoTop';

const Coins = () => {
  const dispatch = useDispatch();
  const { coins, coins_loading,
    coins_error, currency,
    currencySymbol, pageno
  } = useSelector(state => state.coinsdata);

  const btns = new Array(100).fill(1);

  const getCoins = async (url) => {
    try {
      const exchres = await fetch(url);
      const data = await exchres.json();
      dispatch({ type: 'SET_COINS', payload: data })
      dispatch({ type: "COINS_LOADING" });
    }
    catch (err) {
      dispatch({ type: "COINS_LOADING" });
      dispatch({ type: 'COINS_ERROR' })
      console.log(err);
    }
  }
  const selectCurrency = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SELECT_CURRENCY', payload: value })
  }
  useEffect(() => {
    getCoins(`${server_api}/coins/markets?vs_currency=${currency}&page=${pageno}`)
  }, [currency, pageno]);

  //  changing page based on clicked button 
  const changePage = (page) => {
    if (pageno !== page) {
      dispatch({ type: "CHANGE_PAGE", payload: page })
    }
  }


  if (coins_error) return <ErrorPage msg={'Error While Fetching Coins'} />

  return (
    <Container maxW={'container.xl'}>
      {
        coins_loading ? <Loader /> :
          <>
            <Select value={currency} onChange={selectCurrency} maxW={20} m={'4'}>
              <option value='inr'> ₹</option>
              <option value='usd'>$</option>
              <option value='eur'>€</option>
            </Select>
            <HStack wrap={'wrap'} justifyContent={'space-evenly'} w={'full'}>
              {
                coins?.map((elem) => {
                  const { id, image, symbol, current_price, name } = elem
                  return (
                    <CoinCard
                      key={id}
                      id={id}
                      name={name}
                      img={image}
                      price={current_price}
                      symbol={symbol}
                      currencySymbol={currencySymbol}
                    />
                  )
                })
              }
            </HStack>
            {/* btns */}
            <HStack overflowX={'auto'} w={'full'} p={'8'} >
              {
                btns.map((elem, index) => {
                  return (
                    <Button p={'4'} color={'white'} key={index} bgColor={'blackAlpha.800'}
                      onClick={() => changePage(index + 1)}
                    >{index + 1}</Button>
                  )
                })
              }
            </HStack>
          </>
      }

    </Container>
  )
}

export default Coins