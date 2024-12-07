import React, { useState } from "react";

const InputPassword = ({ name, label, placeholder, value, onChange, className, disabled, classDiv}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`mb-4 w-full ${classDiv}`}>
      <label htmlFor="input" className={`block mt-5 text-base font-semibold ${className}`}>
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm w-full">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          className="block w-full rounded-md border-0 py-2 pl-3 pr-5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-red f sm:text-sm sm:leading-6"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 mr-4"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <img src="/admin/hide-pass.svg" alt="Hide Password" className="h-7 w-7" />
          ) : (
            <img src="/admin/show-pass.svg" alt="Show Password" className="h-7 w-7" />
          )}
        </button>
      </div>
    </div>
  );
};

export default InputPassword;