import { Helmet } from "react-helmet";
import {
  Button,
  Heading,
  Img,
  SwiperSkeleton,
  Text,
} from "../../components/Components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { ArrowSvg, StarSvg } from "../../assets/SVG/SvgImages";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getFeaturedProducts } from "../../Utils/apiSlice/ProductsApiSlice";
import { Link } from "react-router-dom";
import { useShoppingContext } from "../../Utils/Context/ShoppingContext";
import LoginPopup from "../Login/LoginPopup";
import { useState } from "react";
import { addItemToCart } from "../../Utils/apiSlice/CartApiSlice";
import { notifySuccess } from "../../components/Toast/Toast";
import { HomePageSkeleton } from "../../components/LoadingSkeleton/HomePageSkeleton";

/**
 * Component representing the home page of the IntuCart application.
 *
 * @returns {JSX.Element} - The JSX element representing the home page.
 */
const HomePage = () => {
  const { data: FeaturedProduct, isPending } = useQuery({
    queryKey: ["FeaturedProducts"],
    queryFn: getFeaturedProducts,
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

  const [loginPopup, setLoginPopup] = useState(false);
  const [cartItem, setCartItem] = useState();
  const { isLoggedIn } = useShoppingContext();

  /**
   * Adds the specified product to the cart and handles login-related actions.
   *
   * @param {Object} product - The product to be added to the cart.
   * @param {boolean} signal - Signal to show/hide the login popup.
   */
  const addToCart = (product, signal) => {
    setCartItem(product);
    if (isLoggedIn) {
      AddToCart.mutate(product);
    } else if (signal) {
      AddToCart.mutate(product);
      setLoginPopup(!signal);
    } else {
      setLoginPopup(true);
    }
  };

  /**
   * Handles the close event for the login popup.
   */
  const handleLoginPopupClose = () => {
    setLoginPopup(false);
  };
  return (
    <>
      <Helmet>
        <title>IntuCart | Shop the Extraordinary</title>
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
      <section>
        <div className="flex flex-row justify-center w-full pb-[5rem]">
          <div className="flex flex-row justify-end w-full ">
            <div className="flex flex-row justify-end items-start w-full mx-auto max-w-[1776px] ds:justify-center mb:flex-col-reverse ">
              <div className="flex flex-col items-start justify-start w-[40%] mt-[102px] ds:mt-[80px] mb:w-full mb:mt-[20px]">
                <Text
                  size="xl"
                  as="p"
                  className="!text-gray-800 !font-[playfairdisplay] ds:!text-[4.9rem] lp:!text-[4.2rem]"
                >
                  Shop Smarter, Not Harder
                </Text>

                <Text
                  as="p"
                  className="w-[93%] mt-[34px] !text-gray-800 leading-8 ds:mt-[20px] lp:text-[1rem]"
                >
                  Let your purchases shape a world of endless possibilities in
                  the realm of online treasures.
                </Text>
                <Link to="products">
                  <Button
                    size="3xl"
                    rightIcon={<ArrowSvg />}
                    className="mt-14 gap-2.5 font-medium min-w-[245px] ds:mt-[30px] lp:h-14 lp:px-2 lp:text-xl"
                  >
                    Shop Now
                  </Button>
                </Link>
              </div>
              <div className=" flex flex-row justify-end w-[55%] pt-[3rem] mb:w-full mb:pt-[1rem]">
                {isPending ? (
                  <SwiperSkeleton />
                ) : (
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="w-fit"
                  >
                    {FeaturedProduct?.map((product, index) => (
                      <SwiperSlide key={index}>
                        <figure className=" flex justify-center items-center">
                          <Img
                            src={product.thumbnail}
                            alt={product.title}
                            className=" h-[30rem] object-cover"
                          />
                        </figure>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-full pt-[2rem] pb-[5rem] gap-8 ">
          <div className="flex flex-row justify-between items-center w-full">
            <Heading size="s" as="h2">
              Featured
            </Heading>
            <div className="flex flex-row justify-center">
              <Link to="/products">
                <Text as="p" className="!text-gray-800 !font-medium">
                  View all
                </Text>
              </Link>
            </div>
          </div>
          {isPending ? (
            <HomePageSkeleton />
          ) : (
            <div className="grid grid-cols-4 gap-y-[3rem] ds:grid-cols-3 lp:grid-cols-2 mb:grid-cols-1">
              {FeaturedProduct?.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-start gap-3.5"
                >
                  <Img
                    src={product.thumbnail}
                    alt={product.title}
                    className=" h-[18rem] object-contain"
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

export default HomePage;
