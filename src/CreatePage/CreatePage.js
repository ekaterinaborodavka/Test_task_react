import React, { useCallback } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './CreatePage.css';
import * as cardActions from '../Store/actions/cardActions';
import * as createActions from '../Store/actions/createActions';
import ButtonMain from '../ButtonMain/ButtonMain';
// import PropTypes from 'prop-types';

export default function CreatePage(props) {
  const create = useSelector((state) => state.create, shallowEqual);
  const cardList = useSelector((state) => state.card.cardList, shallowEqual);
  const changeCard = useSelector((state) => state.card.changeCard, shallowEqual);
  const edit = useSelector((state) => state.card.edit, shallowEqual);
  const editId = useSelector((state) => state.card.editId, shallowEqual);
  const dispatch = useDispatch()
  const history = useHistory();
  let editCard = cardList.filter((e) => e.id === editId)

  const onFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if(edit){
        Object.keys(create).forEach((key) => (create[key] == '') 
          && delete create[key]);
        const changeEl = {
          ...create,
          ...editCard
        }
        dispatch(cardActions.editCard(editId, changeEl));
      }else{
        dispatch(cardActions.createCard(create));
      }
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

  const onInputValue = useCallback(
      ({ target }) => {
        target.value=target.placeholder;
      }, [],
  );

  return (
    <div className='create'>
      <h1 className='title'>{ edit ? 'Edit' : 'Create'}</h1>
      <ButtonMain />
      <form
        className='create_form'
        onSubmit={ onFormSubmit }
      >
      { edit ? <input type='text'
        className='create_form_input'
        placeholder={ editCard[0].title === '' ?
          'Title' :  editCard[0].title}
        onClick={ editCard[0].title === '' ? null : onInputValue}
        name='title'
        onChange={ onInputChange }/> :
        <input type='text'
        className='create_form_input'
        required
        placeholder='Title'
        name='title'
        onChange={ onInputChange }
        />}
        { edit ? <input type='number'
        className='create_form_input'
        placeholder={ editCard[0].title === '' ?
          'Price' :  editCard[0].price}
        onClick={ editCard[0].title === '' ? null : onInputValue}
        name='price'
        onChange={ onInputChange }/> :
        <input type='number'
        className='create_form_input'
        required
        placeholder='Price'
        name='price'
        onChange={ onInputChange }
        />}
        { edit ? <input type='text'
        className='create_form_input'
        placeholder={ editCard[0].title === '' ?
          'Description' :  editCard[0].description}
        onClick={ editCard[0].title === '' ? null : onInputValue}
        name='description'
        onChange={ onInputChange }/> :
        <input type='text'
        className='create_form_input'
        required
        placeholder='Description'
        name='description'
        onChange={ onInputChange }
        />}
        { edit ? <button className='form_button'>Edit</button> :
        <button className='form_button'>Create</button> }
      </form>
    </div>
  );
}

// CategoryGoods.propTypes = {
//   onChange: PropTypes.func,
//   categories: PropTypes.array,
//   defaultValue: PropTypes.string,
// };
