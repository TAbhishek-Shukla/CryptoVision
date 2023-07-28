
import { createAction, createReducer } from "@reduxjs/toolkit";

const SET_COINS = createAction('SET_COINS')
const COINS_LOADING = createAction('COINS_LOADING')
const COINS_ERROR = createAction('COINS_ERROR')
const SELECT_CURRENCY = createAction('SELECT_CURRENCY')
const CHANGE_PAGE = createAction('CHANGE_PAGE')

const initialState={
    coins:[],
    coins_loading: true,
    coins_error:false,
    currency:'inr',
    currencySymbol: "₹",
    pageno:1
}

export const coinsReducer = createReducer(
   initialState,
    (builder) => {
      builder
        .addCase(SET_COINS, (state, action) => {
          state.coins = [...action.payload];
         
        })
 
        .addCase(COINS_LOADING, (state, action) => {
          state.coins_loading = false;
        })
    
        .addCase(COINS_ERROR, (state) => {
            state.coins_error= true;
        })
        .addCase(SELECT_CURRENCY, (state,action) => {
            state.currency= action.payload;
            state.coins_loading=true;
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
        .addCase(CHANGE_PAGE,(state,action)=>{
            state.pageno= action.payload;
            state.coins_loading=true
        })
   
        .addDefaultCase((state) => {return state})
    }
  )

 
  
