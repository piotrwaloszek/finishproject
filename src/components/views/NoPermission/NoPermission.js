import React from 'react';
import styles from './NoPermission.module.scss';

const Component = () => (
  <div className={styles.root}>
    <h1>YOU HAVE TO LOGIN FIRST</h1>
  </div>
);

export {
  Component as NoPermission,
  Component as NoPermissionComponent,
};
