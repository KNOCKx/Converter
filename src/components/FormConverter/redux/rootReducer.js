import {combineReducers} from 'redux'
import {GETCURRENCIES} from "./types";
import axios from "axios";

const getCurrencyExchange = async (url)=>{
    const res = await axios(url)
    return res
}
export function getAllCurrencies(state = {
    usdsale: 0,
    eursale: 0,
    usdbuy: 0,
    eurbuy: 0
},action) {
    if (action.type === GETCURRENCIES){
        getCurrencyExchange('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
            .then((res)=>{
                console.log(res)
                state.usdsale = + `${res.data[0].buy}`
                state.eursale = + `${res.data[1].buy}`
                state.usdbuy = + `${res.data[0].sale}`
                state.eurbuy = + `${res.data[1].sale}`
                console.log(`
                    ${state.usdsale} - USD sale
                    ${state.eursale} - EUR sale
                    ${state.usdbuy} - USD buy
                    ${state.eurbuy} - EUR buy`)
            })
    }

    return state
}

export const rootReducer = combineReducers({
    allcur: getAllCurrencies
})