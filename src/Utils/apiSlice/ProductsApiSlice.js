import instance from "../Axios/Axios";

export const getProducts = async () => {
  const products = await instance.get("/products");
  const productsResponse = products.data.products;
  return productsResponse;
};

export const getFeaturedProducts = async () => {
  const featuredProducts = await instance.get("/products?limit=8&skip=10");
  const featuredProductsResponse = featuredProducts.data.products;
  return featuredProductsResponse;
};
