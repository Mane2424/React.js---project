import React from "react";

import styles from "./toggle.module.scss";

interface IToggle {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  leftValue?: string;
  rightValue?: string;
}

const Toggle: React.FC<IToggle> = (
  {
    isChecked,
    setIsChecked,
    leftValue,
    rightValue,
  },
) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{leftValue}</span>
      <label className={styles.customToggle}>
        <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.currentTarget.checked)} />
        <span className={styles.slider} />
      </label>
      <span className={styles.label}>{rightValue}</span>
    </div>
  );
};

export default Toggle;