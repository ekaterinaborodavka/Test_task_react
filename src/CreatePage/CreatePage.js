import React, { useCallback } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './CreatePage.css';
import * as cardActions from '../Store/actions/cardActions';
import * as createActions from '../Store/actions/createActions';
// import PropTypes from 'prop-types';

export default function CreatePage(props) {
  const create = useSelector((state) => state.create, shallowEqual);
  const dispatch = useDispatch()
  const history = useHistory();

  const onFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(cardActions.createCard(create));
      history.push('/');

    }, [dispatch, create],
  );

  const onInputChange = useCallback(
    ({ target }) => {
      dispatch(createActions.updateForm({
        [target.name]: target.value,
      }));
    }, [dispatch],
);

  return (
    <div className='create'>
      <h1 className='title'>Create</h1>
      <form
        className='create_form'
        onSubmit={ onFormSubmit }
      >
        <input type='text'
        className='create_form_input'
        required
        placeholder='Title'
        name='title'
        onChange={ onInputChange }
        />
        <input type='number'
        className='create_form_input'
        required
        placeholder='Price'
        name='price'
        onChange={ onInputChange }
        />
        <input type='text'
        className='create_form_input'
        required
        placeholder='Description'
        name='description'
        onChange={ onInputChange }
        />
        <button className='create_form_button'>Create</button>
      </form>
    </div>
  );
}

// CategoryGoods.propTypes = {
//   onChange: PropTypes.func,
//   categories: PropTypes.array,
//   defaultValue: PropTypes.string,
// };
