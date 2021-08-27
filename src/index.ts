const app = require("./server"); // Our express server
const mongoose = require("mongoose");

// Our environment variables
import * as dotenv from "dotenv";
dotenv.config();
const dbConnectionString = process.env.DB_CONNECTION_STRING;

// Connecting to mongoDB with mongoose
mongoose
  .connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: string) => console.log("Could not connect to MongoDB", err));

// Listen to server on port 5000
app.listen(5000, () => {
  console.log("Server has started!");
});

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
