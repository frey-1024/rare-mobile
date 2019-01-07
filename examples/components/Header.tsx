import React from 'react';
import classNames from 'classnames';
import {Link, withRouter} from 'react-router-dom';
import '../styles/header.scss';

class Header extends React.Component<RouteProps, any>{
  render() {
    const {location} = this.props;
    const navList = [{
      pathname: '/doc/components',
      value: '组件文档'
    }, {
      pathname: '/doc/code',
      value: '源码解析'
    }];
    return <header className="doc-header">
      <div className="container doc-header-nav flex-row">
        <Link to="/doc" className="flex-row row-left">
          <img className="logo" src={require('../imgs/logo.png')}/>
          <strong className="text-blue logo-text">Rare Mobile UI</strong>
        </Link>
        <div className="flex-row row-right">
          {
            navList.map((item: any) => <Link key={item.pathname} className={classNames('nav-item', {'active': item.pathname === location.pathname })} to={item.pathname}>{item.value}</Link>)
          }
        </div>
      </div>
    </header>;
  }
}

export default withRouter(Header);
