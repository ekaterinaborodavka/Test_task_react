
import { ON_SEARCH_CHANGE,
  GET_PRODUCT,
  DELETE_CARD,
  ADD_CART,
  CREATE_CARD,
  ADD_CURRENT_CARD_PAGE,
  CHANGE_EDIT,
  EDIT_CARD,
  EDIT_ID,
  GET_CART,
  REMOVE_CART,
  CHANGE_IN_CART,
  CHANGE_IN_CART_FALSE,
  UPDATE_QUANTITY,
  CHANGE_CURRENT_PAGE} from '../types/types';

export const initialState = {
  cardList: [],
  basketList: [],
  currentCard: [],
  substring: '',
  loading: false,
  error: null,
  edit: false,
  editId: '',
  total: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_SEARCH_CHANGE: {
      return {
        ...state,
        substring: action.substring,
      };
    }
    case CHANGE_EDIT: {
      return {
        ...state,
        edit: action.bool,
      };
    }
    case CHANGE_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case EDIT_ID: {
      return {
        ...state,
        editId: action.id,
      };
    }
    case GET_CART:
    case REMOVE_CART:
    case UPDATE_QUANTITY: {
      return {
        ...state,
        basketList: action.subtype === 'success' ? action.list :
          state.basketList,
        total: action.subtype === 'success' ? action.total : state.total,
        loading: action.subtype === 'loading',
        error: action.subtype === 'failed' ? action.error : null,
      };
    }
    case GET_PRODUCT:
    case DELETE_CARD:
    case CREATE_CARD:
    case EDIT_CARD: {
      return {
        ...state,
        cardList: action.subtype === 'success' ? action.list : state.cardList,
        total: action.subtype === 'success' ? action.total : state.total,
        loading: action.subtype === 'loading',
        error: action.subtype === 'failed' ? action.error : null,
      };
    }
    case CHANGE_IN_CART_FALSE:
    case CHANGE_IN_CART: {
      return {
        ...state,
        cardList: action.subtype === 'success' ? action.list : state.cardList,
        loading: action.subtype === 'loading',
        error: action.subtype === 'failed' ? action.error : null,
      };
    }
    case ADD_CART: {
      return {
        ...state,
        loading: action.subtype === 'loading',
        error: action.subtype === 'failed' ? action.error : null,
        basketList: action.subtype === 'success' ? action.basketList :
          state.basketList,
        total: action.subtype === 'success' ? action.total : state.total,
      };
    }
    case ADD_CURRENT_CARD_PAGE: {
      return {
        ...state,
        currentCard: action.currentList,
      };
    }
    default:
      return state;
  }
};

export default reducer;
