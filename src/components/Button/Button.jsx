import React from "react";

const shapes = {
  square: "rounded-[0px]",
};

const variants = {
  outline: {
    gray_800: "border-gray-800 border border-solid text-gray-800",
    gray_500: "border-gray-500 border-2 border-solid text-gray-500",
  },
  fill: {
    white_A700: "bg-white-A700 text-gray-800",
    gray_800: "bg-gray-800 text-white-A700",
  },
};

const sizes = {
  "6xl": "h-16 px-[35px] text-lg",
  "4xl": "h-[60px] px-2.5",
  xl: "h-[53px] px-[34px] text-sm",
  "2xl": "h-14 px-2.5 text-2xl",
  "3xl": "h-[60px] px-[33px] text-2xl",
  md: "h-12 px-[34px] text-sm",
  xs: "h-6 px-[5px]",
  sm: "h-12 px-4",
  "7xl": "h-[103px] px-[33px] text-lg",
  "5xl": "h-[60px] px-7 text-lg",
  lg: "h-[50px] px-[22px] text-lg",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "square",
  variant = "fill",
  size = "lg",
  color = "gray_800",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex items-center justify-center text-center cursor-pointer ${
        (shape && shapes[shape]) || ""
      } ${(size && sizes[size]) || ""} ${
        (variant && variants[variant]?.[color]) || ""
      }`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

export { Button };
