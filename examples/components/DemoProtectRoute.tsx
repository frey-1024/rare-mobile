import React from 'react';
import {
  Redirect,
  Route,
} from "react-router-dom";
import {isMobile} from "../utils/assert";
import DemoPage from './DemoPage';

interface ProtectRouteProps extends RouteProps{
  pathname?: string,
  docPath?: string,
  exact?: boolean,
  path: string,
  component: any
}

export default class DemoProtectRoute extends React.Component<ProtectRouteProps, any>{
  render() {
    const { pathname, docPath } = this.props;
    // 需要登录
    if (!isMobile()) {
      return (
        <Redirect
          to={{
            pathname: `/doc/${docPath ? docPath : pathname}`,
          }}
        />
      );
    }

    return (
      <Route
        render={(props: any) => {
          return (<DemoPage {...props} {...this.props} />);
        }}
      />
    );
  }
}
