import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container as WidthContainer } from '@material-ui/core';
import { connect } from 'react-redux';
import { getCartData } from '../../../redux/cartRedux.js';
import { CartBox } from '../../features/CartBox/CartBox';
import Collapse from '@material-ui/core/Collapse';
import styles from './Cart.module.scss';
import { Link } from 'react-router-dom';

const Component = ({ cart }) => {
  let price = 0;
  const [dropdown, setDropdown] = useState(false);
  const [required, setRequired] = useState(false);

  const [firstName, setFirstName] = useState(false);
  const [lastName, setLastName] = useState(false);
  const [email, setEmail] = useState(false);
  const [city, setCity] = useState(false);
  const [street, setStreet] = useState(false);
  const [postCode, setPostCode] = useState(false);

  const handleSubmit = (e) => {
    if (dropdown && firstName && lastName && email && city && street && postCode) {
      localStorage.removeItem('cart');
    } else {
      setRequired(true);
      e.preventDefault()
    }
  }

  return (
    <WidthContainer className={styles.root}>
      <div className={styles.link}><Link to='/'>HOME</Link> / <span>Cart</span></div>
      <div className={styles.leftWrapper}>
        <h2>My Cart</h2>
        {cart.map(data => {
          price += data.price * data.quantity;
          return <CartBox key={data.id} data={data} />
        })}
      </div>
      <div className={styles.rightWrapper}>
        <h2>Order Summary</h2>
        <div className={styles.price}><p>Subtotal</p><p>${price}</p></div>
        <div className={styles.price}><p>Shipping</p><p>FREE</p></div>
        <div className={styles.price}><p>Total</p><p>${price}</p></div>
        <div onClick={() => setDropdown(!dropdown)} className={styles.dropdownBtn}>
          <h4>CONTACT DETAILS</h4>
          {dropdown ? <h4>-</h4> : <h4>+</h4>}
        </div>
        <form>
          <Collapse in={dropdown} timeout="auto" unmountOnExit>
            <input type='text' placeholder='First name' onChange={e => e.target.value.length > 0 ? setFirstName(true) : setFirstName(false)}></input>
            <input type='text' placeholder='Last name' onChange={e => e.target.value.length > 0 ? setLastName(true) : setLastName(false)}></input>
            <input type='email' placeholder='E-mail' onChange={e => e.target.value.length > 0 ? setEmail(true) : setEmail(false)}></input>
            <input type='text' placeholder='City' onChange={e => e.target.value.length > 0 ? setCity(true) : setCity(false)}></input>
            <input type='text' placeholder='Street' onChange={e => e.target.value.length > 0 ? setStreet(true) : setStreet(false)}></input>
            <input type="text" pattern="[0-9]{2}\-[0-9]{3}" placeholder='Post code' onChange={e => e.target.value.length > 0 ? setPostCode(true) : setPostCode(false)}></input>
          </Collapse>
          {required && <h3 className={styles.required}>You have to add contact details!</h3>}
          <div className={styles.btnWrapper}>
            <button className={styles.btn} type='submit' onClick={(e) => handleSubmit(e)}>Checkout</button>
          </div>
        </form>
      </div>
    </WidthContainer>
  );
};
Component.propTypes = {
  cart: PropTypes.array,
};

const mapStateToProps = state => ({
  cart: getCartData(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  Container as Cart,
  Component as CartComponent,
};
