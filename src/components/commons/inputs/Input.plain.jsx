import React, { useState } from "react";
import { IconPlain, TextError, TextMd } from "../index";

const InputPlain = ({
  id,
  type,
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
  postFixText,
  reference,
  noIcon = true,
  maxLength,
}) => {
  // States
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  let iconClass;
  if (!noIcon) {
    if (type === "date") {
      iconClass = "fa-calendar";
    } else if (type === "email") {
      iconClass = "fa-envelope";
    } else if (type === "number") {
      iconClass = "fa-arrow-down-1-9";
    } else if (type === "password") {
      iconClass = "fa-lock";
    } else if (name === "search") {
      iconClass = "fa-search";
    } else {
      iconClass = "fa-pencil";
    }
  }

  const checkType =
    type === "password" ? (isPasswordVisible ? "text" : "password") : type;

  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-semibold text-gray-900"
        >
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex w-full items-center relative">
        {!noIcon && (
          <IconPlain
            iconClass={`${iconClass} rounded-l-lg`}
            wrapperSize="h-12"
            bgColor="bg-[#523178]"
            iconColor="text-white"
          />
        )}
        <input
          ref={reference}
          type={checkType}
          name={name}
          onBlur={onBlur}
          id={id}
          disabled={isDisabled}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border border-gray-300 focus:ring-0 focus:border-purple-500 outline-0 transition-all duration-300 h-12 rounded-lg p-3 w-full disabled:bg-gray-100"
        />
        {type === "password" && (
          <div className="absolute right-1">
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <IconPlain
                iconClass={!isPasswordVisible ? "fa-eye" : "fa-eye-slash"}
                bgColor="bg-inherit"
                iconColor="text-[#523178]"
              />
            </button>
          </div>
        )}
        {postFixText && (
          <TextMd text={postFixText} classes="ml-2 font-semibold" />
        )}
      </div>
      {error && (
        <div className="mt-1">
          <TextError text={errorText} />
        </div>
      )}
    </>
  );
};

export default InputPlain;
