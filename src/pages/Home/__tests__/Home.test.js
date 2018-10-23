import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { Home } from '../Home';

describe('<Home />', () => {
  const tree = (props, actions) =>
    renderer
      .create(
        <MemoryRouter>
          <Home {...props} {...actions} />
        </MemoryRouter>
      )
      .toJSON();

  it('should call fetchFeaturedProductsIfNeeded when componentDidMount', () => {
    const mockAction = jest.fn();
    const props = {
      home: {}
    };
    const actions = {
      fetchFeaturedProductsIfNeeded: mockAction
    };

    mount(
      <MemoryRouter>
        <Home {...props} {...actions} />
      </MemoryRouter>
    );

    expect(mockAction).toHaveBeenCalled();
  });
  /* 
  it('renders the loading status if data invalid', () => {
    const props = {
      home: { readyStatus: 'USERS_INVALID' }
    };
    const actions = { fetchUsersIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

  it('renders the loading status if requesting data', () => {
    const props = {
      home: { readyStatus: 'USERS_REQUESTING' }
    };
    const actions = { fetchUsersIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

  it('renders an error if loading failed', () => {
    const props = {
      home: { readyStatus: 'USERS_FAILURE' }
    };
    const actions = { fetchUsersIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

   it('renders the <UserList /> if loading was successful', () => {
    const props = {
      home: {
        readyStatus: 'USERS_SUCCESS',
        list: [{ id: '1', name: 'Welly' }]
      }
    };
    const actions = { fetchUsersIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  }); */

  it('renders the <FeaturedProductsList /> if loading was successful', () => {
    const props = {
      home: {
        readyStatus: 'FEATURED_PRODUCTS_SUCCESS',
        featuredProducts: [
          [
            {
              imageName: 'FTB-1-2HR.jpg',
              imgUrl: '/Images/HomeFeaturedProducts/FTB-1-2HR.jpg',
              title: 'Exfo FTB-1 Familie',
              subtitle:
                'Het FTB-1 Platform is een open testoplossing voor het.',
              links: [
                {
                  linkText: 'Meer informatie',
                  linkUrl:
                    '/products/Exfo/SDH-SONET-Ethernet/FTB-1?BaseModelId=89542',
                  linkType: 'button'
                },
                {
                  linkText: 'Alles weergeven SDH / SONET / Ethernet',
                  linkUrl: '/product-group/5/sdh-sonet-ethernet',
                  linkType: 'href'
                }
              ]
            }
          ]
        ]
      }
    };
    const actions = { fetchFeaturedProductsIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });
});
