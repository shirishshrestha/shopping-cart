import { Helmet } from "react-helmet";
import { Button, Heading, Img, Text } from "../../components/Components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { ArrowSvg, StarSvg } from "../../assets/SVG/SvgImages";
import { useQuery } from "@tanstack/react-query";
import {
  getFeaturedProducts,
  getProducts,
} from "../../Utils/apiSlice/ProductsApiSlice";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { data: FeaturedProduct } = useQuery({
    queryKey: ["FeaturedProducts"],
    queryFn: getFeaturedProducts,
  });
  return (
    <>
      <Helmet>
        <title>IntuCart | Shop the Extraordinary</title>
        <link rel="icon" type="image/svg+xml" href="/images/helmet.svg" />
        <meta name="description" content="Shop the extraordinary" />
      </Helmet>
      <section>
        <div className="flex flex-row justify-center w-full pb-[5rem]">
          <div className="flex flex-row justify-end w-full ">
            <div className="flex flex-row justify-end items-start w-full mx-auto max-w-[1776px]">
              <div className="flex flex-col items-start justify-start w-[40%] mt-[102px] z-[1]">
                <Text
                  size="xl"
                  as="p"
                  className="!text-gray-800 !font-[playfairdisplay]"
                >
                  Empower your style
                </Text>

                <Text
                  as="p"
                  className="w-[93%] mt-[34px] !text-gray-800 leading-8"
                >
                  Let your purchases shape a world of endless possibilities in
                  the realm of online treasures.
                </Text>
                <Button
                  size="3xl"
                  rightIcon={<ArrowSvg />}
                  className="mt-14 gap-2.5 font-medium min-w-[245px]"
                >
                  Shop Now
                </Button>
              </div>
              <div className="flex flex-row justify-end w-[55%] pt-[3rem]">
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Autoplay]}
                  className="w-fit "
                >
                  {FeaturedProduct?.map((product, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex justify-center items-center">
                        <Img
                          src={product.thumbnail}
                          alt={product.title}
                          className=" h-[30rem] object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
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
          <div className="grid grid-cols-4 gap-y-[3rem]">
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
                  <Text size="xs" as="p" className="!text-gray-800 capitalize">
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
                <Button size="5xl" className="font-bold min-w-[200px]">
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
