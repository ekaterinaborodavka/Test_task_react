import { UPDATE_FORM } from '../types/types';

const initialState = {
  title: '',
  price: '',
  description: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
