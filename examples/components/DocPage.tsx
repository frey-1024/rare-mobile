import React from 'react';
import classNames from 'classnames';
import '../styles/docPage.scss';
import SideBar from "./SideBar";

interface DocPageProps extends RouteProps{
  component: any,
}

export default class DocPage extends React.Component<DocPageProps, any>{
  render() {
    const { component: Component, location } = this.props;
    const isComponentsDoc = location.pathname.indexOf('/doc/components') >= 0;
    return (
      <div className="container doc-container">
        <div className="flex-row row-left col-top doc-content">
          {isComponentsDoc ? <SideBar/> : ''}
          <div className={classNames('flex-1', {'doc-left-divider': isComponentsDoc})}>
            <Component {...this.props}/>
          </div>
        </div>
      </div>
    );
  }
}
