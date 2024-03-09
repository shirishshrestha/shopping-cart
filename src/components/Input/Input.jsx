import { ErrorMessage } from "@hookform/error-message";
import { Text } from "../Components";

const shapes = {
  square: "rounded-[0px]",
};
const variants = {
  fill: {
    white_A700: "bg-white-A700",
    gray_800: "text-gray-800 ",
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

const Input = ({
  className = "",
  name = "",
  placeholder = "",
  type = "text",
  children,
  label = "",
  onChange,
  shape = "square",
  variant = "outline",
  size = "sm",
  color = "gray_800",
  required,
  register,
  errors,
  suffix,
  ...restProps
}) => {
  return (
    <>
      <div
        className={`${className} flex flex-col  justify-center ${
          shapes[shape] || ""
        } ${variants[variant]?.[color] || variants[variant] || ""} ${
          sizes[size] || ""
        }`}
      >
        <div>
          {!!label && <label className="text-gray-700">{label} &nbsp; </label>}
          <input
            type={type}
            name={name}
            {...register(name, { required: required })}
            placeholder={placeholder}
            {...restProps}
          />
        </div>

        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) =>
            message && (
              <Text className="text-red-500  !text-[14px] " key={type}>
                {message}
              </Text>
            )
          }
        />
      </div>
    </>
  );
};
export { Input };
