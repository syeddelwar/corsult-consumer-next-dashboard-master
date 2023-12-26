import React, { useState } from "react";
import { IconPlain, TextLg, TextXl } from "..";

const SectionCollapse = ({ children, title, isLast }) => {
  // States
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <section
      className={`relative before:content-[''] before:inline-block before:w-[18px] before:h-[18px] before:rounded-full ${
        isCollapsed ? "before:bg-red-500 mb-10" : "before:bg-purple-500"
      } before:border-white before:border-4 before:shadow-md before:-ml-2 before:absolute before:top-1.5 before:z-[1]`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        type="button"
        className="collapse-btn z-[1] w-72 md:w-96 font-bold mx-4 flex items-center px-4 py-2 justify-between bg-purple-800"
      >
        <TextLg text={title} classes="text-left" color="text-white" />
        <IconPlain
          iconClass={`fa-${
            isCollapsed ? "plus" : "minus"
          } rounded-full border-4 border-white`}
          iconColor="text-white"
          bgColor="bg-purple-800"
        />
      </button>
      {isCollapsed && !isLast && (
        <div
          className={`border-0 border-l-2 border-dashed border-purple-500 px-3 transition-all duration-500 py-12 absolute top-4`}
        ></div>
      )}
      {!isCollapsed && (
        <div
          className={`border-0 border-l-2 border-dashed border-purple-500 px-3 transition-all duration-500 -mt-10 pt-16 pb-3`}
        >
          {children}
        </div>
      )}
    </section>
  );
};

export default SectionCollapse;
