import React from 'react';
import classNames from 'classnames';

import Icon from '../Icon/Icon';

import { useOutsideClick } from 'src/hooks';

import styles from './select.module.scss';

interface ISelect {
  isActive: boolean;

  setIsActive(value: boolean): void;

  selected: { key: string, value: string };

  setIsSelected: React.Dispatch<React.SetStateAction<{ key: string, value: string }>> | (({ key, value }: {
    key: string,
    value: string
  }) => void);

  optionGroup: { key: string, value: string }[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const Select: React.FC<ISelect> = (
  {
    selected,
    isActive,
    setIsSelected,
    setIsActive,
    optionGroup,
    placeholder = 'Select...',
    className,
    disabled,
  }) => {

  const dropDownContentClass = classNames(styles['dropdown-content'], isActive && styles['dropdown-content-height']);
  const dropDownClass = classNames(styles['dropdown'], className);
  const dropDownTitleClass = classNames(!!disabled && styles['dropdown-disabled'], styles['dropdown-btn'], !selected.key && styles['dropdown-title']);

  const selectRef = useOutsideClick(() => {
    setIsActive(false);
  });

  return (
    <div className={dropDownClass} ref={selectRef}>
      <div
        onClick={(e) => {
          if (!disabled) setIsActive(!isActive);
        }}
        className={dropDownTitleClass}
      >
        {selected.key || placeholder}
        <span
          className={!isActive ? styles.rotateUp : styles.rotateDown}
        ><Icon name="arrowDown" width={15} height={15} /></span>
      </div>
      <div
        className={dropDownContentClass}
        style={{ height: isActive ? `${optionGroup.length < 10 ? optionGroup.length * 45 : 300}px` : '' }}
      >
        {
          optionGroup.map((item, index) => {
            return (
              <div
                key={index}
                className={styles['item']}
                onClick={(e) => {
                  setIsSelected(item);
                  setIsActive(false);
                }}
              >
                {item.key}
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Select;