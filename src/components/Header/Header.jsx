import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { Button } from "../Components";
import {
  clearTokenFromLocalStorage,
  getTokenFromLocalStorage,
} from "../../Utils/StorageUtils/StorageUtils";
import { CartSvg, LogoutSvg } from "../../assets/SVG/SvgImages";
import useLogout from "../../Utils/CustomHook/useLogout";
import { useShoppingContext } from "../../Utils/Context/ShoppingContext";
import { notifySuccess } from "../Toast/Toast";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Product", to: "/products" },
  { name: "Categories", to: "#" },
  { name: "Collection", to: "#" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useLogout();

  const { isLoggedIn, setIsLoggedIn } = useShoppingContext();

  const handleLogout = () => {
    setMobileMenuOpen(false);
    notifySuccess("Logged out successfully");
    clearTokenFromLocalStorage();
    logout();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleCart = () => {};

  return (
    <>
      <header className="relative inset-x-0 top-0 ">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link
              to="/"
              className="-m-1.5 p-1.5 flex gap-[1rem] items-center justify-center "
            >
              <img className="h-8 w-auto" src="/images/helmet.svg" alt="" />
              <span className="text-gray-800 font-bold text-2xl font-poppins">
                IntuCart
              </span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[text-color]"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden  lg:flex lg:flex-1 lg:justify-end">
            {isLoggedIn ? (
              <Button
                size="md"
                className="font-bold min-w-[107px]"
                onClick={handleLogout}
              >
                <LogoutSvg /> &ensp; Log out
              </Button>
            ) : (
              <Button
                size="md"
                className="font-bold  min-w-[107px]"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
            )}
          </div>
        </nav>
        <div className="w-fit mr-[4rem] absolute right-[9rem] top-[1.5rem] lp:right-[1rem] lp:top-[1rem]">
          <Link to="/cart">
            <Button
              onClick={handleCart}
              size="md"
              className="!p-0 bg-transparent !text-gray-800"
            >
              <CartSvg />
            </Button>
          </Link>
        </div>
        <Dialog
          as="div"
          className="lg:hidden "
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50 " />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white-A700 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="-m-1.5 p-1.5 flex gap-[1rem] items-center justify-center "
              >
                <figure className=" object-contain w-auto">
                  <img className="h-5" src="/images/helmet.svg" alt="" />
                </figure>
                <span className="text-gray-800 font-bold text-1xl font-poppins">
                  IntuCart
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  {isLoggedIn ? (
                    <Button
                      size="md"
                      className="font-bold min-w-[107px]"
                      onClick={handleLogout}
                    >
                      <LogoutSvg /> &ensp; Log out
                    </Button>
                  ) : (
                    <Button
                      size="md"
                      className="font-bold min-w-[107px]"
                      onClick={() => navigate("/login")}
                    >
                      Log in
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
};

export { Header };
