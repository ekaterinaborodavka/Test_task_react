import { ON_SEARCH_CHANGE,
  GET_PRODUCT,
  DELETE_CARD,
  ADD_CART,
  CREATE_CARD,
  ADD_CURRENT_CARD_PAGE,
  CHANGE_EDIT,
  EDIT_CARD,
  CHANGE_PAGE,
  EDIT_ID,
  GET_CART,
  REMOVE_CART,
  CHANGE_IN_CART,
  CHANGE_IN_CART_FALSE,
  UPDATE_QUANTITY,
  CHANGE_CURRENT_PAGE} from '../types/types';
import { get,
  deleteItem, updateCard,
  createCard as createCardService,
  addCardBasket} from '../../Services/service';
import { toggleCart,
  createNewCard,
  addNewCart,
  getTotal } from '../../Utils/cardUtils';

export const onSearchChange = (substring) => {
  return {
    type: ON_SEARCH_CHANGE,
    substring,
  };
};

export const changeEdit = (bool) => {
  return {
    type: CHANGE_EDIT,
    bool,
  };
};

export const editId = (id) => {
  return {
    type: EDIT_ID,
    id,
  };
};

export const changePage = (num) => {
  return {
    type: CHANGE_PAGE,
    num,
  };
};

export const changeCurrentPage = (currentPage) => {
  return {
    type: CHANGE_CURRENT_PAGE,
    currentPage,
  };
};

export const getProduct = (url) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: GET_PRODUCT,
      subtype: 'loading',
    });
    get(url).then((res) => {
      dispatch({
        type: GET_PRODUCT,
        subtype: 'success',
        list: res,
        total: getTotal(state.card.basketList),
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

export const addCurrentCardPage = (url) => {
  return async (dispatch, getState) => {
    dispatch({
      type: ADD_CURRENT_CARD_PAGE,
      subtype: 'loading',
    });
    get(url).then((res) => {
      dispatch({
        type: ADD_CURRENT_CARD_PAGE,
        subtype: 'success',
        list: res,
      });
    }, (error) => {
      dispatch({
        type: ADD_CURRENT_CARD_PAGE,
        subtype: 'failed',
        error: error.message,
      });
    });
  };
};

export const getCart = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_CART,
      subtype: 'loading',
    });
    get('http://localhost:3000/cart').then((res) => {
      dispatch({
        type: GET_CART,
        subtype: 'success',
        list: res,
        total: getTotal(res),
      });
    }, (error) => {
      dispatch({
        type: GET_CART,
        subtype: 'failed',
        error: error.message,
      });
    });
  };
};

