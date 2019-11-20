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

const initialState = {
  fetchingCryptocurrencies: false,
  cryptocurrencies: {},
  appError: false,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING_CRYPTOCURRENCY:
      return Object.assign({}, state, {
        fetchingCryptocurrencies: true,
      });

    case FETCHING_CRYPTOCURRENCY_SUCCESS:
      return Object.assign({}, state, {
        cryptocurrencies: action.payload,
        fetchingCryptocurrencies: false,
        error: false,
      });

    case FETCHING_CRYPTOCURRENCY_FAILURE:
      return Object.assign({}, state, {
        fetchingCryptocurrencies: false,
        error: 'Unable to fetch cryptocurrency',
      });

    default:
      return state;
  }
};


const initialUserState = {
  fetchingUser: true,
  authenticated: false,
  error: null,
  _id: null,
  name: null,
  email: null,
  username: null,
  avatarUrl: null,
  githubUrl: null,
  githubLocation: null,
  githubBio: null,
  role: null,
  userCryptocurrencies: [],
  updatingUserCryptocurrecy: false,
};

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case START_FETCHING_USER:
      return Object.assign({}, state, {
        fetchUser: true,
      });

    case FETCHING_USER_SUCCESS:
      const {
        _id,
        name,
        username,
        avatarUrl,
        email,
        githubBio,
        githubUrl,
        githubLocation,
        role,
        userCryptocurrencies,
      } = action.payload;

      return Object.assign({}, state), {
        fetchingUser: false,
        authenticated: true,
        error: null,
        _id,
        name,
        username,
        avatarUrl,
        email,
        githubBio,
        githubUrl,
        githubLocation,
        userCryptocurrencies,
        role,
      };

    case FETCHING_USER_FAILURE:
      return Object.assign({}, initialUserState, {
        fetchingUser: false,
        error: 'Unable to fetch user!',
      });

    case UPDATE_USER_CRYPTOCURRENCY:
      return Object.assign({}, state, {
        updatingUserCryptocurrecy: true,
      });

    case UPDATE_USER_CRYPTOCURRENCY_SUCCESS:
      return Object.assign({}, state, {
        userCryptocurrencies: action.payload,
        updatingUserCryptocurrecy: false,
      });

    case UPDATE_USER_CRYPTOCURRENCY_FAILURE:
      return Object.assign({}, state, {
        updatingUserCryptocurrecy: false,
        error: 'Unable to update user cryptocurrency!',
      });

    default:
      return state;
  }
};
