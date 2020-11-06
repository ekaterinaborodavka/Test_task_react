import React, { useCallback, useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import * as cardActions from '../Store/actions/cardActions';
import './Pagination.css';

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardOnPage] = useState(10);
  const cardList = useSelector((state) => state.card.cardList, shallowEqual);
  const dispatch = useDispatch();

  const indexOfLast = currentPage * cardOnPage;
  const indexOfFirst = indexOfLast - cardOnPage;
  const currentCards = cardList.slice(indexOfFirst, indexOfLast);

  const changePagesPagin = useCallback(
      ( e ) => {
        setCurrentPage(Number(e.target.id));
        dispatch(cardActions.addCurrentCarPage(currentCards));
      }, [dispatch, currentCards],
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
