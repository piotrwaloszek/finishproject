import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { changeQuantity } from '../../../redux/cartRedux.js';

import styles from './QuantityButton.module.scss';

const Component = ({ quantity, setQuantity, cart, id, changeQuantity }) => {
  const handleChangeQuantity = (arg) => {
    if(arg === 'plus'){
      setQuantity(quantity += 1);
      changeQuantity({id, quantity});
    }
    if(arg === 'minus'){
      quantity > 1 && setQuantity(quantity -= 1);
      changeQuantity({id, quantity});
    }
  }
  return cart ? (
    <div className={clsx(styles.root, styles.cart)}>
      <span className={clsx(styles.btn, quantity === 1 && styles.btnDisable)} onClick={() => handleChangeQuantity('minus')}>-</span>
      <span>{quantity}</span>
      <span className={styles.btn} onClick={() => handleChangeQuantity('plus')}>+</span>
    </div>
  ) :
  (
    <div className={styles.root}>
      <span className={clsx(styles.btn, quantity === 1 && styles.btnDisable)} onClick={() => quantity > 1 && setQuantity(quantity -= 1)}>-</span>
      <span>{quantity}</span>
      <span className={styles.btn} onClick={() => setQuantity(quantity += 1)}>+</span>
    </div>
  )
};
Component.propTypes = {
  quantity: PropTypes.number,
  setQuantity: PropTypes.func,
  changeQuantity: PropTypes.func,
  cart: PropTypes.bool,
  id: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

const mapDispatchToProps = dispatch => ({
  changeQuantity: arg => dispatch(changeQuantity(arg)),
});

const Container = connect(null, mapDispatchToProps)(Component);

export {
  Container as QuantityButton,
  Component as QuantityButtonComponent,
};
