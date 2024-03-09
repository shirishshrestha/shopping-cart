import { ArrowSvg } from "../../assets/SVG/SvgImages";
import { Heading, Img, Input, Text } from "../Components";
import { FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { useForm } from "react-hook-form";

const Footer = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  const year = new Date().getFullYear();
  return (
    <footer className=" flex justify-center items-center w-full p-[30px] bg-gray-800">
      <div className="main-container w-full flex flex-col items-start justify-center  mt-[31px]  gap-[82px]">
        <div className="flex w-full  justify-between ">
          <div className="flex flex-col items-start justify-start  gap-[30px]">
            <Heading as="h4" className="!text-white-A700">
              Join our Newsletter
            </Heading>
            <Text as="p" className="!text-white-A700">
              Drop your email below to get update about us, <br />
              lastest news, tips, and more!
            </Text>
            <Input
              color="white_A700"
              variant="fill"
              type="email"
              name="email"
              register={register}
              errors={errors}
              placeholder="Enter your email"
              suffix={<ArrowSvg />}
              className="w-[91%] gap-[35px] text-gray-800 tracking-[0.36px]"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-[25px]">
            <Heading as="h4" className="!text-white-A700">
              Product Links
            </Heading>
            <div className="flex flex-col items-start justify-center gap-[15px]">
              <Text as="p" className="mt-px !text-white-A700">
                Products
              </Text>
              <Text as="p" className="!text-white-A700">
                Categories
              </Text>
              <Text as="p" className="!text-white-A700">
                Features
              </Text>
              <Text as="p" className="!text-white-A700">
                Collections
              </Text>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start mt-1 gap-[21px]">
            <Heading as="h4" className="!text-white-A700">
              Company
            </Heading>
            <div className="flex flex-col items-start justify-start">
              <Text as="p" className="!text-white-A700">
                About
              </Text>
              <Text as="p" className="mt-3 !text-white-A700">
                Blog
              </Text>
              <a href="#" className="mt-[7px]">
                <Text as="p" className="!text-white-A700">
                  Careers
                </Text>
              </a>
              <Text as="p" className="mt-2.5 !text-white-A700">
                Contact{" "}
              </Text>
              <Text as="p" className="mt-[9px] !text-white-A700">
                Services
              </Text>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start  gap-6">
            <Heading as="h4" className="!text-white-A700">
              Get In Touch
            </Heading>
            <div className="flex  text-[2rem] gap-[1rem]">
              <FiInstagram className="fill-white-A700 stroke-gray-800" />
              <FaXTwitter className="fill-white-A700" />
              <FaFacebook className="fill-white-A700" />
            </div>
          </div>
        </div>

        <Text size="xs" as="p" className="!text-white-A700">
          Copyright © {year} IntuCart. All Right Reseved
        </Text>
      </div>
    </footer>
  );
};

export { Footer };
