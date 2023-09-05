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
exports.createRecipe = void 0;
const recipe_1 = __importDefault(require("../models/recipe"));
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, ingredients } = req.body;
    try {
        const recipe = yield recipe_1.default.findOne({ name }).exec();
        if (recipe) {
            return res.status(400).json({
                msg: 'Recipe already exists',
            });
        }
        const data = {
            name,
            description,
            ingredients,
            user: req.body.user._id,
        };
        const newRecipe = new recipe_1.default(data);
        yield newRecipe.save();
        res.status(201).json({ msg: 'Create recipe', data: newRecipe });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error' + error,
        });
    }
});
exports.createRecipe = createRecipe;
//# sourceMappingURL=recipes.js.map