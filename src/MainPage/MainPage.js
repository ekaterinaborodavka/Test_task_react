import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './MainPage.css';
import basket from '../img/basket.png';
import plus from '../img/plus.png';
import CardList from '../CardList/CardList';
import * as cardActions from '../Store/actions/cardActions';
import PropTypes from 'prop-types';

export default function MainPage(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { onSearchChange } = props;

  const goPages = useCallback(
      (e) => {
        history.push(`/${e.target.name}`);
        if (e.target.name === 'create') {
          dispatch(cardActions.changeEdit(false));
        }
      },
      [history, dispatch],
  );

  const onSearchCard = useCallback(
      (e) => {
        onSearchChange(e.target.value);
      }, [onSearchChange],
  );

  return (
    <div className='main'>
      <h1 className='title'>Main</h1>
      <div className='main_buttons'>
        <button className='create_button'
          onClick={ goPages }>
          <img src={ plus } name='create' alt='plus' />
        </button>
        <button className='basket_button'
          onClick={ goPages }>
          <img src={ basket } name='cart' alt='basket' />
        </button>
      </div>
      <input type='text'
        className='filter-input'
        placeholder='search'
        onChange={ onSearchCard } />
      <CardList />
    </div>
  );
}

MainPage.propTypes = {
  onSearchChange: PropTypes.func,
};
