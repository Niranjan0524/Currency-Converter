const express = require('express');

const currencyRouter=express.Router();

const {convertCurrency} = require("../controllers/exchangeCurrency");

currencyRouter.post("/convert", convertCurrency);

exports.currencyRouter = currencyRouter;