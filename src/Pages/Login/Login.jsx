import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Text } from "../../components/Components";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../Utils/apiSlice/ProductsApiSlice";
import {
  setTokenToLocalStorage,
} from "../../Utils/StorageUtils/StorageUtils";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const LoginMutation = useMutation({
    mutationFn: (loginData) => {
      return loginUser(loginData.username, loginData.password);
    },
    onSuccess: (data) => {
      setTokenToLocalStorage(data.token);
    },
  });

  const handleLoginSubmit = (loginData) => {
    LoginMutation.mutate(loginData);
  };

  return (
    <section className="login flex flex-col justify-center items-center w-full h-[100vh]">
      <Text className="pb-12 text-gray-800 " size="lg" as={"h2"}>
        Login
      </Text>
      <form
        className="flex flex-col gap-[2rem]"
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
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          className="font-xl"
          label="Password:"
          register={register}
          errors={errors}
        />
        <Button>Login</Button>
      </form>
    </section>
  );
};

export default Login;
