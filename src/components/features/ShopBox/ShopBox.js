import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ShopBox.module.scss';
import { PUBLIC_URL } from '../../../config';
import { QuantityButton } from '../../common/QuantityButton/QuantityButton';
import { Link } from 'react-router-dom';
import { addToCart } from '../../../redux/cartRedux';
import { addModal } from '../../../redux/modalRedux';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const Component = ({ image, name, price, customizable, _id, addModal, addToCart, color }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const output = {
      price,
      name,
      quantity,
      color,
      image,
      customizable,
      id: uuidv4(),
      _id
    };
    addModal();
    addToCart(output);
  }

  return (
    <div className={styles.root}>
      <Link className={styles.imageWrapper} to={{pathname: `/product/${_id}`, state: {color}}} >
        {customizable ? <img src={`${PUBLIC_URL}${image}`} alt=''></img> : <img src={image} alt=''></img>}
        <div className={styles.slideInfo}>Quick view</div>
      </Link>
      {customizable ? <h4>{`${color} ${name}`}</h4> : <h4>{name}</h4>}
      <h4>${price}</h4>
      <QuantityButton quantity={quantity} setQuantity={setQuantity} />
      <a className={styles.cartButton} onClick={() => handleAddToCart()}>Add to Cart</a>
    </div>
  );
};
Component.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  _id: PropTypes.string,
  price: PropTypes.number,
  customizable: PropTypes.bool,
  addToCart: PropTypes.func,
  addModal: PropTypes.func,
};

const mapDispatchToProps = (dispatch, props) => ({
  addToCart: arg => dispatch(addToCart(arg)),
  addModal: () => dispatch(addModal()),
});

const Container = connect(null, mapDispatchToProps)(Component);


export {
  Container as ShopBox,
  Component as ShopBoxComponent,
};
