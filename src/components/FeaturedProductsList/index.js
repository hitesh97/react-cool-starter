/* @flow */
import Helmet from 'react-helmet';
import React from 'react';
import styles from './styles.scss';

type Props = { list: Array<Object> };

export default ({ list }: Props) => (
  <div className={styles.FeaturedProductsList}>
    <Helmet title="Featured product List" />
    <h4>Featured PRoducts</h4>
    <ul>
      {list.map(({ title, subtitle, imgUrl }) => (
        <li key={Math.floor(Math.random() * 100 + 1)}>
          <img
            src={`https://d3fdwrtpsinh7j.cloudfront.net${imgUrl}`}
            alt={title}
            className={styles.FeaturedProductsList.productImage}
          />
          <h1>{title}</h1>
          <h4>{subtitle}</h4>
        </li>
      ))}
    </ul>
  </div>
);
