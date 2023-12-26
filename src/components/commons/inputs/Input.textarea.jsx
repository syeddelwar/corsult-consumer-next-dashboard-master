import React from "react";
import { TextError } from "../index";

const InputTextArea = ({
  id,
  name,
  placeholder,
  onChange,
  label,
  error,
  errorText,
  value,
  onBlur,
  isRequired,
  isDisabled,
}) => {
  return (
    <>
      {label && (
        <label
          htmlFor={id.toLowerCase().split(" ").join("_")}
          className="block mb-2 text-sm font-semibold text-gray-900"
        >
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        name={name}
        onBlur={onBlur}
        id={id.toLowerCase().split(" ").join("_")}
        onChange={onChange}
        placeholder={placeholder}
        disabled={isDisabled}
        className="border border-gray-300 focus:ring-0 focus:border-gray-300 outline-0 bg-white rounded-lg p-3 w-full disabled:bg-gray-100"
        value={value}
      />

      {error && (
        <div className="mt-1">
          <TextError text={errorText} />
        </div>
      )}
    </>
  );
};

export default InputTextArea;
