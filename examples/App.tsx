import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import lazyLoad from '@/components/LazyLoad';
import './app.scss';
import '../src/index.scss';

const App = () => (
  <BrowserRouter>
    <Route path="/" component={lazyLoad('router/index')}/>
  </BrowserRouter>
);
export default App;
