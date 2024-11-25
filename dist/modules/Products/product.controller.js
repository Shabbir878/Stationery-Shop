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
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
const formattedError_1 = require("../../error/formattedError");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const zodParsedData = product_validation_1.default.parse(productData);
        const result = yield product_service_1.ProductServices.createProductIntoDB(zodParsedData);
        const formattedProduct = {
            _id: result._id,
            name: result.name,
            brand: result.brand,
            price: result.price,
            category: result.category,
            description: result.description,
            quantity: result.quantity,
            inStock: result.inStock,
        };
        res.status(200).json({
            message: 'Product created successfully',
            success: true,
            data: formattedProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to create the product',
            success: false,
            error: (0, formattedError_1.formatErrorResponse)(error),
            stack: error.stack || 'No stack trace available',
        });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        let result;
        if (searchTerm) {
            result = yield product_service_1.ProductServices.searchProductFromDB(searchTerm);
        }
        else {
            result = yield product_service_1.ProductServices.getAllProductsFromDB();
        }
        // Format the results
        const formattedResults = result.map((product) => ({
            _id: product._id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            category: product.category,
            description: product.description,
            quantity: product.quantity,
            inStock: product.inStock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        }));
        res.status(200).json({
            success: true,
            message: 'Products retrieved successfully',
            data: formattedResults,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve products',
            error: (0, formattedError_1.formatErrorResponse)(error),
            stack: error.stack || 'No stack trace available',
        });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getProductByIdFromDB(productId);
        res.status(200).json({
            message: 'Product retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve the product',
            success: false,
            error: (0, formattedError_1.formatErrorResponse)(error),
            stack: error.stack || 'No stack trace available',
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateData = req.body;
        const result = yield product_service_1.ProductServices.updateProductIntoDB(productId, updateData);
        res.status(200).json({
            message: 'Product updated successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to update the product',
            success: false,
            error: (0, formattedError_1.formatErrorResponse)(error),
            stack: error.stack || 'No stack trace available',
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        yield product_service_1.ProductServices.deleteProductFromDB(productId);
        res.status(200).json({
            message: 'Product deleted successfully',
            success: true,
            data: {},
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to delete the product',
            success: false,
            error: (0, formattedError_1.formatErrorResponse)(error),
            stack: error.stack || 'No stack trace available',
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
