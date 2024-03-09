import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { getCartData } from "../../Utils/apiSlice/CartApiSlice";
import { Button } from "../../components/Components";
import { Link } from "react-router-dom";
import CartProduct from "./CartProduct";

const Cart = () => {
  const { data: CartData } = useQuery({
    queryKey: ["CartData"],
    queryFn: getCartData,
  });

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
          <div className="mt-12 lg:grid lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8"
            >
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <div className="min-h-[52.8vh] w-full">
                {CartData && CartData.length > 0 ? (
                  CartData.map((product, index) => (
                    <CartProduct product={product.productData} />
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
