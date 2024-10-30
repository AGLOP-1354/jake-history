import React from "react";

import classes from './button.module.css';

type Props = {
  type?: 'primary' | 'secondary' | 'default';
  children: React.ReactNode;
}

const getClassNameByType = (type: string) => {
  switch (type) {
    case 'primary':
      return classes.primary;
    case 'secondary':
      return classes.secondary;
    case 'default':
      return classes.default;
    // no default
  }
}

const Button = ({
  type = 'primary',
  children,
}: Props) => {
  const classNameByType = getClassNameByType(type);

  return (
    <button className={`${classes.Button} ${classNameByType}`}>
      {children}
    </button>
  )
}

export default Button;
