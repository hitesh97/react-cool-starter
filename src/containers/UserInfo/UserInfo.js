/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';

import * as usersAction from '../../actions/users.actions';
import type { Users as UsersType, ReduxState } from '../../types';
import { UserCard } from '../../components';
import styles from './styles.scss';

type Props = {
  userInfo: UsersType,
  match: Object,
  fetchUser: (id: string) => void
};

// Export this for unit testing more easily
export class UserInfo extends PureComponent<Props> {
  componentWillMount() {
    const { fetchUser, match } = this.props;
    if (!this.props.userInfo[match.params.id]) {
      fetchUser(match.params.id);
    }
  }

  renderUserCard = () => {
    const { userInfo, match: { params } } = this.props;
    const userInfoById = userInfo[params.id];

    if (!userInfoById || userInfoById.readyStatus === 'USER_REQUESTING') {
      return <p>Loading...</p>;
    } else if (userInfoById.readyStatus === 'USER_FAILURE') {
      return <p>Oops, Failed to load info!</p>;
    }

    return <UserCard info={userInfoById.info} />;
  };

  render() {
    return (
      <div className={styles.UserInfo}>
        <Helmet title="User Info" />
        {this.renderUserCard()}
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ users }: ReduxState) => ({ userInfo: users.userInfo }),
  {
    fetchUser: usersAction.fetchUser
  }
);

// Enable hot reloading for async componet
export default compose(hot(module), withRouter, connector)(UserInfo);
