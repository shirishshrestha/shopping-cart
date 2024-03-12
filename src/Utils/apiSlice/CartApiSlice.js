import jsonInstance from "../Axios/JsonAxios";

/**
 * Fetches the cart data from the server.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of cart items.
 * @throws {Error} If an error occurs during the request.
 */
export const getCartData = async () => {
  try {
    const cartReq = await jsonInstance.get("/products");
    const cartResp = cartReq.data;
    return cartResp;
  } catch (e) {
    console.log(error);
  }
};

/**
 * Adds a new item to the cart.
 *
 * @param {Object} product - The product data to be added to the cart.
 * @returns {Promise<Object>} A promise that resolves to the added cart item.
 */
export const addItemToCart = async (product) => {
  const productData = {
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    rating: product.rating,
    stock: product.stock,
    brand: product.brand,
    category: product.category,
    thumbnail: product.thumbnail,
  };
  try {
    const newItem = await jsonInstance.post(
      "/products",
      { productData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return newItem.data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Deletes a cart item based on the provided product ID.
 *
 * @param {string} productId - The ID of the product to be removed from the cart.
 * @returns {Promise<Object>} A promise that resolves to the deleted cart item.
 * @throws {Error} If an error occurs during the request.
 */
export const deleteCartItem = async (productId) => {
  try {
    const deleteItem = await jsonInstance.delete(`/products/${productId}`);
    return deleteItem.data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Deletes all products from the cart.
 *
 * @returns {Promise<void>} A promise that resolves when all products are deleted.
 * @throws {Error} If an error occurs during the request.
 */
export const deleteAllProducts = async () => {
  try {
    // Get the list of products first
    const cartResponse = await jsonInstance.get("/products");
    const products = cartResponse.data;

    // Loop through the products and delete each one
    for (const product of products) {
      await jsonInstance.delete(`products/${product.id}`);
    }
  } catch (error) {
    // Handle error, e.g., show an error message
    console.error("Error deleting items", error);
  }
};
