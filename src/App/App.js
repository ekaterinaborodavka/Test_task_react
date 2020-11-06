import React, {useCallback} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import MainPage from '../MainPage/MainPage';
import CreatePage from '../CreatePage/CreatePage';
import CartPage from '../CartPage/CartPage';

import './App.css';
import * as cardActions from '../Store/actions/cardActions';


export default function App() {
  const dispatch = useDispatch();

  const onSearchChange = useCallback(
      (substring) => {
        dispatch(cardActions.onSearchChange(substring));
      }, [dispatch],
  );

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <MainPage onSearchChange={ onSearchChange }/>
        </Route>
        <Route path='/create'>
          <CreatePage />
        </Route>
        <Route path='/cart'>
          <CartPage />
        </Route>
        <Route path='/edit'>
          <CreatePage />
        </Route>
      </Switch>
    </Router>
  );
}
