// Function to create an express application
// This is in it's own server file so it can be used in our tests seperately
//      from our main function

const express = require("express");
const expressApp = express();

module.exports = expressApp;
