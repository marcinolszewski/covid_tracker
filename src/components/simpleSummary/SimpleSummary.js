import React from 'react';
import styles from './SimpleSummary.module.scss';

const SimpleSummary = ({ label, number }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>{label}</p>
      <p className={styles.number}>{number}</p>
    </div>
  );
};

export default SimpleSummary;
