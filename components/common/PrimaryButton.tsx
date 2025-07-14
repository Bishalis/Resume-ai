import React from "react";
import clsx from "clsx";

type ButtonProps ={
    children : React.ReactNode;
    onClick? : () => void;
    type? : 'button' | 'submit' | 'reset';
    className?: string; 
}



export default function PrimaryButton({
    children,
    onClick,
    type = 'button',
    className = '',
  }: ButtonProps) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={clsx(
          'bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200 ease-in-out',
          className // allow overrides or additions
        )}
      >
        {children}
      </button>
    );
  }