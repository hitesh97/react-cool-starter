/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import { featuredProductsAction } from '../../actions';
import type { Home as HomeType, Dispatch, ReduxState } from '../../types';
import { FeaturedProductsList } from '../../components';
import styles from './styles.scss';

type Props = {
  home: HomeType,
  fetchFeaturedProductsIfNeeded: () => void
};

// Export this for unit testing more easily
export class Home extends PureComponent<Props> {
  componentDidMount() {
    const { fetchFeaturedProductsIfNeeded } = this.props;

    fetchFeaturedProductsIfNeeded();
  }

  renderProductsList = () => {
    const { home } = this.props;

    if (
      !home.readyStatus ||
      home.readyStatus === 'FEATURED_PRODUCTS_REQUESTING' ||
      home.readyStatus === 'FEATURED_PRODUCTS_INVALID'
    ) {
      return <p>Loading products...</p>;
    }

    if (home.readyStatus === 'FEATURED_PRODUCTS_FAILURE') {
      return (
        <p>
          Oops, Failed to load Featured Products!
          <br />
          {home.err}
        </p>
      );
    }
    return <FeaturedProductsList list={home.featuredProducts} />;
  };

  render() {
    return (
      <div className={styles.Home}>
        <Helmet title="Home" />
        {this.renderProductsList()}
      </div>
    );
  }
}

const connector = connect(
  ({ home }: ReduxState) => ({ home }),
  (dispatch: Dispatch) => ({
    fetchFeaturedProductsIfNeeded: () =>
      dispatch(featuredProductsAction.fetchFeaturedProductsIfNeeded())
  })
);

export default compose(
  withRouter,
  connector
)(Home);
