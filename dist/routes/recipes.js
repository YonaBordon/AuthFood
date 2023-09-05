"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const express_validator_1 = require("express-validator");
const recipes_1 = require("../controllers/recipes");
const router = (0, express_1.Router)();
router.post('/', [validateJWT_1.default, (0, express_validator_1.check)('name', 'The name is required').not().isEmpty()], recipes_1.createRecipe);
exports.default = router;
//# sourceMappingURL=recipes.js.map