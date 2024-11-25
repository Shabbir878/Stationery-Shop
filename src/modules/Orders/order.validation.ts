import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  product: z.string().min(1, { message: 'Product ID is required' }),
  quantity: z
    .number()
    .int()
    .positive({ message: 'Quantity must be a positive integer' }),
  totalPrice: z
    .number()
    .positive({ message: 'Total price must be a positive number' }),
});

export default orderValidationSchema;
