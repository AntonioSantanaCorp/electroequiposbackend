const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const scrapping = require("./scrapping");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//api/scrapping/tiempo
app.get("/api/scrapping/tiempo", async (req, res) => {
  res.json(await scrapping.Tiempo());
});

app.use("/", async (req, res) => {
  res.send('<h1>api</h1>')
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log("Server running", port));
