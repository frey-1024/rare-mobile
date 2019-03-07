import React from 'react';
import {
  Redirect,
  Route,
} from "react-router-dom";
import {isMobile} from "../utils/assert";
import DocPage from './DocPage';

interface ProtectRouteProps extends RouteProps {
  pathname?: string,
  demoPath?: string,
  exact?: boolean,
  path: string,
  component: any
}

export default class DocProtectRoute extends React.Component<ProtectRouteProps, any> {
  render() {
    const { pathname, demoPath } = this.props;
    // 需要登录
    if (isMobile()) {
      return (
        <Redirect
          to={{
            pathname: `/demo/${demoPath ? demoPath : pathname}`,
          }}
        />
      );
    }

    return (
      <Route
        render={(props: any) =>
          (<DocPage {...props} {...this.props} />)}
      />
    );
  }
}
