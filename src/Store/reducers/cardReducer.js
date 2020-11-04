import { ON_SEARCH_CHANGE, GET_PRODUCT, DELETE_CARD, ADD_CART } from '../types/types';

export const initialState = {
    cardList: [],
    basketList: [],
    substring: '',
    loading: false,
    error: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ON_SEARCH_CHANGE: {
        return {
          ...state,
          substring: action.substring
        }
      }
      case GET_PRODUCT:
        case DELETE_CARD:
          case ADD_CART: {
        return {
          ...state,
          cardList: action.subtype === 'success' ? action.list : state.cardList,
          loading: action.subtype === 'loading',
          error: action.subtype === 'failed' ? action.error : null,
        }
      }
      case ADD_CART: {
        return {
          ...state,
          cardList: action.subtype === 'success' ? action.list : state.cardList,
          loading: action.subtype === 'loading',
          error: action.subtype === 'failed' ? action.error : null,
          basketList: action.subtype === 'success' ? action.basketList : state.basketList,
        }
      }
      default:
        return state;
    }
  };
  
  export default reducer;