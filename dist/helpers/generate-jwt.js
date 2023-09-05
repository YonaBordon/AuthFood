"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (uid, userName) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, userName };
        jsonwebtoken_1.default.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '5m',
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject(new Error('No se pudo generar el JWT'));
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.default = generateJWT;
//# sourceMappingURL=generate-jwt.js.map