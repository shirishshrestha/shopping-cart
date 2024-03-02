import { Heading, Img, Input, Text } from "../Components";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className=" flex justify-center items-center w-full p-[30px] bg-gray-800">
      <div className="main-container flex flex-col items-start justify-center w-[83%] mt-[31px] ml-[113px] gap-[82px]">
        <div className="flex flex-row justify-end w-full">
          <div className="flex flex-row justify-between items-start w-full">
            <div className="flex flex-row justify-between items-start w-[63%]">
              <div className="flex flex-col items-start justify-start w-[45%] gap-[30px]">
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
                  placeholder="Enter your email"
                  suffix={
                    <Img src="images/img_arrow_gray_800.svg" alt="Arrow" />
                  }
                  className="w-[91%] gap-[35px] text-gray-500_87 tracking-[0.36px]"
                />
              </div>
              <div className="flex flex-col items-start justify-start w-[18%] gap-[25px]">
                <Heading as="h4" className="!text-white-A700">
                  Product Links
                </Heading>
                <div className="flex flex-col items-start justify-center gap-[15px]">
                  <Text as="p" className="mt-px !text-white-A700">
                    Categories
                  </Text>
                  <Text as="p" className="!text-white-A700">
                    New Arrival
                  </Text>
                  <Text as="p" className="!text-white-A700">
                    Features
                  </Text>
                  <Text as="p" className="!text-white-A700">
                    Collections
                  </Text>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-[13%] mt-1 gap-[21px]">
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
            </div>
            <div className="flex flex-row justify-between items-start w-[28%]">
              <div className="flex flex-col items-start justify-start w-[36%] gap-6">
                <Heading as="h4" className="!text-white-A700">
                  Get In Touch
                </Heading>
                <div className="flex flex-row justify-between w-[79%]">
                  <Img
                    src="images/img_instagram.svg"
                    alt="instagram_one"
                    className="h-6 w-6"
                  />
                  <div className="flex flex-col items-center justify-start h-6 w-6">
                    <div className="flex flex-col items-center justify-start h-6 w-6">
                      <Img
                        src="images/img_twitter.svg"
                        alt="twitter_one"
                        className="h-6 w-6"
                      />
                    </div>
                  </div>
                  <Img
                    src="images/img_facebook.svg"
                    alt="facebook_one"
                    className="h-6 w-6"
                  />
                </div>
              </div>
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
