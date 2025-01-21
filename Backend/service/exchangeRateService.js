const axios = require('axios');

class ExchangeRateService {
    constructor() {
      this.rates={};
      this.lastUpdated=null;
      this.apiKey = process.env.API_KEY;
      this.baseUrl='https://v6.exchangerate-api.com/v6/';
    }


    async getRates() {
      const url=`${this.baseUrl}${this.apiKey}/latest/INR`;

      
     
      try {
        const response = await axios.get(url);
        if (response.status === 200 && response.data.result === "success") {
          this.rates = response.data.conversion_rates;
        }
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
      }
      
    }

    convert(amount, fromCurrency, toCurrency) {
      if (fromCurrency === toCurrency) {
        return amount;
      }
      const sourceRate = this.rates[fromCurrency];
      const targetRate = this.rates[toCurrency];
      return amount *[targetRate/sourceRate] ;
    }

   
}

module.exports = new ExchangeRateService();