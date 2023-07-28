
import { createAction, createReducer } from "@reduxjs/toolkit";

const SET_COINDETAILS = createAction('SET_COINDETAILS')
const COIN_LOADING = createAction('COIN_LOADING')
const COIN_ERROR = createAction('COIN_ERROR')
const SELECT_CURRENCY = createAction('SELECT_CURRENCY')
const SET_COINCHART = createAction('SET_COINCHART')
const CHANGE_DAYS = createAction("CHANGE_DAYS")


const initialState={
    coin:{},
    coin_loading: true,
    coin_error:false,
    currency:'inr',
    currencySymbol: "₹",
    days:'24h',
    chartarray:[]
}

export const coinDetailsReducer = createReducer(
   initialState,
    (builder) => {
      builder
        .addCase(SET_COINDETAILS, (state, action) => {
          state.coin = action.payload;
        
        })
 
        .addCase(COIN_LOADING, (state, action) => {
          state.coin_loading = false;
        })
    
        .addCase(COIN_ERROR, (state) => {
            state.coin_error= true;
        })
        .addCase(SELECT_CURRENCY, (state,action) => {
            state.currency= action.payload;
            state.coin_loading=true;
             // changing currency symbol on basis of currency 
          if(state.currency === 'inr'){
            state.currencySymbol= "₹"
          }
           else if (state.currency === 'usd'){
             state.currencySymbol = '$'
           }
           else{
            state.currencySymbol = "€"
           }
        })
         
        .addCase(SET_COINCHART,(state,action)=>{
          state.chartarray=action.payload
        })

        .addCase(CHANGE_DAYS,(state,action)=>{
          const value=action.payload;
          switch(value){
            case '24h':
              return{
                ...state,
                days:value,
                coin_loading:true 
              }
            case '7d':
              return{
                ...state,
                days:value,
                coin_loading:true 
              }
            case '14d':
              return{
                ...state,
                days:value,
                coin_loading:true 
              }
            case '30d':
              return{
                ...state,
                days:value,
                coin_loading:true 
              }
            case '60d':
              return{
                ...state,
                days:value,
                coin_loading:true 
              }
            case '200d':
              return{
                ...state,
                days:value,
                coin_loading:true 
              }
            case '1y':
              return{
                ...state,
                days:'365d',
                coin_loading:true 
              }
            case 'max':
              return{
                ...state,
                days:value,
                coin_loading:true 
              }
            default:
              return state;
          }
        })
      
   
        .addDefaultCase((state) => {return state})
    }
  )

 
  
