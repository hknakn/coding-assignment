import React from "react";

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  testId?: string;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className = "",
  testId,
  children,
  disabled = false,
  type = "button",
}) => (
  <button
    type={type}
    className={`btn ${className}`}
    data-testid={testId}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default React.memo(Button);
