import React from "react";
import { IconPlain, TextMd } from "../index";

const ButtonIconned = ({
  width,
  height,
  padding,
  text,
  color,
  onClick,
  classes,
  icon,
  iconColor,
  iconPosition = "left",
  isRounded,
  textColor,
  justify,
}) => {
  return (
    <button
      onClick={onClick || null}
      className={`${width || "w-28"} ${height || "h-12"} ${
        padding || "p-3 pr-5"
      } ${color || `bg-purple-500`} ${classes || ""} ${
        isRounded ? "rounded-full" : "rounded-md"
      } shadow-md flex mx-auto items-center ${
        justify || "justify-center"
      } gap-4`}
    >
      {iconPosition === "left" && icon && (
        <IconPlain
          iconClass={icon}
          size="text-md"
          iconColor={iconColor || ""}
        />
      )}
      <TextMd
        text={text}
        color={textColor || "text-white"}
        classes={`min-w-[11rem] text-left`}
      />
      {iconPosition === "right" && icon && (
        <IconPlain
          iconClass={icon}
          size="text-sm"
          iconColor={iconColor || ""}
        />
      )}
    </button>
  );
};

export default ButtonIconned;
