import React, { useCallback } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import * as cardActions from '../Store/actions/cardActions';
import './Pagination.css';

export default function Pagination() {
  const cardList = useSelector((state) => state.card.cardList, shallowEqual);
  const cardOnPage = useSelector((state) => state.card.cardOnPage,
      shallowEqual);
  const dispatch = useDispatch();

  const changePagesPagin = useCallback(
      ( e ) => {
        dispatch(cardActions.changePage(Number(e.target.id)));
        dispatch(cardActions.addCurrentCardPage(
            `http://localhost:3000/products?_page=${
              e.target.id}&_limit=${cardOnPage}`,
        ));
      }, [dispatch, cardOnPage],
  );

  const pagesNumb = [];
  for (let i=1; i <= Math.ceil(cardList.length/cardOnPage); i++) {
    pagesNumb.push(i);
  }
  return (
    <ul className='pagination'>
      { Array.isArray(pagesNumb) && pagesNumb.map((num) => {
        return (
          <li className='pagination_item'
            key={ num }
            id={ num }
            onClick={ changePagesPagin }>
            { num }
          </li>
        );
      }) }
    </ul>
  );
}
