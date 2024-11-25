import { Product } from '../Products/product.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

// Create a new order
const createOrder = async (orderData: IOrder) => {
  const { product, quantity } = orderData;

  // Check product availability
  const productItem = await Product.findById(product);
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
  await productItem.save();

  // Create the order
  const order = new Order(orderData);
  return await order.save();
};

// Calculate total revenue

const calculateRevenue = async () => {
  const result = await Order.aggregate([
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

  const totalRevenue = result[0]?.totalRevenue || 0;
  return { totalRevenue };
};

export const OrderServices = {
  createOrder,
  calculateRevenue,
};
