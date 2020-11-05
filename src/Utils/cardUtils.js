import {v4 as uuidv4} from 'uuid';

export const createNewCard = (card) => {
  return {
    ...card,
    id: uuidv4(),
    inCart: false
  }
}

export const addNewCart = (card) => {
  delete card.inCart
  return {
    ...card,
    id: uuidv4(),
    quantity: 1,
  }
}

export const filterCard = (cardList, substring) => {
  if (substring.length === 0) {
    return cardList;
  }
  return cardList.filter((card) => {
    return card.title.toLowerCase().indexOf(substring.toLowerCase()) > -1;
  });
};

export const toggleCart = (id, cardList, bool) => {
  return cardList.map((item) => {
    if (item.id === id) {
      return {...item, inCart: bool};
    }
    return item;
  });
};

export const getTotal = (carts) => {
  const newCarts = carts.map((e) => {
    return {
      ...e,
      price: e.price*e.quantity
    }
  })
  return newCarts.reduce((acc, item) => {
    return acc + parseFloat(item.price);
  }, 0);
};