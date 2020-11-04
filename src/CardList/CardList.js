import React, { useEffect, useCallback } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import CardListItem from '../CardListItem/CardListItem';
import Loader from '../Loader/Loader'
import { filterCard } from '../Utils/cardUtils'

import './CardList.css';
import * as cardActions from '../Store/actions/cardActions';

export default function CardList() {
    const cardList = useSelector((state) => state.card.cardList, shallowEqual);
    const substring = useSelector((state) => state.card.substring, shallowEqual);
    const loading = useSelector((state) => state.card.loading, shallowEqual);
    const error = useSelector((state) => state.card.error, shallowEqual);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(cardActions.getProduct());
      }, [dispatch]);

    const filterCardList = filterCard(cardList,substring)

    const onDelete = useCallback(
        (id) => {
            dispatch(cardActions.deleteCard(id))
        },
        [dispatch],
    )

    const addCart = useCallback(
        (id) => {
            dispatch(cardActions.addCart(id, true))
        },
        [dispatch],
    )

    return (
            <ul className='card_list'>
                {error && <div className='wrong' >ERROR: {error}</div>}
                { loading ? <Loader /> : Array.isArray(filterCardList) && filterCardList.map((card) => {
                    return(
                        <CardListItem
                            card={ card }
                            key={ card.id }
                            onDelete={ onDelete }
                            addCart={ addCart }
                        />
                    )
                })}
            </ul>
    )
}
