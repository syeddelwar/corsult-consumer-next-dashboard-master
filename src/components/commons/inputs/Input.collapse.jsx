import React, { useState } from "react";
import { IconPlain, InputCheckbox, InputRadio, TextMd } from "..";

const InputCollapse = ({
  heading,
  radios,
  type,
  checkboxes,
  onChange,
  namePrefix,
  radioName,
  radioValue,
  checkBoxesValue,
}) => {
  // States
  const [isOpened, setIsOpened] = useState(true);

  return (
    <div>
      <div
        onClick={() => setIsOpened(!isOpened)}
        className="flex gap-3 items-center shadow cursor-pointer justify-between border border-gray-300 rounded-lg p-2"
      >
        <TextMd text={heading} classes="font-medium" />
        <IconPlain
          iconClass={`fa-chevron-down transition-all duration-500 ${
            isOpened ? "-rotate-120" : "rotate-180"
          }`}
          bgColor="bg-white"
          iconColor="text-black"
        />
      </div>
      {isOpened && (
        <div className="grid grid-cols-12 gap-1 mt-2 border border-gray-200 rounded-lg p-2">
          {type === "radios" &&
            radios.map((radio, index) => {
              return (
                <div key={index} className="col-span-12">
                  <InputRadio
                    key={`${radioName}_${radio}`}
                    id={`${radioName}_${radio}`}
                    value={radio}
                    name={radioName}
                    label={radio}
                    isChecked={radio === radioValue}
                    onChange={onChange}
                  />
                </div>
              );
            })}
          {type === "checkboxes" &&
            checkboxes.map((checkBox, index) => {
              return (
                <div key={index} className="col-span-12">
                  <InputCheckbox
                    key={`${namePrefix}_${checkBox}`}
                    id={`${namePrefix}_${checkBox}`}
                    value={checkBox}
                    name={`${namePrefix}_${checkBox}`}
                    onChange={onChange}
                    label={checkBox}
                    isChecked={
                      checkBoxesValue
                        ? checkBoxesValue[
                            `${namePrefix}_${checkBox
                              .toLowerCase()
                              .split(" ")
                              .join("_")}`
                          ]
                        : true
                    }
                  />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default InputCollapse;
