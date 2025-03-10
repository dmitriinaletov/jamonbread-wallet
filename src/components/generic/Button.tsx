import { ButtonProps } from "../../types/types";

export const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  className = "",
  children,
}) => {
  return (
    <button
      className={`cursor-pointer transition-opacity m-2 ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "text-gray-600 hover:text-gray-800"
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
