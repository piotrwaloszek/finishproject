import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { useDispatch } from 'react-redux';
import {fetchUser} from '../../../redux/userRedux';
import styles from './MainLayout.module.scss';
import { CartModal } from '../../features/CartModal/CartModal';

const Component = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser())
  }, [])
  return (
    < div className={styles.root} >
      <Header />
      {children}
      <CartModal />
      <Footer />
    </div >

  );
};
Component.propTypes = {
  children: PropTypes.node,
};

export {
  Component as MainLayout,
  Component as MainLayoutComponent,
};
