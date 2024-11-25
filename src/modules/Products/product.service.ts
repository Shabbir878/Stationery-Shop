import { IProduct } from './product.interface';
import { Product } from './product.model';

// Create a new product
const createProductIntoDB = async (productData: IProduct) => {
  const result = await Product.create(productData);
  return result;
};

//Get All Products
const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

// Get all products, with search functionality
const searchProductFromDB = async (searchTerm: string) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: searchTerm, $options: 'i' } },
      { brand: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
    ],
  });

  return result;
};

// Get a product by ID
const getProductByIdFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

// Update a product by ID
const updateProductIntoDB = async (
  id: string,
  updateData: Partial<IProduct>,
) => {
  const result = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return result;
};

// Delete a product by ID
const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  searchProductFromDB,
  getProductByIdFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
