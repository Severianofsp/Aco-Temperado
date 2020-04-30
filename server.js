const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dialogflow = require('./routes/dialogflow')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use('/dialogflow', dialogflow)

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});