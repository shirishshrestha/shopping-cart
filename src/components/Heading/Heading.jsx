const sizes = {
  s: "text-4xl font-bold",
  md: "text-[64px] font-bold",
  xs: "text-2xl font-bold",
};

const Heading = ({
  children,
  className = "",
  size = "xs",
  as,
  ...restProps
}) => {
  const Component = as || "h6";

  return (
    <Component
      className={`text-gray-800 font-poppins ${className} ${sizes[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Heading };
