import { createAction, createReducer } from "@reduxjs/toolkit";

const SET_EXCHANGES = createAction('SET_EXCHANGES')
const EXCH_LOADING = createAction('EXCH_LOADING')
const EXCH_ERROR = createAction('EXCH_ERROR')

const initialState={
    exchanges:[],
    exch_loading: true,
    exch_error:false,
  
}
export const exchageReducer = createReducer(
   initialState,
    (builder) => {
      builder
        .addCase(SET_EXCHANGES, (state, action) => {
          state.exchanges = [...action.payload];
        })
 
        .addCase(EXCH_LOADING, (state, action) => {
          state.exch_loading = false;
        })
    
        .addCase(EXCH_ERROR, (state) => {
            state.exch_error= true;
        })
   
        .addDefaultCase((state) => {return state})
    }
  )

 
  
