import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addModal } from '../../../redux/modalRedux.js';
import { getUser } from '../../../redux/userRedux.js';
import { Link } from 'react-router-dom';
import { Container as ContainerWidth } from '@material-ui/core';
import { NavButton } from '../../common/NavButton/NavButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import styles from './Header.module.scss';

const Component = ({ addModal, user }) => {
  return (
    <div className={styles.root}>
      <ContainerWidth maxWidth='md' className={styles.container}>
        <NavButton name={'Home'} link='/' />
        <NavButton name={'About'} link='/about' />
        <NavButton name={'Shop'} link='/shop' />
        {user.logged === false ?
          <a href='/auth/google' className={styles.btn}><AccountCircleIcon />Log In</a> :
          <div>
            <Link to='/cart' className={styles.btn}>{user.name}</Link>
            <a href='/auth/logout' className={styles.btn}>Logout</a>
          </div>}
        <a onClick={addModal} className={styles.btn}><ShoppingCartIcon /></a>
      </ContainerWidth>

    </div>
  );
};
Component.propTypes = {
  addModal: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  addModal: () => dispatch(addModal()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Header,
  Component as HeaderComponent,
};
