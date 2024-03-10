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
    <section className="flex gap-[1rem] items-center bg-gray-50">
      <figure>
        <Img
          className="h-32 w-32 object-cover"
          src={product.productData.thumbnail}
        />
      </figure>
      <div className="flex flex-col gap-[0.2rem]">
        <Text size="md" as="h4" className="capitalize text-gray-800">
          {product.productData.title}
        </Text>
        <Text size="xs" as="p" className="capitalize w-[33.3rem] text-gray-800">
          {product.productData.description}
        </Text>
        <Text size="xs" as="p">
          {product.productData.brand}
        </Text>
        <Text size="xs" as="p" className="text-gray-800">
          ${product.productData.price}
        </Text>
      </div>
      <div>
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
