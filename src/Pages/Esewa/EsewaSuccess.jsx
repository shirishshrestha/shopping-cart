import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Img, Text } from "../../components/Components";
import { SuccessTick } from "../../assets/SVG/SvgImages";
import { useMutation } from "@tanstack/react-query";
import { deleteAllProducts } from "../../Utils/apiSlice/CartApiSlice";
import { useShoppingContext } from "../../Utils/Context/ShoppingContext";

const EsewaSuccess = () => {
  const location = useLocation();
  const [refId, setRefId] = useState();
  const [amount, setAmount] = useState();
  const [orderIdE, setOrderIdE] = useState();

  const navigate = useNavigate();

  const DeleteAllProducts = useMutation({
    mutationFn: () => deleteAllProducts(),
    onSuccess: () => {
      navigate("/");
    },
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get("oid");
    const amount = searchParams.get("amt");
    const refId = searchParams.get("refId");
    setOrderIdE(orderId);
    setRefId(refId);
    setAmount(amount);
  }, [location.search]);

  const onClickHome = () => {
    DeleteAllProducts.mutate();
  };

  return (
    <section className="login flex flex-col justify-center items-center w-full h-[100vh]">
      <SuccessTick />
      <Text as={"h4"} size="md" className="text-gray-800 mt-[16px]">
        Payment Successful
      </Text>
      <Text size="xs" className="text-gray-800 mt-[8px] text-center">
        Your payment is complete.
        <br /> Details of transaction are included below.
      </Text>
      <div>
        <Text size="xs" className="text-gray-800 mt-[8px] text-center">
          Reference Number <span className="text-[#527DD0]">#{refId}</span>
        </Text>
        <div className="p-[1rem] border-solid rounded-sm  border-[#E9EAEC] border-[1px] flex flex-col gap-[1rem] mt-[16px]">
          <div className="flex justify-between gap-[120px]">
            <Text size="xs">TOTAL AMOUNT PAID</Text>
            <Text size="xs" className="text-gray-800">
              {amount}
            </Text>
          </div>
          <div className="flex justify-between gap-7">
            <Text size="xs">PAID FROM</Text>
            <Text size="xs" className="text-gray-800">
              ESEWA
            </Text>
          </div>
          <div className="flex justify-between gap-7">
            <Text size="xs" className="uppercase">
              Order Id
            </Text>
            <Text size="xs" className="text-gray-800">
              {orderIdE}
            </Text>
          </div>
        </div>
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
  );
};

export default EsewaSuccess;
