import React from 'react';
import PropTypes from 'prop-types';
import styles from './NavButton.module.scss';
import { NavLink } from 'react-router-dom';

const Component = ({ name, link }) => (
  <NavLink exact to={link} className={styles.root} activeClassName={styles.active}>
    {name}
  </NavLink>
);

Component.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
};

export {
  Component as NavButton,
  Component as NavButtonComponent,
};
