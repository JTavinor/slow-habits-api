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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("./server");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const { MongoClient } = require("mongodb");
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
console.log(process.env.DB_PASSWORD);
function listDatabases(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const databasesList = yield client.db().admin().listDatabases();
        console.log("Databases:");
        databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.xiv8n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
        const client = new MongoClient(uri);
        try {
            yield client.connect();
            yield listDatabases(client);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            yield client.close();
        }
    });
}
main().catch(console.error);
app.listen(5000, () => {
    console.log("Server has started!");
});
//# sourceMappingURL=index.js.map