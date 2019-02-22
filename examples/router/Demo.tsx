import React, {Fragment} from 'react';
import { Switch, Redirect } from 'react-router-dom';
import DemoProtectRoute from '../components/DemoProtectRoute';
import { getDemoRouters } from './routerSplit';
import '../styles/demoBase.scss';

const demoRouters = getDemoRouters();

interface DocProps extends RouteProps {
}

export default class Doc extends React.Component<DocProps, any> {
  getAvailableRouter() {
    const { match } = this.props;
    return demoRouters.map((route: any) =>
      <DemoProtectRoute {...this.props} key={route.pathname} exact={!route.notExact} path={`${match.path}${route.pathname}`} component={route.component}/>);
  }
  render() {
    return (
      <Fragment>
        <Switch>
          {this.getAvailableRouter()}
          <Redirect to="/demo" />
        </Switch>
      </Fragment>
    );
  }
}
