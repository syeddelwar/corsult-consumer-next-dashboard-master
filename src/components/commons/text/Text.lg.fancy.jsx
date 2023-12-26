import React from "react";

const TextLgFancy = ({ classes, text, color }) => {
  return (
    <div className="bg-white border-b-[.3rem] border-purple-500 p-1 mb-2 shadow-xl">
      <h1
        className={`text-sm md:text-lg ${color || "text-black"} ${
          classes || ""
        }`}
      >
        {text}
      </h1>
    </div>
  );
};

export default TextLgFancy;
