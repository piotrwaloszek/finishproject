import { USER_URL } from '../config';
import Axios from 'axios';

export const getUser = ({user}) => user.data;

const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_START = createActionName('FETCH_START');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const fetchUser = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios.get(`${USER_URL}/logged`)
      .then(res => {
        dispatch(fetchSuccess(res.data))
      })
      .catch(err => {
        dispatch(fetchError(err.message || true))
      })
  }
}

export const reducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    case FETCH_SUCCESS: {
      return {
        data: action.payload,
        loading: {
          active: false,
          error: false,
        },
      }
    }
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    default: return statePart
  }
}