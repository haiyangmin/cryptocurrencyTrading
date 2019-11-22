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
  fetchingCryptocurrencies: true,
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
    console.log(action.payload.cryptocurrencies);
      //  return {
      //     cryptocurrencies: action.payload.cryptocurrencies,
      //     fetchingCryptocurrencies: false,
      //     error: false,
      //   };

      return Object.assign({}, state, {
        cryptocurrencies: action.payload.cryptocurrencies,
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
  fetchingUser: false,
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
      return {...state,
        fetchingUser: true,
        authenticated: false,
      };

    case FETCHING_USER_SUCCESS:
      return {...state,fetchingUser: false,
        authenticated: true,
        error: null,
        _id: action.payload._id,
        name: action.payload.name,
        username: action.payload.username,
        avatarUrl: action.payload.avatarUrl,
        email: action.payload.email,
        githubBio: action.payload.github.bio,
        githubUrl: action.payload.github.url,
        githubLocation: action.payload.github.location,
        role: action.payload.role,
        userCryptocurrencies: action.payload.cryptocurrencies,
        updatingUserCryptocurrecy: false,
      };

    case FETCHING_USER_FAILURE:
      return {...state,
        fetchingUser: false,
        authenticated: false,
        error: 'Unable to fetch user!',
      };

    case UPDATE_USER_CRYPTOCURRENCY:
      return {...state,
        updatingUserCryptocurrecy: true,
      };

    case UPDATE_USER_CRYPTOCURRENCY_SUCCESS:
      return {...state,
        userCryptocurrencies: action.payload,
        updatingUserCryptocurrecy: false,
      };

    case UPDATE_USER_CRYPTOCURRENCY_FAILURE:
      return {...state,
        updatingUserCryptocurrecy: false,
        error: 'Unable to update user cryptocurrency!',
      };

    default:
      return state;
  }
};
