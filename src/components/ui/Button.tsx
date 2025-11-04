import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "success" | "danger";
}

export default function Button({
  children,
  onClick,
  disabled,
  variant = "primary",
}: ButtonProps) {
  const baseStyle =
    "w-full py-2 rounded-lg text-sm font-medium transition disabled:bg-gray-300 disabled:cursor-not-allowed";

  const variantStyle = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyle[variant]}`}
    >
      {children}
    </button>
  );
}
