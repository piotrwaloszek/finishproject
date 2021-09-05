/* selectors */
export const getModal = ({ modal }) => modal;

/* action name creator */
const reducerName = 'modal';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD_MODAL = createActionName('ADD_MODAL');
const REMOVE_MODAL = createActionName('REMOVE_MODAL');

/* action creators */
export const addModal = payload => ({ payload, type: ADD_MODAL });
export const removeModal = payload => ({ payload, type: REMOVE_MODAL });

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case ADD_MODAL: {
      return true
    }
    case REMOVE_MODAL: {
      return false
    }
    default:
      return statePart;
  }
};