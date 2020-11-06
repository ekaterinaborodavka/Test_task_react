import React, { useEffect, useCallback } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import CardListItem from '../CardListItem/CardListItem';
import Loader from '../Loader/Loader';
import { filterCard } from '../Utils/cardUtils';

import './CardList.css';
import * as cardActions from '../Store/actions/cardActions';
import Pagination from '../Pagination/Pagination';
import { useHistory } from 'react-router';

export default function CardList() {
  const cardList = useSelector((state) => state.card.cardList, shallowEqual);
  const substring = useSelector((state) => state.card.substring, shallowEqual);
  const currentCard = useSelector((state) => state.card.currentCard,
      shallowEqual);
  const loading = useSelector((state) => state.card.loading, shallowEqual);
  const error = useSelector((state) => state.card.error, shallowEqual);
  const dispatch = useDispatch();
  const history = useHistory();
  const firstRenderCard = cardList.slice(0, 10);

  useEffect(() => {
    dispatch(cardActions.getProduct());
  }, [dispatch]);

  const filterCardList = filterCard(
        currentCard.length === 0 ? firstRenderCard : currentCard, substring);

  const onDelete = useCallback(
      (id) => {
        dispatch(cardActions.deleteCard(id));
      },
      [dispatch],
  );

  const addCart = useCallback(
      (id) => {
        dispatch(cardActions.addCart(id));
        dispatch(cardActions.changeInCart(id, true));
        history.push('/cart');
      },
      [dispatch, history],
  );

  return (
    <React.Fragment>
      <ul className='card_list'>
        {error && <div className='wrong' >ERROR: {error}</div>}
        { loading ? <Loader /> : Array.isArray(filterCardList) &&
         filterCardList.map((card) => {
           return (
             <CardListItem
               card={ card }
               key={ card.id }
               onDelete={ onDelete }
               addCart={ addCart }
             />
           );
         })}
      </ul>
      <Pagination />
    </React.Fragment>
  );
}
