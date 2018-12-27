import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import lazyLoad from '@/components/LazyLoad';
// import AppRouter from './router/index';
import './app.scss';
import '../src/index.scss';
import lazyLoad from "./components/LazyLoad";

// const AppRouter = () => <div>11111</div>;

const App = () => (
  <BrowserRouter>
    <Switch>
      {/*<Route exact path="/notFound" component={lazyLoad('modules/core/components/NotFound')}/>*/}
      {/*<Route path="/" component={AppRouter}/>*/}
      <Route path="/" component={lazyLoad('router/index')}/>
    </Switch>
  </BrowserRouter>
);
export default App;
