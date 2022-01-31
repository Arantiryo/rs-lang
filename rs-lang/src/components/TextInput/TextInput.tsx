import React from "react";

export default function TextInput({
  className = "",
  disabled = false,
  placeholder = "",
  ...props
}) {
  return (
    <input
      disabled={disabled}
      type="text"
      className={`input input_type_text ${className} 
        shadow appearance-none border border-gray-400 rounded w-full mb-2 py-2 px-3 bg-gray-800 text-gray-400 leading-6 focus:outline-none focus:shadow-outline`}
      placeholder={placeholder}
      {...props}
    />
  );
}
