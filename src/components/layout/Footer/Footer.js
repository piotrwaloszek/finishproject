import React from 'react';
import styles from './Footer.module.scss';

const Component = () => (
  <div className={styles.root}>
    Created by Piotr Wałoszek © 2021
  </div>
);

export {
  Component as Footer,
  Component as FooterComponent,
};
