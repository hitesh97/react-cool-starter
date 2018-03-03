import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';

import { Home } from '../Home';

describe('<Home />', () => {
  const tree = (props, actions) =>
    renderer
      .create(
        <StaticRouter context={{}}>
          <Home {...props} {...actions} />
        </StaticRouter>
      )
      .toJSON();

  test('should call fetchUsers when componentWillMount', () => {
    const mockAction = jest.fn();
    const props = {
      users: {
        readyStatus: 'USERS_INVALID'
      }
    };
    const actions = {
      fetchUsers: mockAction
    };

    mount(
      <StaticRouter context={{}}>
        <Home {...props} {...actions} />
      </StaticRouter>
    );

    expect(mockAction).toHaveBeenCalled();
  });

  test('renders the loading status if requesting data', () => {
    const props = {
      users: { readyStatus: 'USERS_REQUESTING' }
    };
    const actions = { fetchUsers: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

  test('renders an error if loading failed', () => {
    const props = {
      users: { readyStatus: 'USERS_FAILURE' }
    };
    const actions = { fetchUsers: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

  test('renders the <UserList /> if loading was successful', () => {
    const props = {
      users: {
        readyStatus: 'USERS_SUCCESS',
        list: [{ id: '1', name: 'Welly' }]
      }
    };
    const actions = { fetchUsers: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });
});
