import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  shadow?: "sm" | "md" | "lg" | "xl";
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
  shadow = "md",
  hover = false,
}) => {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const shadowClasses = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  return (
    <div
      className={`
        bg-white rounded-xl border border-gray-200
        ${paddingClasses[padding]}
        ${shadowClasses[shadow]}
        ${
          hover
            ? "hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
