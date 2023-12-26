import React from "react";
import { TextError } from "../index";

const InputRadio = ({
  id,
  name,
  placeholder,
  onChange,
  label,
  error,
  errorText,
  value,
  isRequired,
  isChecked = false,
}) => {
  return (
    <div className="flex items-center gap-0.5 my-1">
      <input
        type="radio"
        name={name}
        id={id.toLowerCase().split(" ").join("_")}
        value={value}
        checked={isChecked}
        onChange={onChange}
        placeholder={placeholder}
        className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 focus:ring-0"
      />
      {label && (
        <label
          htmlFor={id.toLowerCase().split(" ").join("_")}
          className={`transition-all duration-500 block text-sm font-semibold rounded p-1.5`}
        >
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      {error && (
        <div className="mt-1">
          <TextError text={errorText} />
        </div>
      )}
    </div>
  );
};
export default InputRadio;
