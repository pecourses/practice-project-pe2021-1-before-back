import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './TransactionPage.module.sass';
import TransactionTable from './TransactionTable';
import * as transactionActionCreators from './../../actions/actionCreator';

function TransactionPage () {
  const { transactions, isFetching, error } = useSelector(
    ({ transaction }) => transaction
  );

  const dispatch = useDispatch();
  const { getTransactionsAction: getTransactions } = bindActionCreators(
    transactionActionCreators,
    dispatch
  );

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <Header />
      <section className={styles.transactionTableContainer}>
        {isFetching ? (
          <div>Loading. Please, wait...</div>
        ) : (
          <TransactionTable transactions={transactions} />
        )}
        {error && <div>ERROR</div>}
      </section>
      <Footer />
    </>
  );
}

export default TransactionPage;
