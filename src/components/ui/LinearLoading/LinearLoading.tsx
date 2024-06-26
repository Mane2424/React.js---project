import React from 'react';

import styles from './linearLoading.module.scss';

interface LinearLoadingProps {
  loading: boolean;
}

const CustomLinearLoading: React.FC<LinearLoadingProps> = ({ loading }) => {
  return (
    <div className={styles.height}>
      {loading && <div className={styles.linearLoadingContainer}>
        <div className={styles.linearLoadingBar} />
      </div>}
    </div>
  );
};

export default CustomLinearLoading;