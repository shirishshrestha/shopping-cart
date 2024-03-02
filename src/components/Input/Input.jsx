const shapes = {
  square: "rounded-[0px]",
};
const variants = {
  fill: {
    white_A700: "bg-white-A700",
    gray_800: "bg-gray-800 text-blue_gray-100_87",
  },
  outline: {
    blue_gray_100: "border-blue_gray-100 border border-solid text-gray-500_87",
  },
};
const sizes = {
  xs: "h-12 pl-8 text-lg",
  md: "h-[60px] pl-6",
  sm: "h-[60px] pl-6 pr-4 text-lg",
};

const Input = (
  {
    className = "",
    name = "",
    placeholder = "",
    type = "text",
    children,
    label = "",
    prefix,
    suffix,
    onChange,
    shape = "square",
    variant = "outline",
    size = "sm",
    color = "blue_gray_100",
    ...restProps
  },
  ref
) => {
  const handleChange = (e) => {
    if (onChange) onChange(e?.target?.value);
  };

  return (
    <>
      <div
        className={`${className} flex items-center justify-center ${
          shapes[shape] || ""
        } ${variants[variant]?.[color] || variants[variant] || ""} ${
          sizes[size] || ""
        }`}
      >
        {!!label && label}
        {!!prefix && prefix}
        <input
          type={type}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          {...restProps}
        />
        {!!suffix && suffix}
      </div>
    </>
  );
};
export { Input };
