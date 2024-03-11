import React from "react";
import { Button, Img, Text } from "../../components/Components";
import { useMutation } from "@tanstack/react-query";
import { deleteCartItem } from "../../Utils/apiSlice/CartApiSlice";
import { queryClient } from "../../Utils/Query/Query";

const CartProduct = ({ product }) => {
  const DeleteCartItem = useMutation({
    mutationFn: (productId) => deleteCartItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries("CartData");
    },
  });
  const handleCartItemDelete = (productId) => {
    DeleteCartItem.mutate(productId);
  };

  return (
    <section className="flex gap-[1rem] items-center bg-gray-50 mb:flex-col mb:items-start mb:w-full mb:py-[2rem]">
      <figure className="mb:flex mb:justify-center mb:w-full">
        <Img
          className="h-auto w-32 object-cover mb:w-48"
          src={product.productData.thumbnail}
        />
      </figure>
      <div className="flex flex-col gap-[0.2rem] mb:items-center">
        <Text size="md" as="h4" className="capitalize text-gray-800">
          {product.productData.title}
        </Text>
        <Text
          size="xs"
          as="p"
          className="capitalize w-[33.3rem] text-gray-800 ds:w-[20rem] mb:w-full mb:text-center"
        >
          {product.productData.description}
        </Text>
        <Text size="xs" as="p">
          {product.productData.brand}
        </Text>
        <Text size="xs" as="p" className="text-gray-800">
          ${product.productData.price}
        </Text>
      </div>
      <div className="mb:w-full mb:flex mb:justify-center ">
        <Button
          size="md"
          className="text-xl"
          onClick={() => handleCartItemDelete(product.id)}
        >
          Delete
        </Button>
      </div>
    </section>
  );
};

export default CartProduct;
