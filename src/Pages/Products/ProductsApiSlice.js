import instance from "../../Axios/Axios";

export const getProducts = async () => {
  const products = await instance.get("/product");
  const productsResponse = products.data.products;
  return productsResponse;
};
