import React, {Fragment} from 'react';
import { Switch, Redirect } from 'react-router-dom';
import DocProtectRoute from '../components/DocProtectRoute';
import { getDocRouters } from './routerSplit';
// import '../styles/pcBase.scss';

const docRouters = getDocRouters();

interface DocProps extends RouteProps{
}

export default class Doc extends React.Component<DocProps, any>{
  getAvailableRouter() {
    const { match } = this.props;
    return docRouters.map((route: any) => {
      console.log(`${match.path}${route.pathname}`);
      return <DocProtectRoute {...this.props} key={route.pathname} exact={route.exact} path={`${match.path}${route.pathname}`} component={route.component}/>;
    });
  }
  render() {
    console.log(this.props);
    return (
      <Fragment>
        <Switch>
          {this.getAvailableRouter()}
          <Redirect to="/notFound" />
        </Switch>
      </Fragment>
    );
  }
}
