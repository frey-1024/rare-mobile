import React from 'react';
import {withRouter, Link} from 'react-router-dom';
// import {sidebarList} from '../utils/sidebarMenu';
import '../styles/sideBar.scss';

class SideBar extends React.Component {
  render() {
    return (<div className="side-bar-wrapper">
      <Link to="doc">11111</Link>
    </div>);
  }
}

export default withRouter(SideBar);
