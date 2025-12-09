import React from "react";

interface IProps {
  children: string;
  type: "submit";
}

const Button: React.FC<IProps> = ({ children, type }) => {
  return (
    <button
      type={type}
      className="bg-green-700 rounded px-2 py-1 text-white font-semibold text-center w-full hover:bg-green-800 transition-all duration-300 cursor-pointer"
    >
      {children}
    </button>
  );
};

export default Button;
