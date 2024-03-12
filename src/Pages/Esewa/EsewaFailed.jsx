import React from "react";
import { ErrorSvg } from "../../assets/SVG/SvgImages";
import { useNavigate } from "react-router-dom";
import { Button, Text } from "../../components/Components";
import { Helmet } from "react-helmet";

/**
 * Component representing the page displayed when eSewa payment fails.
 *
 * @returns {JSX.Element} - The JSX element representing the failed payment page.
 */
const EsewaFailed = () => {
  const navigate = useNavigate();

  /**
   * Handles the click event for the "Home" button, navigating to the home page.
   */
  const onClickHome = () => {
    navigate("/");
  };
  return (
    <>
      <Helmet>
        <title>Payment Failed</title>
        <link rel="icon" type="image/svg+xml" href="/images/helmet.svg" />
        <meta name="description" content="Shop the extraordinary" />
      </Helmet>
      <section className="login flex flex-col justify-center items-center w-full h-[100vh]">
        <ErrorSvg />
        <Text as={"h4"} size="md" className="text-gray-800 mt-[16px]">
          Payment Failed
        </Text>

        <div>
          <div>
            <Text size="xs" className="mt-[64px]">
              Please contact the admin at{" "}
              <a className="underline" href="mailto:admin@intucart.com">
                admin@intucart.com
              </a>{" "}
              for help
            </Text>
          </div>
        </div>
        <Button className="mt-[120px]" onClick={onClickHome}>
          Home
        </Button>
      </section>
    </>
  );
};

export default EsewaFailed;
