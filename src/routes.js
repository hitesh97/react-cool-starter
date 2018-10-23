/* @flow */

import { userAction, featuredProductsAction } from './actions';
import App from './app';
import { asyncHome, asyncUserInfo, NotFound } from './pages';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: asyncHome, // Add your route here
        loadData: () => [
          // Add other pre-fetched actions here
          featuredProductsAction.fetchFeaturedProductsIfNeeded()
        ]
      },
      {
        path: '/UserInfo/:id',
        component: asyncUserInfo,
        loadData: ({ params }: Object) => [
          userAction.fetchUserIfNeeded(params.id)
        ]
      },
      {
        component: NotFound
      }
    ]
  }
];
