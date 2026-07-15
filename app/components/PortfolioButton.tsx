import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isActive?: boolean;
  onclick?: () => void;
}

const PortfolioButton = ({
  variant,
  isActive = false,
  children,
  onclick,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`
        relative py-2 flex items-center gap-3 group text-sm
        transition-all duration-300
        ${isActive ? "scale-110 font-semibold" : "scale-100"}
      `}
    >
      {/* desktop indicator (left of text) */}
      <span className={`
        hidden lg:block h-0.5 bg-current transition-all
        ${isActive ? "w-12" : "w-8 group-hover:w-15"}
      `}></span>

      {children}

      {/* mobile indicator (bottom underline) */}
      <span className={`
        absolute left-0 -bottom-0.5 h-0.5 bg-current transition-all lg:hidden
        ${isActive ? "w-full" : "w-0 group-hover:w-full"}
      `}></span>
    </button>
  );
};

export default PortfolioButton;