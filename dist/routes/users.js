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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt")); // For salting and hashing passwords
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // For generating a jwt
const lodash_1 = __importDefault(require("lodash")); // For utility functions
// Getting the relevant environment variables
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const jwtKey = process.env.JWT_PRIVATE_KEY;
const router = express_1.default.Router(); // For creating our endpoints for this route
const { User, validateUser } = require("../models/user"); // Our user model and validation
// This route should be called when registering a new user.
// The request should have a name, email and password satisfying the constraints laid out in the schema
// If we have a bad request, or that email already exists in our db => return error
// On good request => Return a jwt in the response header, as well as the id, name and email in the body
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Checking if the req.body is valid
    // If not, returning the error message
    const { error } = validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    // Checking to see if the users email is already in our db
    // If not return error message
    let user = yield User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).send("That user already exists!");
    user = new User(lodash_1.default.pick(req.body, ["name", "email", "password"])); // Create a new user
    const salt = yield bcrypt_1.default.genSalt(10); // Salting password
    user.password = yield bcrypt_1.default.hash(user.password, salt); // Updating users password with hashed version to be stored in the db
    yield user.save(); // Saving user to the db
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, jwtKey); // Creating a jwt
    // Returning jwt as header, as well as res.body
    return res
        .status(200)
        .header("x-auth-token", token)
        .send(lodash_1.default.pick(user, ["_id", "name", "email"]));
}));
module.exports = router;
//# sourceMappingURL=users.js.map