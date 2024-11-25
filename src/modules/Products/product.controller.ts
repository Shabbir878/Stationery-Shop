import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';
import { formatErrorResponse } from '../../error/formattedError';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParsedData = productValidationSchema.parse(productData);
    const result = await ProductServices.createProductIntoDB(zodParsedData);

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
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to create the product',
      success: false,
      error: formatErrorResponse(error),
      stack: error.stack || 'No stack trace available',
    });
  }
};

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const searchTerm = req.query.searchTerm as string;

    let result;
    if (searchTerm) {
      result = await ProductServices.searchProductFromDB(searchTerm);
    } else {
      result = await ProductServices.getAllProductsFromDB();
    }

    // Format the results
    const formattedResults = result.map((product: any) => ({
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve products',
      error: formatErrorResponse(error),
      stack: error.stack || 'No stack trace available',
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getProductByIdFromDB(productId);
    res.status(200).json({
      message: 'Product retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to retrieve the product',
      success: false,
      error: formatErrorResponse(error),
      stack: error.stack || 'No stack trace available',
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const result = await ProductServices.updateProductIntoDB(
      productId,
      updateData,
    );
    res.status(200).json({
      message: 'Product updated successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to update the product',
      success: false,
      error: formatErrorResponse(error),
      stack: error.stack || 'No stack trace available',
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await ProductServices.deleteProductFromDB(productId);
    res.status(200).json({
      message: 'Product deleted successfully',
      success: true,
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to delete the product',
      success: false,
      error: formatErrorResponse(error),
      stack: error.stack || 'No stack trace available',
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
