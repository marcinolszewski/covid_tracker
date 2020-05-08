import React from 'react';
import SimpleTableElement from '../simpleTableElement/SimpleTableElement.js';
import styles from './SimpleTableContainer.module.scss';

const SimpleTableContainer = ({ countries }) => {
  return (
    <table className={styles.wrapper}>
      <thead>
        <tr>
          <td>Country Name</td>
          <td>Total confirmed cases</td>
          <td>Total recovered</td>
          <td>Total deaths</td>
          <td>New confirmed cases</td>
          <td>New deaths</td>
        </tr>
      </thead>
      <tbody>
        {countries.map((el, idx) => {
          return <SimpleTableElement key={idx} country={el} />;
        })}
      </tbody>
    </table>
  );
};

export default SimpleTableContainer;
