const app = require("./server");
import * as dotenv from "dotenv";
dotenv.config();
const { MongoClient } = require("mongodb");

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

async function listDatabases(client: any) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db: any) => console.log(` - ${db.name}`));
}

async function main() {
  const uri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.xiv8n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

app.listen(5000, () => {
  console.log("Server has started!");
});
