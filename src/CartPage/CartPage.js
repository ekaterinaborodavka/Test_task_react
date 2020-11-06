import React, { useEffect, useCallback } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import './CartPage.css';
import * as cardActions from '../Store/actions/cardActions';
import Loader from '../Loader/Loader';
import CartItem from '../CartItem/CartItem';
import ButtonMain from '../ButtonMain/ButtonMain';

export default function CartPage() {
  const loading = useSelector((state) => state.card.loading, shallowEqual);
  const error = useSelector((state) => state.card.error, shallowEqual);
  const basketList = useSelector((state) => state.card.basketList,
      shallowEqual);
  const total = useSelector((state) => state.card.total, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cardActions.getCart());
  }, [dispatch]);

  const onDelete = useCallback(
      (id) => {
        dispatch(cardActions.removeCart(id));
        dispatch(cardActions.changeInCartFalse(id));
      },
      [dispatch],
  );

  return (
    <div className='cart'>
      <h1 className='title'>Cart</h1>
      <ButtonMain />
      <ul className='cart_list'>
        {error && <div className='wrong' >ERROR: {error}</div>}
        { basketList.length === 0 ? <div className='cart_empty'>
                  Your cart is empty
        </div> : null}
        { loading ? <Loader /> : Array.isArray(basketList) &&
        basketList.map((cart) => {
          return (
            <CartItem
              cart={ cart }
              key={ cart.id }
              onDelete={ onDelete }
            />
          );
        })}
      </ul>
      {basketList.length === 0 ? null :
        <div className='cart_list_total'>Total price: { total } </div>}
    </div>
  );
}
