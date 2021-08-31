const express = require("express");
const users = require("./routes/users");
const auth = require("./routes/auth");
function createServer() {
    const expressApp = express();
    expressApp.use(express.json());
    expressApp.use("/api/users", users);
    expressApp.use("/api/auth", auth);
    return expressApp;
}
module.exports = createServer;
//# sourceMappingURL=server.js.map