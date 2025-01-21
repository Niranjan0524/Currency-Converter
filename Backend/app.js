
const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
  path: `.env.${ENV}`,
});

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");


const app = express();

// const cors = require("cors");

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   })
// );

// app.use(express.static(path.join(__dirname, "../Frontend/dist")));


const { currencyRouter } = require("./routers/currencyRouter");


const {errorHandlers} = require("./controllers/errorHandler");

const ExchangeRateService = require("./service/exchangeRateService");


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Request Recived");
  console.log(req.url);
  console.log("Req body",req.body);
  next();
});

app.use("/api",currencyRouter);


app.use(errorHandlers);

const port = process.env.PORT || 3000;

async function init() {
  try {
    await ExchangeRateService.getRates();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to initialize exchange rates:", error);
    process.exit(1);
  }
}

init();

