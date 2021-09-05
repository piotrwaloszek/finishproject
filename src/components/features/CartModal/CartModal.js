import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { removeModal, getModal } from '../../../redux/modalRedux.js';
import { getCartData, fetchCart } from '../../../redux/cartRedux.js';
import Drawer from '@material-ui/core/Drawer';
import { CartBox } from '../../features/CartBox/CartBox';
import styles from './CartModal.module.scss';
import { Link } from 'react-router-dom';

const Component = ({ removeModal, modalData, cartData, fetchCart }) => {
  useEffect(()=>{
    fetchCart(cartData)
  }, [cartData])
  let price = 0;
  cartData.map(data => price += (data.price * data.quantity));
  // if (cartData.length > 0) {
  //   localStorage.setItem('cart', JSON.stringify(cartData));
  // }
  // const cartProductsLocalStorage = JSON.parse(localStorage.getItem('cart'));
  // console.log(cartProductsLocalStorage)
  return (
    <Drawer anchor='right' open={modalData} onClose={() => removeModal()} className={styles.cart}>
      <div className={styles.cartHeader}>
        <span onClick={() => removeModal()}>{'>'}</span>
        <h2>Cart</h2>
      </div>
      <div className={styles.cartMain}>
        {cartData.map((data, index) =>
          <CartBox key={index} data={data} />)}
      </div>
      <div className={styles.priceWrapper}>
        <h3>Subtotal</h3>
        <h3>${price}</h3>
      </div>
      <div className={styles.cartFooter}>
        <Link to='/cart' onClick={removeModal}>View Cart</Link>
      </div>
    </Drawer>
  );
};

Component.propTypes = {
  addModal: PropTypes.func,
  removeModal: PropTypes.func,
  fetchCart: PropTypes.func,
  modalData: PropTypes.bool,
  cartData: PropTypes.array,
};

const mapStateToProps = state => ({
  modalData: getModal(state),
  cartData: getCartData(state),
});

const mapDispatchToProps = dispatch => ({
  removeModal: () => dispatch(removeModal()),
  fetchCart: (arg) => dispatch(fetchCart(arg))
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as CartModal,
  Component as CartModalComponent,
};
