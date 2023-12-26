import React from "react";
import { TextError } from "../index";

const InputCheckbox = ({
  id,
  name,
  placeholder,
  onChange,
  label,
  error,
  errorText,
  isDisabled,
  value,
  isRequired,
  isChecked = false,
}) => {
  return (
    <div className="my-1 flex items-center gap-1">
      <input
        type="checkbox"
        name={name.toLowerCase().split(" ").join("_")}
        id={id.toLowerCase().split(" ").join("_")}
        value={value}
        disabled={isDisabled}
        checked={isChecked}
        onChange={onChange}
        placeholder={placeholder}
        className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
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

export default InputCheckbox;
