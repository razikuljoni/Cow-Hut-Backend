'use strict';
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            );
        });
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CowController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const cow_service_1 = require('./cow.service');
const createCow = (0, catchAsync_1.default)((req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const cow = req.body;
        const result = yield cow_service_1.CowService.createCow(cow);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: '🆗 Cow created successfully',
            data: result,
        });
    })
);
const getAllCows = (0, catchAsync_1.default)((req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const filters = (0, pick_1.default)(req.query, ['searchTerm']);
        const paginationOptions = (0, pick_1.default)(req.query, [
            'page',
            'limit',
            'sortBy',
            'sortOrder',
            'minPrice',
            'maxPrice',
            'location',
        ]);
        const result = yield cow_service_1.CowService.getAllCows(
            filters,
            paginationOptions
        );
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: '🆗 Cows data retrived successfully!',
            meta: result.meta || null,
            data: result.data,
        });
    })
);
const getSingleCow = (0, catchAsync_1.default)((req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const result = yield cow_service_1.CowService.getSingleCow(id);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: '🆗Single Cow data retrived successfully!',
            data: result,
        });
    })
);
const updateCow = (0, catchAsync_1.default)((req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const updateCow = req.body;
        const result = yield cow_service_1.CowService.updateCow(id, updateCow);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: '🆗 Cow data updated successfully!',
            data: result,
        });
    })
);
const deleteCow = (0, catchAsync_1.default)((req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const result = yield cow_service_1.CowService.deleteCow(id);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: '🆗 Cow deleted successfully!',
            data: result,
        });
    })
);
exports.CowController = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
