import instance from "../Axios/Axios";

/**
 * Fetches products based on search input, selected category, and skip value.
 *
 * @param {string} searchInput - The search input for product search.
 * @param {string|null} selectedData - The selected category for filtering products.
 * @param {number} skipData - The number of items to skip in the result set.
 * @returns {Promise<Object[]>} A promise that resolves to an array of products.
 * @throws {Error} If an error occurs during the request.
 */
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

/**
 * Fetches a list of featured products.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of featured products.
 * @throws {Error} If an error occurs during the request.
 */
export const getFeaturedProducts = async () => {
  const featuredProducts = await instance.get("/products?limit=8&skip=10");
  const featuredProductsResponse = featuredProducts.data.products;
  return featuredProductsResponse;
};

/**
 * Logs in a user using the provided username and password.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} A promise that resolves to the user data.
 * @throws {Error} If an error occurs during the request.
 */
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
