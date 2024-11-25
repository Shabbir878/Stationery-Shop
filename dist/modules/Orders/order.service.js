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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const product_model_1 = require("../Products/product.model");
const order_model_1 = require("./order.model");
// Create a new order
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { product, quantity } = orderData;
    // Check product availability
    const productItem = yield product_model_1.Product.findById(product);
    if (!productItem) {
        throw new Error('Product not found');
    }
    if (productItem.quantity < quantity) {
        throw new Error('Insufficient stock available');
    }
    // Reduce inventory
    productItem.quantity -= quantity;
    if (productItem.quantity === 0) {
        productItem.inStock = false;
    }
    yield productItem.save();
    // Create the order
    const order = new order_model_1.Order(orderData);
    return yield order.save();
});
// Calculate total revenue
const calculateRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield order_model_1.Order.aggregate([
        {
            $addFields: {
                productId: { $toObjectId: '$product' },
            },
        },
        {
            $lookup: {
                from: 'products',
                localField: 'productId',
                foreignField: '_id',
                as: 'productDetails',
            },
        },
        {
            $unwind: '$productDetails',
        },
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: {
                        $multiply: ['$productDetails.price', '$quantity'],
                    },
                },
            },
        },
    ]);
    const totalRevenue = ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0;
    return { totalRevenue };
});
exports.OrderServices = {
    createOrder,
    calculateRevenue,
};
