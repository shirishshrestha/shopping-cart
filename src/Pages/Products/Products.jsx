import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getProducts } from "../../Utils/apiSlice/ProductsApiSlice";
import { Helmet } from "react-helmet";
import {
  Button,
  Heading,
  Img,
  Input,
  ItemSkeleton,
  Pagination,
  Text,
} from "../../components/Components";
import { ErrorSvg, SearchSvg, StarSvg } from "../../assets/SVG/SvgImages";
import { addItemToCart } from "../../Utils/apiSlice/CartApiSlice";
import LoginPopup from "../Login/LoginPopup";
import { useShoppingContext } from "../../Utils/Context/ShoppingContext";
import { notifyError, notifySuccess } from "../../components/Toast/Toast";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";

/**
 * Component representing the products page.
 *
 * @returns {JSX.Element} - The JSX element representing the products page.
 */
const Products = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [searchData, setSearchData] = useState("");
  const [selectedData, setSelectedData] = useState("");
  const [skipData, setSkipData] = useState(0);
  const [loginPopup, setLoginPopup] = useState(false);
  const [cartItem, setCartItem] = useState();
  const { isLoggedIn } = useShoppingContext();

  const { data: ProductsData, isPending } = useQuery({
    queryKey: ["products", searchData, selectedData, skipData],
    queryFn: () => getProducts(searchData, selectedData, skipData),
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

  /**
   * Handles adding an item to the cart.
   *
   * @param {Object} product - The product to be added to the cart.
   * @param {boolean} signal - A signal indicating if the user is logged in.
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
   * Closes the login popup.
   */
  const handleLoginPopupClose = () => {
    setLoginPopup(false);
  };

  /**
   * Handles the search input form submission.
   *
   * @param {Object} data - The form data containing the search input.
   */
  const searchInput = (data) => {
    setSelectedData("");
    setSkipData(0);
    setSearchData(data.search);
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (e.target.value === "None") {
      setSearchData("");
      setSelectedData("");
    } else {
      setSelectedData(selectedValue);
    }
  };

  const pagination = Math.ceil(ProductsData?.total / 12);
  const pagesArray = Array.from(
    { length: pagination },
    (_, index) => index + 1
  );

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
        <div className="flex flex-col items-center justify-start w-full pt-[2rem] pb-[5rem] gap-8 mb:pb-[1rem]">
          <div className="flex flex-col w-full">
            <Heading size="s" as="h2">
              Products
            </Heading>
            <div className="flex w-full justify-between mb:flex-col mb:gap-[2rem]">
              <form onSubmit={handleSubmit(searchInput)}>
                <Input
                  prefix={<SearchSvg />}
                  name="search"
                  register={register}
                  errors={errors}
                  placeholder="Search"
                  defaultValue=""
                  regValue={"^[a-zA-Z\\s]+$"}
                  message={"Invalid input. Please enter alphabets only"}
                  className="bg-gray-100 w-fit mt-7"
                />
              </form>
              <div className="flex gap-5 justify-center items-center mb:justify-start">
                <Text className="text-gray-800">Filter By Categories: </Text>
                <select
                  name="filter"
                  className="border-solid rounded-lg p-1 border-gray-800 border-2"
                  onChange={handleSelectChange}
                >
                  <option value={null} defaultValue={"None"}>
                    None
                  </option>
                  <option value="smartphones">Smartphones </option>
                  <option value="laptops">Laptops </option>
                  <option value="fragrances">Fragrances </option>
                  <option value="skincare">Skincare</option>
                  <option value="groceries">Groceries</option>
                  <option value="home-decoration">Home-decoration</option>
                  <option value="furniture">Furniture</option>
                  <option value="womens-dresses">Womens-dresses</option>
                  <option value="womens-shoes">Womens-shoes</option>
                  <option value="mens-shoes">Mens-shoes</option>
                  <option value="mens-shirts">Mens-shirts</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="lighting">Lighting</option>
                  <option value="automotive">Automotive</option>
                  <option value="sunglasses">Sunglasses</option>
                </select>
              </div>
            </div>
          </div>
          {isPending ? (
            <ItemSkeleton />
          ) : (
            <div
              className={
                ProductsData?.products.length > 0
                  ? "grid grid-cols-4 gap-[3rem] ds:grid-cols-3 ds:gap-[3rem] lp:grid-cols-2 mb:grid-cols-1 "
                  : ""
              }
            >
              {ProductsData?.products.length > 0 ? (
                ProductsData.products.map((product, index) => (
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
                ))
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-[50vh]">
                  <ErrorSvg />
                  <Text size="md" className="text-gray-800">
                    Whoops! Search Item Not Found
                  </Text>
                </div>
              )}
            </div>
          )}
          {isPending ? (
            <>
              <div className="flex gap-[1rem] mt-[1rem] mb:mt-[0rem]">
                <Skeleton height={60} width={60} />
                <Skeleton height={60} width={60} />
                <Skeleton height={60} width={60} />
              </div>
              <div className="hidden mb:inline mb:-mt-[0.5rem]">
                <Skeleton height={60} width={60} />
              </div>
            </>
          ) : (
            <Pagination
              pagination={pagination}
              pagesArray={pagesArray}
              setSkipData={setSkipData}
              skipData={skipData}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
