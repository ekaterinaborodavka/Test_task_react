import {v4 as uuidv4} from 'uuid';

export const filterCard = (cardList, substring) => {
  if (substring.length === 0) {
    return cardList;
  }
  return cardList.filter((card) => {
    return card.title.toLowerCase().indexOf(substring.toLowerCase()) > -1;
  });
};

export const toggleCart = (id, cardList) => {
  return cardList.map((item) => {
    if (item.id === id) {
      return {...item, inCart: !item.inCart};
    }
    return item;
  });
};