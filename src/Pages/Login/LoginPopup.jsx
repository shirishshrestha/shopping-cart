import { useForm } from "react-hook-form";
import { Button, Input, Text } from "../../components/Components";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../Utils/apiSlice/ProductsApiSlice";
import { setTokenToLocalStorage } from "../../Utils/StorageUtils/StorageUtils";
import { useNavigate } from "react-router";
import { useShoppingContext } from "../../Utils/Context/ShoppingContext";
import { CrossSvg } from "../../assets/SVG/SvgImages";
import { notifyError, notifySuccess } from "../../components/Toast/Toast";

/**
 * LoginPopup component for handling user login in a popup.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.setLoginPopup - Function to set the login popup state.
 * @param {Function} props.handleLoginPopupClose - Function to close the login popup.
 * @param {Function} props.addToCart - Function to add an item to the cart.
 * @param {Object} props.cartItem - The item to be added to the cart.
 * @returns {JSX.Element} - The JSX element representing the login popup.
 */
const LoginPopup = ({
  setLoginPopup,
  handleLoginPopupClose,
  addToCart,
  cartItem,
}) => {
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
      setLoginPopup(false);
      navigate("/");
      notifySuccess("Logged in successfully");
      addToCart(cartItem, true);
    },
    onError: () => {
      notifyError("Incorrect Username/Password");
    },
  });

  /**
   * Handles the submission of the login form.
   *
   * @param {Object} loginData - The user login data.
   */
  const handleLoginSubmit = (loginData) => {
    LoginMutation.mutate(loginData);
  };

  return (
    <section className="login w-full ">
      <div className="flex justify-between w-full">
        <Text className="pb-4 text-gray-800 font-semibold " size="lg" as={"h2"}>
          Login
        </Text>
        <span className="cursor-pointer" onClick={handleLoginPopupClose}>
          <CrossSvg />
        </span>
      </div>
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
    </section>
  );
};

export default LoginPopup;
