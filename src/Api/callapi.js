import service from "./axios";

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await service.get("/stocks");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};

// Fetch a specific product by ID
export const fetchProductById = async (productId) => {
  try {
    const response = await service.get(`/stocks/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch product details");
  }
};

// Update stock for a product
export const updateProductStock = async (productId, updatedData) => {
  try {
    await service.patch(`/stocks/${productId}`, updatedData);
  } catch (error) {
    throw new Error("Failed to update product stock");
  }
};

//   stock fetch
export const fetchStocks = async () => {
  try {
    const response = await service.get("/stocks");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching stock data");
  }
};
