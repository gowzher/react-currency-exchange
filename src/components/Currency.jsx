import React from 'react'
import '../css/currency.css'
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios';

let BASE_URL = "https://api.freecurrencyapi.com/v1/latest"
let API_KEY = "fca_live_ALp16RLmn0HD920tFCWKzylFqcEO7CZZb6BDJ5Ti"

function Currency() {

    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("TRY");
    const [result, setResult] = useState(0);

    const exchange = async () => {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`)
        const result = ((response.data.data[toCurrency]) * amount);
        setResult(result.toFixed(2));
    }


    return (
        <div className='currency-div'>
            <div style={{ fontFamily: "Arial", backgroundColor: "black", color: "#fff", width: "100%", textAlign: "center" }}>
                <h3>DÖVİZ KURU UYGULAMASI</h3>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "30px" }}>
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number" className='amount' />
                <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className='from-currency-option'>
                    <option value={"USD"}>USD</option>
                    <option value={"EUR"}>EUR</option>
                    <option value={"TRY"}>TRY</option>
                </select>

                <FaRegArrowAltCircleRight style={{ fontSize: "25px", marginRight: "10px" }} />

                <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className='to-currency-option'>
                    <option value={"TRY"}>TRY</option>
                    <option value={"EUR"}>EUR</option>
                    <option value={"USD"}>USD</option>
                </select>
                <input value={result} readOnly onChange={(e) => setResult(e.target.value)} type="number" className='result' />
            </div>
            <div>
                <button onClick={exchange} className='exchange-button'>Çevir</button>
            </div>
        </div>
    )
}

export default Currency