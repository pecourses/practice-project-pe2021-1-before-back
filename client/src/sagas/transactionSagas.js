import { put } from 'redux-saga/effects';
import {
  getTransactionsError,
  getTransactionsRequest,
  getTransactionsSuccess,
} from '../actions/actionCreator';
import * as restController from '../api/rest/restController';

export function * getTransactionSaga () {
  yield put(getTransactionsRequest());
  try {
    const { data: transactions } = yield restController.getTransactions();
    console.log(`transactions`, transactions);
    yield put(getTransactionsSuccess(transactions));
  } catch (err) {
    console.log(`err`, err.response);
    yield put(getTransactionsError(err.response));
  }
}
