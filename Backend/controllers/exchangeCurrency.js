const exchangeRateService = require("../service/exchangeRateService");

exports.convertCurrency = (req, res) => {
  const { amount, sourceCurrency, targetCurrency } = req.body;
  console.log(amount, sourceCurrency, targetCurrency);
  if (!amount || !sourceCurrency || !targetCurrency) {
     return res
      .status(400)
      .json({ message: "Please provide all the required fields" });
  }
  const targetAmount=exchangeRateService.convert(amount,sourceCurrency,targetCurrency);
  res.json({message:"Success",targetAmount:targetAmount});

}; 