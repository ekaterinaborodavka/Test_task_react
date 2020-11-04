import {v4 as uuidv4} from 'uuid';

export const createNewCard = (card) => {
  return {
    ...card,
    id: uuidv4(),
    inCart: false
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