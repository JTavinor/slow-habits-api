"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("./server"); // Our express server
const mongoose = require("mongoose"); // For connecting with mongodb
const express = require("express");
// Our custom defined routes
const users = require("./routes/users");
const auth = require("./routes/auth");
// Getting our environment variables environment variables
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const dbConnectionString = process.env.DB_CONNECTION_STRING;
const jwtKey = process.env.JWT_PRIVATE_KEY;
// Making sure our JWT key is defined
if (!jwtKey) {
    console.error("FATAL ERROR: No jwt private key defined.");
    process.exit(1);
}
// Allows our app to parse json
app.use(express.json());
// Defining endpoints for our routes
app.use("/api/users", users);
app.use("/api/auth", auth);
// Connecting to mongoDB with mongoose
mongoose
    .connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Could not connect to MongoDB", err));
// Listen to server on port 5000
app.listen(5000, () => {
    console.log("Server has started!");
});
//# sourceMappingURL=index.js.map