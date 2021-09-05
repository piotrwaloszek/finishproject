import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProducts, getAll } from '../../../redux/productsRedux';
import styles from './Shop.module.scss';
import { ShopBox } from '../../features/ShopBox/ShopBox';
import { Container as ContainerWidth } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Component = ({ products, fetchProducts }) => {
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ContainerWidth>
      <div className={styles.root}>
        <div className={styles.link}><Link to='/'>HOME</Link> / <span>Shop</span></div>
        <div className={styles.banner}>
          <h1>HONEY for HEALTH</h1>
        </div>
        <h2 className={styles.subTitle}>- SHOP WITH US -</h2>
        <div className={styles.products}>
          {products.map(data => {
            return data.customizable === false ? <ShopBox {...data} key={data._id} /> :
              Object.keys(data.images).map((color, index) => {
                data.image = data.images[color][0];
                data.color = color;
                return <ShopBox key={index} {...data} />
              }
              )
          })}
        </div>
      </div>
      </ContainerWidth>
  );
};
Component.propTypes = {
  products: PropTypes.array,
  fetchProducts: PropTypes.func,
};

const mapStateToProps = state => ({
  products: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Shop,
  Component as ShopComponent,
};
