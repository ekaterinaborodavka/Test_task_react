import { ON_SEARCH_CHANGE,
        GET_PRODUCT,
        DELETE_CARD,
        ADD_CART,
        CREATE_CARD } from '../types/types';
import { getProducts as getProductsList,
        deleteItem, updateCard, 
        createCard as createCardService} from '../../Services/service'
import { toggleCart, createNewCard } from '../../Utils/cardUtils'

export const onSearchChange = (substring) => {
    return {
      type: ON_SEARCH_CHANGE,
      substring,
    };
  };

  export const getProduct = () => {
    return async (dispatch, getState) => {
      dispatch({
        type: GET_PRODUCT,
        subtype: 'loading',
      });
      getProductsList().then((res) => {
        dispatch({
          type: GET_PRODUCT,
          subtype: 'success',
          list: res,
        });
      }, (error) => {
        dispatch({
          type: GET_PRODUCT,
          subtype: 'failed',
          error: error.message,
        });
      });
    };
  };

  export const deleteCard = (id) => {
    return async (dispatch, getState) =>{
    const state = getState();
    dispatch({
      type: DELETE_CARD,
      subtype: 'loading',
    });
    deleteItem(id).then(()=> {
      const newList = state.card.cardList.filter((e) => e.id !== id);
      dispatch({
        type: DELETE_CARD,
        subtype: 'success',
        list: newList,
      });
    }, (error) => {
      dispatch({
        type: DELETE_CARD,
        subtype: 'failed',
        error: error.message,
      });
    });
  };
}

export const addCart = (id, bool) => {
  return async (dispatch, getState) =>{
  const state = getState();
  const newList = toggleCart(id, state.card.cardList, bool)
  const index = newList.findIndex((item) => item.id === id);
  const editItem = newList[index]
  const newBasketList = newList.filter((e) => e.inCart);
  console.log(newBasketList);
  dispatch({
    type: ADD_CART,
    subtype: 'loading',
  });
  updateCard(id, editItem).then(()=> {
    dispatch({
      type: ADD_CART,
      subtype: 'success',
      list: newList,
      basketList: newBasketList,
    });
  }, (error) => {
    dispatch({
      type: ADD_CART,
      subtype: 'failed',
      error: error.message,
    });
  });
};
}

export const createCard = (card) => async (dispatch, getState) =>{
  const state = getState();
  dispatch({
    type: CREATE_CARD,
    subtype: 'loading',
  });
  const newCard = createNewCard(card)
  createCardService(newCard).then((res) => {
    console.log('ressssss',res.data);
    const newList = [...state.card.cardList, res.data];
    dispatch({
      type: CREATE_CARD,
      subtype: 'success',
      list: newList,
    });
  }, (error) => {
    dispatch({
      type: CREATE_CARD,
      subtype: 'failed',
      error: error.message,
    });
  });
};