import { API_URL } from '../config';
import Axios from 'axios';

/* selectors */
export const getAll = ({ products }) => products.data;
export const getOneProduct = ({ products }) => products.oneProduct;
export const getLoading = ({ products }) => products.loading;

/* action name creator */
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_SUCCEED = createActionName('FETCH_SUCCEED');
const FETCH_ONE_PRODUCT_SUCCEED = createActionName('FETCH_ONE_PRODUCT_SUCCEED');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchSucceed = payload => ({ payload, type: FETCH_SUCCEED });
export const fetchOneProductSucceed = payload => ({ payload, type: FETCH_ONE_PRODUCT_SUCCEED });

/* thunk creators */
export const fetchProducts = () => {
  return (dispatch, getState) => {
    if (getState().products.data.length === 0) {
      dispatch(fetchStarted());

      Axios
        .get(`${API_URL}/products`)
        .then(res => {
          dispatch(fetchSucceed(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }
  };
};

export const fetchOneProduct = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios
      .get(`${API_URL}/products/${id}`)
      .then(res => {
        dispatch(fetchOneProductSucceed(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });

  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_SUCCEED: {
      return {
        data: [...action.payload],
        oneProduct: {},
        loading: {
          active: false,
          error: false,
        },
      };
    }
    case FETCH_ONE_PRODUCT_SUCCEED: {
      return {
        data: [...statePart.data],
        oneProduct: action.payload,
        loading: {
          active: false,
          error: false,
        },
      };
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
    default:
      return statePart;
  }
};