/* @flow */

import axios from 'axios';

import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';

const API_URL =
  'https://api-er.azurewebsites.net/home/featuredproducts/region/16';

// Export this for unit testing more easily
/* istanbul ignore next */
export const fetchFeaturedProducts = (
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'FEATURED_PRODUCTS_REQUESTING' });

  try {
    const axiosConfig = {
      headers: {
        accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    const { data } = await axios.get(URL, axiosConfig);
    /* istanbul ignore next */
    dispatch({ type: 'FEATURED_PRODUCTS_SUCCESS', data });
  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: 'FEATURED_PRODUCTS_FAILURE', err: err.message });
  }
};

/* istanbul ignore next */
const shouldFetchFeaturedProducts = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  // Fetching data once in production
  if (state.home.readyStatus === 'FEATURED_PRODUCTS_SUCCESS') return false;

  return true;
};

/* istanbul ignore next */
export const fetchFeaturedProductsIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState
) => {
  /* istanbul ignore next */
  if (shouldFetchFeaturedProducts(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchFeaturedProducts());
  }

  /* istanbul ignore next */
  return null;
};
