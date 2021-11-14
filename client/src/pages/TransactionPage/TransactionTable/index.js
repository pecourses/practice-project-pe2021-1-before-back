import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const TransactionTable = props => {
  const { transactions } = props;

  return (
    <table>
      <caption> Transaction Table</caption>
      <thead>
        <tr>
          <th>Date</th>
          <th>Operation type </th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(({ id, createdAt, operationType, amount }) => (
          <tr key={id}>
            <td>{format(new Date(createdAt), 'yyyy-MM-dd')}</td>
            <td>{operationType}</td>
            <td>{amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      date: PropTypes.string,
      operationType: PropTypes.string,
      amount: PropTypes.number,
    }).isRequired
  ),
};

export default TransactionTable;
