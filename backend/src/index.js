require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

require('./database');

app.use(cors());
app.use(express.json());

require('./routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server in listening on port: ' + port));

if (process.env.DEVELOPMENT) {
    const ngrok = require('ngrok');
    (async function() {
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