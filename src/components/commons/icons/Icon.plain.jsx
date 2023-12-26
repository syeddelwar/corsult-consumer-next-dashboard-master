import React from "react";

const IconPlain = ({
  iconClass,
  iconColor,
  bgColor,
  size,
  isRounded,
  wrapperSize,
}) => {
  const className = `fa ${iconClass} ${iconColor || "text-white"} ${
    bgColor || "bg-purple-500"
  } ${size || "text-md"} ${
    wrapperSize ? wrapperSize : "w-7 h-7"
  } flex items-center justify-center p-4 ${isRounded ? "rounded-full" : ""}`;

  return <i className={className}></i>;
};

export default IconPlain;
