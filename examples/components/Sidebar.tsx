import React from 'react';
import classNames from 'classnames';
import {withRouter, Link} from 'react-router-dom';
import {navList} from '../utils/navMenu';
import '../styles/sidebar.scss';

interface SidebarProps extends RouteProps {
  className?: string
}

class Sidebar extends React.Component<SidebarProps, any> {
  render() {
    const { className, location } = this.props;
    return (<div className={classNames(className, 'sidebar-wrapper')}>
      <ul>
        {
          navList.map((item) =>
            (<li key={item.title}>
              <strong className="sidebar-item-title">{item.title}</strong>
              {
                (item.children && item.children.length) ? item.children.map((child) => {
                  const pathname = `${item.docBasePath}${child.path}`;
                  return (<ul key={child.title} className="sidebar-children">
                    <li>
                      <Link to={pathname} className={classNames({'active': location.pathname === pathname})}>{child.title}</Link>
                    </li>
                  </ul>);
                }) : ''
              }
            </li>))
        }
      </ul>
    </div>);
  }
}

export default withRouter(Sidebar);
