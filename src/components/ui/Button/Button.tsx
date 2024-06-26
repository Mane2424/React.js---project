import React from 'react';

import classNames from 'classnames';

import Icon from "../Icon/Icon";

import styles from './button.module.scss';
import { ISvgIcons } from "../../../assets/icons/svg";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'contained' | 'outlined' | 'text';
    iconName?: keyof ISvgIcons;
    iconRight?: boolean;
}

const Button: React.FC<IButton> = (
    {
        className,
        children,
        size = 'sm',
        variant = 'contained',
        iconName,
        iconRight,
        ...props
    }) => {

    const buttonClass = classNames(styles.button, className, styles[`button_${size}`], styles[`button_${variant}`], iconRight && styles.flexReversed);

    return <button className={buttonClass} {...props}>
        {!!iconName && <Icon name={iconName} />}
        {children}
    </button>;
};

export default Button;