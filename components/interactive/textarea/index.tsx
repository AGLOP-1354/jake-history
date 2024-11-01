"use client";

import { useState, ChangeEvent } from "react";
import classNames from "classnames";

import classes from "./textarea.module.css";

type Props = {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  noResize?: boolean;
  width?: number | string;
  height?: number | string;
  maxLength?: number;
  showLength?: boolean;
};

const Textarea = ({ value, onChange, placeholder, noResize, width, height, showLength, maxLength }: Props) => {
  const [_value, _setValue] = useState(value);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (maxLength && e.target.value.length > maxLength) return;
    if (typeof onChange === "function") onChange(e);

    _setValue(e.target.value);
  };

  return (
    <div className={classes.TextareaContainer}>
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        style={{ ...(height ? { height } : {}), ...(width ? { width } : {}) }}
        className={classNames(classes.Textarea, { [classes.noResize]: noResize })}
        maxLength={maxLength} // 수정된 부분
      />

      {showLength && (
        <span className={classes.LengthIndicator}>
          {value?.length || _value?.length || 0} / {maxLength}
        </span>
      )}
    </div>
  );
};

export default Textarea;
