import jsonInstance from "../Axios/JsonAxios";

export const getCartData = async () => {
  try {
    const cartReq = await jsonInstance.get("/products");
    const cartResp = cartReq.data;
    return cartResp;
  } catch (e) {
    console.log(error);
  }
};

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

export const deleteCartItem = async (productId) => {
  try {
    const deleteItem = await jsonInstance.delete(`/products/${productId}`);
    return deleteItem.data;
  } catch (e) {
    console.log(e);
  }
};

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
