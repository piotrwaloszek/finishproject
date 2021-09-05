import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CartBox.module.scss';
import { PUBLIC_URL } from '../../../config';
import { QuantityButton } from '../../common/QuantityButton/QuantityButton';
import { connect } from 'react-redux';
import { removeFromCart, changeDescription } from '../../../redux/cartRedux.js';
import {Link} from 'react-router-dom';

const Component = ({ data, removeFromCart, changeDescription }) => {
  const { image, price, name, quantity, customizable, id, color, description, _id } = data;
  const [quantityState, setQuantityState] = useState(quantity);
  const handleChangeDescription = e => {
    changeDescription({ description: e.target.value, id });
  };

  return (
    <div className={styles.root}>
      <span className={styles.closebtn} onClick={() => removeFromCart(id)}>X</span>
      <div className={styles.topWrapper}>
        <div className={styles.leftWrapper}>
          <Link className={styles.imageWrapper}  to={`/product/${_id}`}>
            {customizable ? <img src={`${PUBLIC_URL}${image}`} alt=''></img> : <img src={image} alt=''></img>}
          </Link>
        </div>
        <div className={styles.rightWrapper}>
          {customizable ? <h4>{`${color} ${name}`}</h4> : <h4>{name}</h4>}
          <h4>${price}</h4>
          <QuantityButton quantity={quantityState} setQuantity={setQuantityState} cart={true} id={id} />
        </div>
      </div>
      <div className={styles.bottomWrapper}>
        <textarea placeholder='Add some extra info.' value={description} onChange={handleChangeDescription}></textarea>
      </div>
    </div>
  );
};
Component.propTypes = {
  data: PropTypes.object,
  removeFromCart: PropTypes.func,
  changeDescription: PropTypes.func,
};

const mapDispatchToPropst = dispatch => ({
  removeFromCart: arg => dispatch(removeFromCart(arg)),
  changeDescription: arg => dispatch(changeDescription(arg))
});

const Container = connect(null, mapDispatchToPropst)(Component);
export {
  Container as CartBox,
  Component as CartBoxComponent,
};
