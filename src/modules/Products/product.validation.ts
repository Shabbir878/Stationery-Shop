import { z } from 'zod';

const productValidationSchema = z.object({
  name: z.string(),
  brand: z.string(),
  price: z.number().positive(),
  category: z.enum([
    'Writing',
    'Office Supplies',
    'Art Supplies',
    'Educational',
    'Technology',
  ]),
  description: z.string(),
  quantity: z.number().min(0),
  inStock: z.boolean().optional(),
});

export default productValidationSchema;
