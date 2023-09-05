"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.post('/google', [(0, express_validator_1.check)('id_token', 'Id token is required')], auth_1.loginGoogle);
exports.default = router;
//# sourceMappingURL=auth.js.map