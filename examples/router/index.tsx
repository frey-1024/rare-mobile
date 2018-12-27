import React, {Fragment} from 'react';
import { Route, Switch } from 'react-router-dom';
// import {isMobile} from "../utils/assert";
import lazyLoad from '../components/LazyLoad';

function getRouterByUserAgent() {
  // if (!isMobile()) {
  return (<Fragment>
    <Switch>
      <Route path="/doc" component={lazyLoad('router/Doc')}/>
      {/*<Redirect to="/notFound"/>*/}
    </Switch>
  </Fragment>);
  // }
  // return (
  //   <Fragment>
  //     <Switch>
  //       {/*<Route path="/demo" component={lazyLoad('modules/core/routers/indexMobile')}/>*/}
  //       {/*<Redirect to="/notFound"/>*/}
  //     </Switch>
  //   </Fragment>
  // );
}

const AppRouter = getRouterByUserAgent;
export default AppRouter;
