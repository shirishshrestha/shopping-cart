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
  const newItem = await jsonInstance.post(
    "/products",
    { productData },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
