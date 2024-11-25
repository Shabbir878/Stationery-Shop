"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    brand: zod_1.z.string(),
    price: zod_1.z.number().positive(),
    category: zod_1.z.enum([
        'Writing',
        'Office Supplies',
        'Art Supplies',
        'Educational',
        'Technology',
    ]),
    description: zod_1.z.string(),
    quantity: zod_1.z.number().min(0),
    inStock: zod_1.z.boolean().optional(),
});
exports.default = productValidationSchema;
