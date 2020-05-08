import React from 'react';
import styles from './SimpleTableElement.module.scss';

const SimpleTableElement = ({ country }) => {
  return (
    <tr>
      <td>{country.name}</td>
      <td>{country.totalConfirmed}</td>
      <td>{country.totalRecovered}</td>
      <td>{country.totalDeaths}</td>
      <td>{country.newConfirmed}</td>
      <td>{country.newDeaths}</td>
    </tr>
  );
};

export default SimpleTableElement;
