import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PricesList.module.sass';

function PricesListItem (props) {
  const {
    priceItem: {
      colorName,
      description,
      price: { amount, currency },
      options,
    },
    color,
  } = props;
  return (
    <li className={styles.pricesListItem}>
      <div className={styles.header} style={{ borderColor: color }}>
        <h3 style={{ color: color }}>{colorName}</h3>
        <p>{description}</p>
        <div style={{ color: color }}>
          {currency} {amount}
        </div>
      </div>
      <ul className={styles.optionsList}>
        {options.map((o, i) => (
          <li data-tooltip='tooltip)))' key={i}>
            {o}
          </li>
        ))}
      </ul>
      <Link
        to='#'
        style={{ backgroundColor: color }}
        className={styles.startLink}
      >
        <i className='fas fa-check' /> Start
      </Link>
    </li>
  );
}

export default PricesListItem;
