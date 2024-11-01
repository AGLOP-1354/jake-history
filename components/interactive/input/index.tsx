"use client";

import { ChangeEvent } from "react";

import classes from "./input.module.css";

type Props = {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  prefix?: string;
  placeholder?: string;
};

const Input = ({ value, onChange, placeholder, prefix }: Props) => {
  return (
    <div className={classes.inputContainer}>
      {!!prefix && <span className={classes.prefix}>{prefix}</span>}
      <input value={value} onChange={onChange} placeholder={placeholder} className={classes.Input} />
    </div>
  );
};

export default Input;
