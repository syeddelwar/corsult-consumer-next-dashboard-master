import React from "react";
import { TextLg } from "..";

const TextFancy = ({ text }) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="bg-gray-200 h-0.5 w-full"></div>
      <TextLg text={text} classes="font-bold" />
      <div className="bg-gray-200 h-0.5 w-full"></div>
    </div>
  );
};

export default TextFancy;
