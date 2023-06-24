"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.post('/create-admin', admin_controller_1.AdminController.createAdmin);
router.get('/login', admin_controller_1.AdminController.loginAdmin);
router.post('/refresh-token', admin_controller_1.AdminController.refreshToken);
exports.AdminRoutes = router;
