import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';

import './CartItem.css';
import * as cardActions from '../Store/actions/cardActions';

export default function CartItem(props) {
    const { title, price, description, id, quantity } = props.cart
    const { onDelete } = props
    const dispatch = useDispatch()

    const onDeleteCart = useCallback(
        () => {
            onDelete(id);
        },[id, onDelete]
    )

    const increment = useCallback(
        () => {
            dispatch(cardActions.updateQuantity(id, 'inc'))
        }, []
    )

    const decrement = useCallback(
        () => {
            dispatch(cardActions.updateQuantity(id, 'dec'))
        }, []
    )

    return (
        <li className='card_list_item'>
            <div className='card_list_item_wrapper'>
            <div className='card_list_item_title'>
                <span>Title:</span> { title }
            </div>
            <div className='card_list_item_price'>
                <span>Price:</span> { price }
            </div>
            <div className='card_list_item_description'>
                <span>Description:</span> { description }
            </div>
            </div>
            <div className='card_list_item_buttons'>
                <div className='buttons_plus_minus'>
                    <button className='button_plus'
                            onClick={ increment }>
                        +
                    </button>
                    <span> { quantity } </span>
                    <button className='button_minus'
                            onClick={ decrement }
                            disabled={ quantity <= 1 }>
                        -
                    </button>
                </div>
                <button className='card_list_item_button_delete'
                    onClick={ onDeleteCart }>
                    Delete
                </button>
            </div>
        </li>
    )
}
