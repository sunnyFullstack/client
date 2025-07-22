import React from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "danger" | "success" | "neutral";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  icon,
  className,
  ...props
}) => {
  const baseClasses =
    "px-4 py-2 rounded-lg text-white font-medium focus:outline-none transition";

  const variantClasses: Record<Variant, string> = {
    primary: "bg-[#6A5ACD] hover:bg-[#7B68EE]",
    secondary: "bg-[#C0C0C0] hover:bg-[#A9A9A9]",
    danger: "bg-[#FF6347] hover:bg-[#FF4500]",
    success: "bg-[#32CD32] hover:bg-[#98FB98]",
    neutral: "bg-[#DAA520] hover:bg-[#B8860B]",
  };

  return (
    <button
      className={clsx(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
