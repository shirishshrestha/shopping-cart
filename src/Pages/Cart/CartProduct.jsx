import React from "react";
import { Img, Text } from "../../components/Components";

const CartProduct = ({ product }) => {
  return (
    <section className="flex">
      <figure>
        <Img className="h-32 w-32" src={product.thumbnail} />
      </figure>
      <div>
        <Text size="md" as="h4" className="capitalize text-gray-800">
          {product.title}
        </Text>
        <Text size="s" as="p" className="capitalize text-gray-800">
          {product.description}
        </Text>
      </div>
    </section>
  );
};

export default CartProduct;