export const deleteCard = (id) => {
  return async (dispatch, getState) =>{
    const state = getState();
    const currentPage = state.card.currentPage;
    const cadrOnPage = state.card.cardOnPage;
    dispatch({
      type: DELETE_CARD,
      subtype: 'loading',
    });
    deleteItem(id, 'products').then(()=> {
      const newList = state.card.cardList.filter((e) => e.id !== id);
      const newCurrentList = dispatch(addCurrentCardPage(
          `http://localhost:3000/products?_page=${
            currentPage}&_limit=${cadrOnPage}`));
      dispatch({
        type: DELETE_CARD,
        subtype: 'success',
        currentList: newCurrentList,
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
};

export const removeCart = (id) => {
  return async (dispatch, getState) =>{
    const state = getState();
    dispatch({
      type: REMOVE_CART,
      subtype: 'loading',
    });
    deleteItem(id, 'cart').then(()=> {
      const newList = state.card.basketList.filter((e) => e.id !== id);
      dispatch({
        type: REMOVE_CART,
        subtype: 'success',
        list: newList,
        total: getTotal(newList),
      });
    }, (error) => {
      dispatch({
        type: REMOVE_CART,
        subtype: 'failed',
        error: error.message,
      });
    });
  };
};

export const changeInCart = (id, bool) => {
  return async (dispatch, getState) =>{
    const state = getState();
    const newList = toggleCart(id, state.card.cardList, bool);
    const index = newList.findIndex((item) => item.id === id);
    const editItem = newList[index];

    dispatch({
      type: CHANGE_IN_CART,
      subtype: 'loading',
    });
    updateCard(id, editItem, 'products').then(()=> {
      dispatch({
        type: CHANGE_IN_CART,
        subtype: 'success',
        list: newList,
      });
    }, (error) => {
      dispatch({
        type: CHANGE_IN_CART,
        subtype: 'failed',
        error: error.message,
      });
    });
  };
};

export const changeInCartFalse = (id) => {
  return async (dispatch, getState) =>{
    const state = getState();
    const basketItem = state.card.basketList.filter((e) => e.id === id);
    const cardItem = state.card.cardList.filter((e) => {
      return (
        e.title === basketItem[0].title && e.price === basketItem[0].price
      );
    });
    const newList = toggleCart(cardItem[0].id, state.card.cardList, false);
    const index = newList.findIndex((item) => item.id === cardItem[0].id);
    const editItem = newList[index];
    dispatch({
      type: CHANGE_IN_CART_FALSE,
      subtype: 'loading',
    });
    updateCard(cardItem[0].id, editItem, 'products').then(()=> {
      dispatch({
        type: CHANGE_IN_CART_FALSE,
        subtype: 'success',
        list: newList,
      });
    }, (error) => {
      dispatch({
        type: CHANGE_IN_CART_FALSE,
        subtype: 'failed',
        error: error.message,
      });
    });
  };
};

export const addCart = (id, bool) => {
  return async (dispatch, getState) =>{
    const state = getState();
    const cardList = state.card.cardList;
    const ind = cardList.findIndex((item) => item.id === id);
    const editItem = cardList[ind];
    dispatch({
      type: ADD_CART,
      subtype: 'loading',
    });
    const newCart = addNewCart(editItem);
    addCardBasket(newCart).then((res)=> {
      const newList = [...state.card.basketList, res.data];
      dispatch({
        type: ADD_CART,
        subtype: 'success',
        basketList: newList,
        total: getTotal(newList),
      });
    }, (error) => {
      dispatch({
        type: ADD_CART,
        subtype: 'failed',
        error: error.message,
      });
    });
  };
};

export const createCard = (card) => async (dispatch, getState) =>{
  const state = getState();
  const currentPage = state.card.currentPage;
  const cadrOnPage = state.card.cardOnPage;
  dispatch({
    type: CREATE_CARD,
    subtype: 'loading',
  });
  const newCard = createNewCard(card);
  createCardService(newCard).then((res) => {
    const newItem = {
      ...res.data,
      price: Number(res.data.price),
    };
    const newList = [...state.card.cardList, newItem];
    const newCurrentList = dispatch(addCurrentCardPage(
        `http://localhost:3000/products?_page=${
          currentPage}&_limit=${cadrOnPage}`));
    dispatch({
      type: CREATE_CARD,
      subtype: 'success',
      currentList: newCurrentList,
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

export const editCard = (id, editItem) => {
  return async (dispatch, getState) =>{
    const state = getState();
    const currentPage = state.card.currentPage;
    const cadrOnPage = state.card.cardOnPage;
    const list = state.card.cardList;
    const editId = state.card.editId;
    const editCard = list.filter((e) => e.id === editId);
    Object.keys(editItem).forEach((key) => (editItem[key] === '') &&
    delete editItem[key]);
    const changeEl = {
      ...editCard[0],
      ...editItem,
    };
    dispatch({
      type: EDIT_CARD,
      subtype: 'loading',
    });
    updateCard(id, changeEl, 'products').then((res)=> {
      const ind = list.findIndex((item) => item.id === id);
      const editCardList = [...list];
      const editCard = editCardList[ind];
      editCardList[ind] = {...editCard, ...res.data};
      const newCurrentList = dispatch(addCurrentCardPage(
          `http://localhost:3000/products?_page=${
            currentPage}&_limit=${cadrOnPage}`));
      dispatch({
        type: EDIT_CARD,
        subtype: 'success',
        list: editCardList,
        currentList: newCurrentList,
        total: getTotal(state.card.basketList),
      });
    }, (error) => {
      dispatch({
        type: EDIT_CARD,
        subtype: 'failed',
        error: error.message,
      });
    });
  };
};

export const updateQuantity = (id, type) => {
  return async (dispatch, getState) =>{
    const state = getState();
    const list = state.card.basketList;
    const ind = list.findIndex((item) => item.id === id);
    const editItem = list[ind];
  type === 'inc' ? editItem.quantity++ : editItem.quantity--;
  dispatch({
    type: UPDATE_QUANTITY,
    subtype: 'loading',
  });
  updateCard(id, editItem, 'cart').then((res)=> {
    const ind = list.findIndex((item) => item.id === id);
    const editCartList = [...list];
    const editCart = editCartList[ind];
    editCartList[ind] = {...editCart, ...res.data};
    dispatch({
      type: UPDATE_QUANTITY,
      subtype: 'success',
      list: editCartList,
      total: getTotal(editCartList),
    });
  }, (error) => {
    dispatch({
      type: UPDATE_QUANTITY,
      subtype: 'failed',
      error: error.message,
    });
  });
  };
};
