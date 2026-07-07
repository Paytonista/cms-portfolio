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
        py-2 flex items-center gap-3 group text-sm
        transition-all duration-300
        ${isActive ? "scale-110 font-semibold" : "scale-100"}
      `}
    >
      <span className={`
        h-0.5 bg-current transition-all
        ${isActive ? "w-12" : "w-8 group-hover:w-15"}
      `}></span>
      {children}
    </button>
  );
};

export default PortfolioButton;