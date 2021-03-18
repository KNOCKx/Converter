import "./FormConverter.css";
import React from "react";
import {applyMiddleware, createStore } from 'redux'
import {rootReducer} from './redux/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Select,TextField,MenuItem,Button,InputLabel,FormControl } from '@material-ui/core'
import {getcur} from "./redux/actions"
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {getAllCurrencies} from "./redux/rootReducer";

function template() {

    const store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk, logger)
        )
    )
    store.dispatch(getcur())
    const storage = {
        amount:0
    }

    function handleChange(event) {
        storage.amount = +event.target.value
        console.log(storage.amount,"amount")
    }

    function clickedButton() {
        const exchangeSelect = document.querySelector('.exchangeSelect .MuiSelect-nativeInput')
        let result = document.querySelector('.result')
        if(storage.amount > Number.MAX_SAFE_INTEGER){
            result.innerHTML= 'More than MAX_SAFE_INTEGER'
        }
        else if (storage.amount <= 0){
            result.innerHTML= 'Can`n reach the answer because of null or negative number'
        }
        else if (storage.amount > 0 && +exchangeSelect.value === 10){
        result.innerHTML= `${(+storage.amount / store.getState().allcur.usdsale).toFixed(2)}$`
            console.log(store.getState().allcur.usdsale)
        }
        else if (storage.amount > 0 && +exchangeSelect.value === 20){
            result.innerHTML= `${(+storage.amount / store.getState().allcur.eursale).toFixed(2)}€`
            console.log(store.getState().allcur.eursale)
        }
        else if (storage.amount > 0 && +exchangeSelect.value === 30){
            result.innerHTML= `${(+storage.amount * store.getState().allcur.usdbuy).toFixed(2)}₴`
            console.log(store.getState().allcur.usdbuy)
        }
        else if (storage.amount > 0 && +exchangeSelect.value === 40){
            result.innerHTML= `${(+storage.amount * store.getState().allcur.eurbuy).toFixed(2)}₴`
            console.log(store.getState().allcur.eurbuy)
        }

        console.log('CLICKED')
    }

    return (
        <div className="form-converter">
            <h1>Converter</h1>
            <div className="select_conv">
                <div>
                    <FormControl>
                        <InputLabel className="selectLabel" id="labelTo">Currency selection</InputLabel>
                        <Select className="exchangeSelect" labelId="labelTo" id="select" defaultValue="5">
                            <MenuItem value={5}>NONE</MenuItem>
                            <MenuItem value={10}>UAH to USD</MenuItem>
                            <MenuItem value={20}>UAH to EUR</MenuItem>
                            <MenuItem value={30}>USD to UAH</MenuItem>
                            <MenuItem value={40}>EUR to UAH</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <h2>The amount of currency to be exchanged</h2>
            <TextField onChange={handleChange} className="inputUah" id="outlined-basic" variant="outlined" />
            <Button
                    onClick={clickedButton}
                    className="exchBut"
                    variant="contained" color="secondary">
                Exchange
            </Button>
            <p><span className="result">&nbsp;</span></p>


        </div>
    );

}
export default template;
