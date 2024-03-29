import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  CustomToastContainer,
  Input,
  Text,
} from "../../components/Components";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../Utils/apiSlice/ProductsApiSlice";
import { setTokenToLocalStorage } from "../../Utils/StorageUtils/StorageUtils";
import { useNavigate } from "react-router";
import { useShoppingContext } from "../../Utils/Context/ShoppingContext";
import { notifyError, notifySuccess } from "../../components/Toast/Toast";
import { Helmet } from "react-helmet";

/**
 * Component representing the login page of the IntuCart application.
 *
 * @returns {JSX.Element} - The JSX element representing the login page.
 */
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { setIsLoggedIn } = useShoppingContext();

  const LoginMutation = useMutation({
    mutationFn: (loginData) => {
      return loginUser(loginData.username, loginData.password);
    },
    onSuccess: (data) => {
      setTokenToLocalStorage(data.token);
      setIsLoggedIn(true);
      notifySuccess("Logged in successfully");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
    onError: () => {
      notifyError("Incorrect Username/Password");
    },
  });

  /**
   * Handles the submission of the login form.
   *
   * @param {Object} loginData - The login form data.
   */
  const handleLoginSubmit = (loginData) => {
    LoginMutation.mutate(loginData);
  };

  /**
   * Navigates to the home page.
   */
  const navigateHome = () => {
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>IntuCart | Shop the Extraordinary</title>
        <link rel="icon" type="image/svg+xml" href="/images/helmet.svg" />
        <meta name="description" content="Shop the extraordinary" />
      </Helmet>
      <section className="login flex flex-col justify-center items-center w-full h-[100vh]">
        <Text
          className="pb-12 text-gray-800 font-semibold "
          size="lg"
          as={"h2"}
        >
          Login
        </Text>
        <form
          className="flex flex-col "
          onSubmit={handleSubmit(handleLoginSubmit)}
        >
          <Input
            name="username"
            type="text"
            placeholder="Enter your username"
            className="font-xl"
            label="Username:"
            register={register}
            errors={errors}
            required={"Please enter your username"}
          />
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            className="font-xl pt-4"
            label="Password:"
            register={register}
            errors={errors}
            required={"Please enter your password"}
          />
          <Button className="mt-[2rem]">Login</Button>
        </form>
        <div className="pt-[3rem] ">
          <Text className="text-gray-800">
            Go To &ensp;
            <span
              className="text-white-A700 px-9 py-[0.4rem] bg-gray-800 cursor-pointer text-[1rem] "
              onClick={navigateHome}
            >
              Home
            </span>
          </Text>
        </div>
        <CustomToastContainer />
      </section>
    </>
  );
};

export default Login;
