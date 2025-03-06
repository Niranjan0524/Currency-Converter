
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { useRef } from "react";
import CurrencySelector from "./CurrencySelector";



const CurrencyConverter = () => {
  const InputRef=useRef("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [s,setS]=useState("");

  const handleConvert = () => {
    const amount = InputRef.current.value;
    const fc = fromCurrency;
    const tc = toCurrency;

    fetch("http://localhost:3000/api/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        sourceCurrency: fc,
        targetCurrency: tc,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setS(data.targetAmount);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleOnChangeFrom = (val) => {
    console.log("From Val",val);
    setFromCurrency(val);
  };
  const handleOnChangeTo = (val) => {
    console.log("To val",val);
    setToCurrency(val);
  };

  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <h2 className="text-4xl font-extrabold text-white mb-8">
        Currency Converter
      </h2>
      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-md">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Enter Amount
        </label>
        <input
          type="number"
          ref={InputRef}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
          From Currency:
        </label>
        <CurrencySelector
          label="from"
          val={fromCurrency}
          onChange={handleOnChangeFrom}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
          To Currency:
        </label>
        <CurrencySelector
          label="to"
          val={toCurrency}
          onChange={handleOnChangeTo}
        />
        <button
          onClick={handleConvert}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-4 rounded mt-6 w-full transition duration-300 ease-in-out"
        >
          Convert
        </button>
        {s && (
          <div className="mt-6">
            <h3 className="text-2xl font-bold text-gray-700">
              Converted Amount:
            </h3>
            <p className="text-xl text-gray-900">
              {s} {toCurrency}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;