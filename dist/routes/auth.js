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
const joi_1 = __importDefault(require("joi")); // For req.body validation
const bcrypt_1 = __importDefault(require("bcrypt")); // For checking encrypted passsword
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // For crrating jwt
const lodash_1 = __importDefault(require("lodash")); // For utility functions
// Getting the relevant environment variables
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const jwtKey = process.env.JWT_PRIVATE_KEY;
const { User } = require("../models/user"); // Our user model
const router = express_1.default.Router(); // For creating our endpoints for this route
// This route should be called when logging in a user.
// The request should have a email and password
// If we have a bad request, or an incorrect email/password => return error
// On good request => Return a jwt in the response header, as well as the id, name and email in the body
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validating req.body
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    // Checking if email exists in our db
    let user = yield User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send("Incorrect email or password");
    // Checking if password is correct
    const validPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send("Incorrect email or password");
    // Correct email + password supplied => create + send JWT, and user data
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, jwtKey);
    return res
        .status(200)
        .header("x-auth-token", token)
        .send(lodash_1.default.pick(user, ["_id", "name", "email"]));
}));
// Validates the req.body
function validate(req) {
    const schema = joi_1.default.object({
        email: joi_1.default.string().min(5).max(255).required().email(),
        password: joi_1.default.string().min(5).max(1024).required(),
    });
    return schema.validate(req);
}
module.exports = router;
//# sourceMappingURL=auth.js.map