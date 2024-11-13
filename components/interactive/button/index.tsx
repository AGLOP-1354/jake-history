import React from "react";

import classes from "./button.module.css";

type Props = {
  type?: "primary" | "secondary" | "text" | "default";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  style?: {
    [styleName: string]: any;
  };
  className?: string;
  children: React.ReactNode;
};

const getClassNameByType = (type: string) => {
  switch (type) {
    case "primary":
      return classes.primary;
    case "secondary":
      return classes.secondary;
    case "text":
      return classes.text;
    case "default":
      return classes.default;
    // no default
  }
};

const getClassNameBySize = (size: string) => {
  switch (size) {
    case "small":
      return classes.small;
    case "medium":
      return classes.medium;
    case "large":
      return classes.large;
  }
};

const Button = ({ type = "primary", onClick, size = "medium", style, className, children }: Props) => {
  const classNameByType = getClassNameByType(type);
  const classNameBySize = getClassNameBySize(size);

  return (
    <button
      style={{ ...(style ? style : {}) }}
      className={`${classes.Button} ${classNameByType} ${classNameBySize} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
