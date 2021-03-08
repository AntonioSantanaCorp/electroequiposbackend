const express = require("express");
const bodyParser = require("body-parser");

const scrapping = require("./scrapping");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//api/scrapping/tiempo
app.get("/api/scrapping/tiempo", async (req, res) => {
  res.json(await scrapping.Tiempo());
});

app.use("/", async (req, res) => {
  res.json("Api ...");
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log("Server running", port));
