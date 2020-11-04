import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom';

import './CardListItem.css';

export default function CardListItem(props) {
    const { title, price, description, id } = props.card
    const { onDelete, addCart } = props
    const history = useHistory();

    const goEditPage = useCallback(
        () => {
            history.push('/edit')
        }
    )

    const onDeleteCard = useCallback(
        () => {
            onDelete(id);
        },[id, onDelete]
    )

    const addToCart = useCallback(
        () => {
            addCart(id);
        },[id, addCart]
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
                <button className='card_list_item_button_edit'
                    onClick={ goEditPage }>
                    Edit
                </button>
                <button className='card_list_item_button_add'
                    onClick={ addToCart }>
                    Add to card
                </button>
                <button className='card_list_item_button_delete'
                    onClick={ onDeleteCard }>
                    Delete
                </button>
            </div>
        </li>
    )
}
