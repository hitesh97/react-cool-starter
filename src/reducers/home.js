/* @flow */

import _ from 'lodash';

import type { Home, Action } from '../types';

type State = Home;

const initialState = {
  readyStatus: 'USERS_INVALID',
  err: null,
  list: [],
  featuredProducts: []
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'USERS_REQUESTING':
      return _.assign({}, state, {
        readyStatus: 'USERS_REQUESTING'
      });
    case 'USERS_FAILURE':
      return _.assign({}, state, {
        readyStatus: 'USERS_FAILURE',
        err: action.err
      });
    case 'USERS_SUCCESS':
      return _.assign({}, state, {
        readyStatus: 'USERS_SUCCESS',
        list: action.data
      });
    case 'FEATURED_PRODUCTS_REQUESTING':
      return _.assign({}, state, {
        readyStatus: 'FEATURED_PRODUCTS_REQUESTING'
      });
    case 'FEATURED_PRODUCTS_SUCCESS':
      return _.assign({}, state, {
        readyStatus: 'FEATURED_PRODUCTS_SUCCESS',
        featuredProducts: action.data
      });
    case 'FEATURED_PRODUCTS_FAILURE':
      return _.assign({}, state, {
        readyStatus: 'FEATURED_PRODUCTS_FAILURE',
        err: action.err
      });
    default:
      return state;
  }
};
