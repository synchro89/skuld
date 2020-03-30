const path = require('path');
const { readdirSync } = require('fs');

const modelErrors = {};

readdirSync(path.join(__dirname))
    .forEach(fileName => {
        const fullPath = path.join(__dirname, fileName)
        console.log(fileName);
        // require(fullPath);
    });