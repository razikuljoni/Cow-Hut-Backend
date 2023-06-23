'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const cors_1 = __importDefault(require('cors'));
const express_1 = __importDefault(require('express'));
const http_status_1 = require('http-status');
const globalErrorHandler_1 = __importDefault(
    require('./app/middlewares/globalErrorHandler')
);
const routes_1 = __importDefault(require('./app/routes'));
const app = (0, express_1.default)();
// Cors setup
app.use((0, cors_1.default)());
// Parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Application routes
app.use('/api/v1/', routes_1.default);
// Global Error Handler
app.use(globalErrorHandler_1.default);
// Handle Not Found Route
app.use((req, res, next) => {
    res.status(http_status_1.NOT_FOUND).json({
        success: false,
        message: '🚫 Not Found!',
        errorMessages: [
            {
                path: req.originalUrl,
                message: '🚫 Api not found!',
            },
        ],
    });
    next();
});
exports.default = app;
