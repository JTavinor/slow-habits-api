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
const createServer = require("./server"); // Our express server
const mongoose = require("mongoose");
const express = require("express");
const Joi = require("Joi");
Joi.objectId = require("joi-objectid")(Joi);
const users = require("./routes/users");
const auth = require("./routes/auth");
// Our environment variables
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const dbConnectionString = process.env.DB_CONNECTION_STRING;
const jwtKey = process.env.JWT_PRIVATE_KEY;
if (!jwtKey) {
    console.error("FATAL ERROR: No jwt private key defined.");
    process.exit(1);
}
// Connecting to mongoDB with mongoose
mongoose
    .connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log("Connected to mongodb");
    const app = createServer();
    app.listen(5000, () => {
        console.log("Server has started!");
    });
})
    .catch((err) => console.log("Could not connect to MongoDB", err));
// Listen to server on port 5000
// Connecting to mongodb using MongoClient
// const { MongoClient } = require("mongodb");
// const dbUsername = process.env.DB_USERNAME;
// const dbPassword = process.env.DB_PASSWORD;
// async function listDatabases(client: any) {
//   const databasesList = await client.db().admin().listDatabases();
//   console.log("Databases:");
//   databasesList.databases.forEach((db: any) => console.log(` - ${db.name}`));
// }
// async function main() {
//   const uri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.xiv8n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
//   const client = new MongoClient(uri);
//   try {
//     await client.connect();
//     await listDatabases(client);
//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close();
//   }
// }
// main().catch(console.error);
//# sourceMappingURL=index.js.map