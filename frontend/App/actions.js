import {
  START_FETCHING_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILURE,
  START_FETCHING_CRYPTOCURRENCY,
  FETCHING_CRYPTOCURRENCY_SUCCESS,
  FETCHING_CRYPTOCURRENCY_FAILURE,
  UPDATE_USER_CRYPTOCURRENCY,
  UPDATE_USER_CRYPTOCURRENCY_SUCCESS,
  UPDATE_USER_CRYPTOCURRENCY_FAILURE,
} from './constants';

import {
  fetchUser,
  fetchLatestCryptocurrency,
  userAddCryptocurrency,
  userRemoveCryptocurrency,
} from './api';


export const getUser = () => {
  return (dispatch, getState) => {
    dispatch({ type: START_FETCHING_USER });

    fetchUser().then(
      data => {
        if (!data.data._id) dispatch({ type: FETCHING_USER_FAILURE });
        else dispatch({ type: FETCHING_USER_SUCCESS, payload: data.data });
      },
      error => dispatch({ type: FETCHING_USER_FAILURE })
    );
  };
};

export const getLatestCryptocurrency = () => {
  return (dispatch, getState) => {
    dispatch({ type: START_FETCHING_CRYPTOCURRENCY });

    fetchLatestCryptocurrency().then(
      data => dispatch({ type: FETCHING_CRYPTOCURRENCY_SUCCESS, payload: data.data }),
      error => dispatch({ type: FETCHING_CRYPTOCURRENCY_FAILURE })
    );
  };
};


export const addCryptocurrencyToUser = (username) => {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_USER_CRYPTOCURRENCY });

    userAddCryptocurrency(username).then(
      data => dispatch({ type: UPDATE_USER_CRYPTOCURRENCY_SUCCESS, payload: data.data }),
      error => dispatch({ type: UPDATE_USER_CRYPTOCURRENCY_FAILURE})
    );
  };
};

export const removeCryptocurrencyFromUser = (username) => {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_USER_CRYPTOCURRENCY });

    userRemoveCryptocurrency(username).then(
      data => dispatch({ type: UPDATE_USER_CRYPTOCURRENCY_SUCCESS, payload: data.data }),
      error => dispatch({ type: UPDATE_USER_CRYPTOCURRENCY_FAILURE})
    );
  };
};

