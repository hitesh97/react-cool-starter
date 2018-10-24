/* @flow */

module.exports = {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT || 3000,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Microlease new Improved Website (SSR)',
    titleTemplate: 'Microlease - %s',
    meta: [
      {
        name: 'description',
        content:
          'This is the meta description! Microlease new improved website is coming soon!!'
      }
    ]
  }
};
