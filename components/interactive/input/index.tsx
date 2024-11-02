"use client";

import React, { ChangeEvent } from "react";

import classes from "./input.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  prefix?: string | React.ReactNode;
  placeholder?: string;
};

const Input = ({ value, onChange, placeholder, prefix, ...acc }: Props) => {
  return (
    <div className={classes.inputContainer}>
      {!!prefix && <span className={classes.prefix}>{prefix}</span>}
      <input value={value} onChange={onChange} placeholder={placeholder} className={classes.Input} {...acc} />
    </div>
  );
};

export default Input;
