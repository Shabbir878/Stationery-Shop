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
exports.OrderControllers = void 0;
const order_validation_1 = __importDefault(require("./order.validation"));
const order_service_1 = require("./order.service");
const formattedError_1 = require("../../error/formattedError");
// Place an order
// const createOrder = async (req: Request, res: Response) => {
//   try {
//     const validatedData = orderValidationSchema.parse(req.body);
//     const order = await OrderServices.createOrder(validatedData);
//     res.status(200).json({
//       message: 'Order created successfully',
//       success: true,
//       data: order,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       message: 'Validation failed',
//       success: false,
//       error: formatErrorResponse(error),
//       stack: error.stack || 'No stack trace available',
//     });
//   }
// };
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = order_validation_1.default.parse(req.body);
        const order = yield order_service_1.OrderServices.createOrder(validatedData);
        // Format the order object
        const formattedOrder = {
            _id: order._id,
            email: order.email,
            product: order.product,
            quantity: order.quantity,
            totalPrice: order.totalPrice,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        };
        res.status(200).json({
            message: 'Order created successfully',
            status: true,
            data: formattedOrder,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Validation failed',
            success: false,
            error: (0, formattedError_1.formatErrorResponse)(error),
            stack: error.stack || 'No stack trace available',
        });
    }
});
// Get total revenue
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const revenue = yield order_service_1.OrderServices.calculateRevenue();
        res.status(200).json({
            message: 'Revenue calculated successfully',
            success: true,
            data: revenue,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to calculate revenue',
            success: false,
            error: (0, formattedError_1.formatErrorResponse)(error),
            stack: error.stack || 'No stack trace available',
        });
    }
});
exports.OrderControllers = {
    createOrder,
    calculateRevenue,
};
