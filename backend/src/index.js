require('dotenv/config');

const express = require('express');
const app = express();
const formidableMiddleware = require('express-formidable');

const cors = require("cors");

require("./routes")(app);
require("./database");

app.use(cors());
app.use(express.json());
app.use(formidableMiddleware());

app.listen(process.env.PORT || 8080);

// Create a tunnel to test backend
if (process.env.DEVELOPMENT) {
  const ngrok = require('ngrok');
  (async function () {
    try {
      const url = await ngrok.connect({
        proto: 'http',
        addr: process.env.PORT,
      });
      console.log('Tunnel Created -> ');
      console.log(url);
      console.log('Tunnel Inspector ->  http://127.0.0.1:4040');
    } catch (error) {
      console.log(error);
    }
  })();
}
