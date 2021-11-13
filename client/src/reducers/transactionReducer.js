import ACTION from '../actions/actionTypes';

const initialState = {
  transactions: [],
  isFetching: false,
  error: null,
};

const transactionReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case ACTION.GET_TRANSACTIONS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        transactions: [],
        error: null,
      };
    }

    case ACTION.GET_TRANSACTIONS_SUCCESS: {
      const { data: transactions } = action;
      return {
        ...state,
        isFetching: false,
        transactions,
      };
    }
    case ACTION.GET_TRANSACTIONS_ERROR: {
      const { error } = action.data;
      return {
        ...state,
        isFetching: false,
        error,
      };
    }
    default:
      return state;
  }
};

export default transactionReducer;
