import { useMutation, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { getCartData } from "../../Utils/apiSlice/CartApiSlice";
import { Button, Text } from "../../components/Components";
import { Link } from "react-router-dom";
import CartProduct from "./CartProduct";
import { checkoutProductsCart } from "../../Utils/apiSlice/EsewaApiSlice";
import { useState } from "react";

const Cart = () => {
  const [transId, setTransId] = useState();

  const { data: CartData } = useQuery({
    queryKey: ["CartData"],
    queryFn: getCartData,
  });

  const calculateTotalPrice = () => {
    if (CartData && CartData.length > 0) {
      return CartData.reduce((total, product) => {
        return total + product.productData.price;
      }, 0);
    }
    return 0;
  };

  const totalProductPrice = calculateTotalPrice();
  const totalPrice = totalProductPrice + 5;

  const createSignature = () => {
    const transaction_uuid = Math.floor(Math.random() * 100) + 1;
    setTransId(transaction_uuid);
    createSignature();
  };

  const onClickCheckout = () => {
    checkoutProductsCart(totalPrice, transId);
  };

  return (
    <>
      <Helmet>
        <title>Cart | Shop the Extraordinary</title>
        <link rel="icon" type="image/svg+xml" href="/images/helmet.svg" />
        <meta name="description" content="Shop the extraordinary" />
      </Helmet>
      <div className="mx-auto max-w-7xl px-2 lg:px-0">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
            Shopping Cart
          </h2>
          <div
            className={`mt-12  ${
              CartData && CartData.length > 0 && "flex gap-[2rem] lp:flex-col"
            }`}
          >
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg  bg-white lg:col-span-8"
            >
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <div className="min-h-[52.8vh]  flex flex-col gap-4 lp:min-h-fit">
                {CartData && CartData.length > 0 ? (
                  CartData.map((product, index) => (
                    <CartProduct key={index} product={product} />
                  ))
                ) : (
                  <div className="flex flex-col h-[52.8vh] w-full items-center justify-center rounded-md px-3.5 py-2.5 text-xl font-semibold leading-7 text-gray-800 gap-[1.5rem]">
                    There are no items in this Cart
                    <Link to="/products">
                      <Button size="xl" className="text-xl">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </section>
            {CartData && CartData.length > 0 ? (
              <div className="flex-auto p-[1rem] bg-gray-50 !h-fit lp:mb-[20rem] mb:mb-[2rem]">
                <Text size="md" as="h4" className="text-gray-800 leading-10">
                  Order Summary
                </Text>
                <div className="flex justify-between ">
                  <Text className="text-[16px]">
                    Subtotal ({(CartData && CartData.length) || 0} items)
                  </Text>
                  <Text className="text-gray-800 text-[16px]">
                    ${totalProductPrice}
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text className="text-[16px]">Shipping Charge</Text>
                  <Text className="text-gray-800 text-[16px]">$5</Text>
                </div>
                <div className="flex justify-between ">
                  <Text className="text-[16px]">Total</Text>
                  <Text className="text-gray-800 text-[16px]">
                    ${totalPrice}
                  </Text>
                </div>
                <div className="flex justify-between ">
                  <Text className="text-[16px]">Total NPR</Text>
                  <Text className="text-gray-800 text-[16px]">
                    Rs. {totalPrice * 133}
                  </Text>
                </div>
                <Button
                  onClick={onClickCheckout}
                  size="md"
                  className="text-xl font-semibold mt-5"
                >
                  Proceed to Checkout ({(CartData && CartData.length) || 0})
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
