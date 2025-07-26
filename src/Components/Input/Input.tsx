import React from "react";

type InputProps = {
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label?: string;
  error?: string;
  className?: string;
  parentClassName?: string;
  placeholder?: string;
  isDisable?: boolean;
  key?: any;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  onBlur,
  type = "text",
  name = "password",
  label,
  error,
  className,
  placeholder,
  isDisable,
  key,
}) => {
  console.log(error, "error", name);
  return (
    <>
      {label ? (
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {label}
          </label>
          <input
            disabled={isDisable}
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required
            className={` border border-gray-300 disabled:text-grey rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
          />
          {error && <p className="text-red text-xs">{error}</p>}
        </div>
      ) : (
        <>
          <input
            key={key}
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required
            className={` border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
          />
          {error && <p className="text-red text-xs">{error}</p>}
        </>
      )}
    </>
  );
};

export default Input;
