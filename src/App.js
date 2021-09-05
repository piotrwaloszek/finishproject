import React from 'react';
import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Homepage } from './components/views/Homepage/Homepage';
import { Product } from './components/views/Product/Product';
import { Shop } from './components/views/Shop/Shop';
import {Cart} from './components/views/Cart/Cart';
import {NoPermission} from './components/views/NoPermission/NoPermission';
import {useSelector} from 'react-redux';
import {getUser} from './redux/userRedux';

function App() {
  const logged = useSelector(getUser).logged;
  return (
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/product/:id' component={Product} />
          <Route exact path='/shop' component={Shop} />
          <Route exact path='/cart' component={logged ? Cart : NoPermission} />
          <Route exact path='/user/no-permission' component={NoPermission} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
