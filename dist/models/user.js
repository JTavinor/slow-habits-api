"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxLength: 30,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxLength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxLength: 1024,
    },
});
const User = mongoose_1.default.model("User", userSchema);
function validateUser(user) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(2).max(30).required(),
        email: joi_1.default.string().min(5).max(255).required().email(),
        password: joi_1.default.string().min(5).max(1024).required(),
    });
    return schema.validate(user);
}
exports.User = User;
exports.validate = validateUser;
//# sourceMappingURL=user.js.map