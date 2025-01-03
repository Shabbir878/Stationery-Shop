import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { OrderServices } from './order.service';
import { formatErrorResponse } from '../../error/formattedError';

const createOrder = async (req: Request, res: Response) => {
  try {
    const validatedData = orderValidationSchema.parse(req.body);
    const order = await OrderServices.createOrder(validatedData);

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
  } catch (error: any) {
    res.status(500).json({
      message: 'Validation failed',
      success: false,
      error: formatErrorResponse(error),
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
    });
  }
};

export const OrderControllers = {
  createOrder,
  calculateRevenue,
};
