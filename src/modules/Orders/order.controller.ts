import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { OrderServices } from './order.service';
import { formatErrorResponse } from '../../error/formattedError';

// Place an order
const createOrder = async (req: Request, res: Response) => {
  try {
    const validatedData = orderValidationSchema.parse(req.body);
    const order = await OrderServices.createOrder(validatedData);
    res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Validation failed',
      success: false,
      error: formatErrorResponse(error),
      stack: error.stack || 'No stack trace available',
    });
  }
};

// Get total revenue
const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const revenue = await OrderServices.calculateRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: revenue,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to calculate revenue',
      success: false,
      error: formatErrorResponse(error),
      stack: error.stack || 'No stack trace available',
    });
  }
};

export const OrderControllers = {
  createOrder,
  calculateRevenue,
};
