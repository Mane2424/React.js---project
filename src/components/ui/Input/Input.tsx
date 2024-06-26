import React from "react";
import classNames from "classnames";

import Icon from "../Icon/Icon";

import { ISvgIcons } from "src/assets/icons/svg";

import styles from "./input.module.scss";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  iconName?: keyof ISvgIcons;
  iconColor?: string;
  label?: string;
}

const Input: React.FC<IInput> = (
  {
    className,
    iconName,
    iconColor,
    label,
    ...props
  }) => {
  const inputClass = classNames(styles.input, className);
  return <div className={styles.wrapper}>
    {!!label && <span>{label}</span>}
    <div className={styles.iconWrapper}>
      {!!iconName && <Icon name={iconName} color={iconColor} />}
      <input
        className={inputClass}
        {...props}
      />
    </div>
  </div>
};

export default Input;