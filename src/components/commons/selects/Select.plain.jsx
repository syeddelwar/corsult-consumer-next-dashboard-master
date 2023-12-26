import React from "react";
import { TextError } from "../index";

const SelectPlain = ({
  id,
  name,
  placeholder,
  onChange,
  label,
  error,
  errorText,
  value,
  onBlur,
  options,
  isRequired,
  isDisabled,
  padding,
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        name={name}
        onBlur={onBlur}
        id={id}
        disabled={isDisabled}
        value={value}
        onChange={onChange}
        className={`border border-gray-300 focus:ring-0 focus:border-purple-500  outline-0 transition-all duration-300 bg-white rounded-lg ${
          padding || "p-3"
        } w-full disabled:bg-gray-100`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => {
          return (
            <option key={option.value || option} value={option.value || option}>
              {option.text || option}
            </option>
          );
        })}
      </select>
      {error && (
        <div className="mt-1">
          <TextError text={errorText} />
        </div>
      )}
    </div>
  );
};

export default SelectPlain;
