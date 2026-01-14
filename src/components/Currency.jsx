import React, { useEffect } from 'react'
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
    const [currencies, setCurrencies] = useState([]);

    const exchange = async () => {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`)
        const result = ((response.data.data[toCurrency]) * amount);
        setResult(result.toFixed(2));
    }

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                // API'nin semboller/para birimleri listesini veren endpoint'i
                const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}`);
                // Gelen verideki anahtarları (USD, TRY, EUR vb.) diziye çeviriyoruz
                const currencyKeys = Object.keys(response.data.data);
                setCurrencies(currencyKeys);
            } catch (error) {
                console.error("Para birimleri yüklenirken hata oluştu:", error);
            }
        };

        fetchCurrencies();
    }, []);


    return (
        <div className="main-container">
            <div className="currency-card">
                <h3 className="app-title">DÖVİZ KURU UYGULAMASI</h3>

                <div className="exchange-row">
                    <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        className="input-field amount-input"
                        placeholder="Miktar"
                    />

                    <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="select-field currency-select"
                    >
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>

                    <FaRegArrowAltCircleRight className="arrow-icon" />

                    <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="select-field currency-select"
                    >
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>

                    <input
                        value={result}
                        readOnly
                        type="number"
                        className="input-field result-input"
                    />
                </div>

                <button onClick={exchange} className="exchange-button">
                    Hesapla
                </button>
            </div>
        </div>
    );
}

export default Currency