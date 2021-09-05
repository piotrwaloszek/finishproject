import { API_URL } from '../config';
import Axios from 'axios';

/* selectors */
export const getCartData = ({ cart }) => cart;

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_TO_CART = createActionName('ADD_TO_CART');
const CHANGE_QUANTITY = createActionName('CHANGE_QUANTITY');
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');
const CHANGE_DESCRIPTION = createActionName('CHANGE_DESCRIPTION');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addToCart = payload => ({ payload, type: ADD_TO_CART });
export const changeQuantity = payload => ({ payload, type: CHANGE_QUANTITY });
export const removeFromCart = payload => ({ payload, type: REMOVE_FROM_CART });
export const changeDescription = payload => ({ payload, type: CHANGE_DESCRIPTION });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });

/* thunk creators */
export const fetchCart = (data) => {
  return (dispatch, getState) => {
    if (getState().cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(data));
    } if (getState().cart.length === 0) {
      const cartProductsLocalStorage = JSON.parse(localStorage.getItem('cart'));
      if (cartProductsLocalStorage !== null) {
        dispatch(fetchSuccess(cartProductsLocalStorage))
      }
    }
  };
};


/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case CHANGE_QUANTITY: {
      return [...statePart.map(data => {
        if (data.id === action.payload.id) {
          data.quantity = action.payload.quantity;
          return data;
        } else {
          return data;
        }
      })]
    }
    case CHANGE_DESCRIPTION: {
      return [...statePart.map(data => {
        if (data.id === action.payload.id) {
          data.description = action.payload.description;
          return data;
        } else {
          return data;
        }
      })]
    }
    case ADD_TO_CART: {
      if (statePart.length > 0) {
        let x = false;

        statePart.map(data => {
          if (data.color === action.payload.color && data.name === action.payload.name) {
            x = true;
            data.quantity += action.payload.quantity;
            return data;
          }
        })
        return x ? statePart : [...statePart, action.payload];
      } else {
        return [action.payload]
      }
    }
    case REMOVE_FROM_CART: {
      return [...statePart.filter(data => data.id !== action.payload)]
    }
    case FETCH_SUCCESS: {
      return action.payload
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