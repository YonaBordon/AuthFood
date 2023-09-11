"use strict";
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
exports.loginGoogle = void 0;
const users_1 = __importDefault(require("../models/users"));
const google_verify_1 = __importDefault(require("../helpers/google-verify"));
const generate_jwt_1 = __importDefault(require("../helpers/generate-jwt"));
const loginGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        const { name, email, img } = yield (0, google_verify_1.default)(id_token);
        let user = yield users_1.default.findOne({ email });
        if (!user) {
            const data = {
                name,
                email,
                img,
            };
            user = new users_1.default(data);
            yield user.save();
        }
        // generate JWT
        const token = yield (0, generate_jwt_1.default)(user.id, user.name);
        res.json({
            msg: 'Google Signin',
            data: user,
            token,
        });
        console.log('Controlador: Bienvenido', name);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Token de Google no válido',
        });
    }
});
exports.loginGoogle = loginGoogle;
//# sourceMappingURL=auth.js.map