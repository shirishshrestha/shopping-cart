import instance from "../Axios/Axios";

export const getProducts = async (searchInput, selectedData, skipData) => {
  if (!selectedData) {
    const products = await instance.get(
      `/products/search?q=${searchInput}&limit=12&skip=${skipData}`
    );
    const productsResponse = products.data;
    return productsResponse;
  } else {
    const products = await instance.get(`/products/category/${selectedData}`);
    const productsResponse = products.data;
    return productsResponse;
  }
};

export const getFeaturedProducts = async () => {
  const featuredProducts = await instance.get("/products?limit=8&skip=10");
  const featuredProductsResponse = featuredProducts.data.products;
  return featuredProductsResponse;
};

export const loginUser = async (username, password) => {
  const userReq = await instance.post(
    "/auth/login",
    {
      username: username,
      password: password,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return userReq.data;
};
