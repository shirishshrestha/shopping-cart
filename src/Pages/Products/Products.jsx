import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getProducts } from "../../Utils/apiSlice/ProductsApiSlice";
import { Helmet } from "react-helmet";
import { Button, Heading, Img, Text } from "../../components/Components";
import { StarSvg } from "../../assets/SVG/SvgImages";
import { addItemToCart } from "../../Utils/apiSlice/CartApiSlice";
import LoginPopup from "../Login/LoginPopup";
import { useShoppingContext } from "../../Utils/Context/ShoppingContext";
import { notifyError, notifySuccess } from "../../components/Toast/Toast";
import ItemSkeleton from "../../components/LoadingSkeleton/ItemSkeleton";

const Products = () => {
  const [loginPopup, setLoginPopup] = useState(false);
  const [cartItem, setCartItem] = useState();
  const { isLoggedIn } = useShoppingContext();

  const { data: ProductsData, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const AddToCart = useMutation({
    mutationFn: (product) => addItemToCart(product),
    onSuccess: () => {
      notifySuccess("Item added to cart");
    },
    onError: () => {
      notifyError("Error adding item to cart");
    },
  });

  const addToCart = (product, signal) => {
    setCartItem(product);
    if (isLoggedIn) {
      AddToCart.mutate(product);
    } else if (signal) {
      AddToCart.mutate(product);
      setLoginPopup(!signal);
    } else {
      setLoginPopup(true);
      document.body.style.overflow = "hidden";
    }
  };

  const handleLoginPopupClose = () => {
    setLoginPopup(false);
    document.body.style.overflow = "auto";
  };
  return (
    <>
      <Helmet>
        <title>Products | Shop the Extraordinary</title>
        <link rel="icon" type="image/svg+xml" href="/images/helmet.svg" />
        <meta name="description" content="Shop the extraordinary" />
      </Helmet>
      {loginPopup && (
        <div className=" fixed flex items-center justify-center w-full bg-gray-800/35 inset-0">
          <div
            className=" h-full w-full fixed z-40"
            onClick={handleLoginPopupClose}
          ></div>
          <div className="z-50 bg-white-A700 p-10">
            <LoginPopup
              setLoginPopup={setLoginPopup}
              cartItem={cartItem}
              handleLoginPopupClose={handleLoginPopupClose}
              addToCart={addToCart}
            />
          </div>
        </div>
      )}
      <section className="products">
        <div className="flex flex-col items-center justify-start w-full pt-[2rem] pb-[5rem] gap-8 ">
          <div className="flex flex-row justify-between items-center w-full">
            <Heading size="s" as="h2">
              Products
            </Heading>
          </div>
          {isPending ? (
            <div className="flex flex-col gap-[3rem]">
              <ItemSkeleton />
              <ItemSkeleton />
              <ItemSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-[3rem]">
              {ProductsData?.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-start gap-3.5"
                >
                  <Img
                    src={product.thumbnail}
                    alt={product.title}
                    className=" h-[18rem] object-cover"
                  />
                  <div className="flex flex-col items-center justify-start  gap-[9px]">
                    <Text
                      size="md"
                      as="p"
                      className="!text-gray-800 text-[1.3rem] capitalize   overflow-hidden truncate"
                    >
                      {product.title.length > 20
                        ? `${product.title.substring(0, 20)}...`
                        : product.title}
                    </Text>
                    <Text
                      size="xs"
                      as="p"
                      className="!text-gray-800 capitalize"
                    >
                      {product.brand}
                    </Text>
                    <div className="grid grid-cols-2  gap-[2rem]">
                      <Text as="p" className="!font-medium">
                        {`$${product.price}`}
                      </Text>
                      <div className="flex gap-[0.5rem]">
                        <StarSvg />
                        <Text as="p" className="!font-medium">
                          {product.rating}
                        </Text>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="5xl"
                    className="font-bold min-w-[200px]"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
