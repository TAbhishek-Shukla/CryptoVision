import { configureStore } from "@reduxjs/toolkit";
import { exchageReducer } from "../reducer/exchReducer";
import { coinsReducer } from "../reducer/coinsReducer";
import { coinDetailsReducer } from "../reducer/coinDetailsReducer";


export const store= configureStore({
    reducer:{
        exchangesdata: exchageReducer,
        coinsdata: coinsReducer,
        coindetails:coinDetailsReducer,
    }
})