import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { server_api } from '../main';
import { Container, HStack, Text } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorPage from './ErrorPage';
import ExchangeCard from './ExchangeCard';
import GotoTop from './GotoTop';

const Exchanges = () => {
 
  const dispatch= useDispatch();
    const {exchanges,exch_loading,exch_error}= useSelector(state=>state.exchangesdata);
    
  const getExchanges= async(url)=>{
    try{
      const  exchres= await fetch(url);
      const  data= await exchres.json();
        dispatch({type:'SET_EXCHANGES', payload:data})
        dispatch({type:"EXCH_LOADING"});
    }
    catch(err){
      dispatch({type:"EXCH_LOADING"});
      dispatch({type:'EXCH_ERROR'})
    }
  }

   useEffect(() => {
      getExchanges(`${server_api}/exchanges`)
  }, []);

  if(exch_error) return <ErrorPage msg={'Error While Fetching Exchanges'} />
  
  return (
      <Container maxW={'container.xl'}>
        {
          exch_loading ? <Loader /> :
          <>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {
              exchanges?.map((elem)=>{
                const {id,image, trust_score_rank,url,name}=elem
                return(
                  <ExchangeCard 
                  key={id}
                  name={name}
                  img={image}
                  rank={trust_score_rank}
                  url={url}
                  />
                )
              })
            }
          </HStack>
          </>
        }
         
      </Container> 
     
  )
}

export default Exchanges