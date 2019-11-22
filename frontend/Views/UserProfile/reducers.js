import {
  FETCH_USER_PROFILE_START,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
} from './constants';

const initialState = {
  fetchingProfile: true,
  profile: {},
  error: null,
};

export const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PROFILE_START:
      return {...state,
        fetchingProfile: true,
        error: null,
      };

    case FETCH_USER_PROFILE_SUCCESS:
      return {...state,
        fetchingProfile: false,
        profile: action.payload,
        error: null,
      };

    case FETCH_USER_PROFILE_FAILURE:
      return {...state,
        fetchingProfile: false,
        error: 'Unable to fetch user profile. Please check out for correct username.',
      };

    default:
      return state;
  }
};
