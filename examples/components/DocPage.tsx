import React from 'react';
import Header from './Header';
import '../styles/docPage.scss';
import SideBar from "./SideBar";

interface DocPageProps {
  component: any,
}

export default class DocPage extends React.Component<DocPageProps, any>{
  render() {
    const { component: Component } = this.props;
    return (
      <div className="doc-container">
        <Header/>
        <SideBar/>
        <div className="doc-content">
          <Component {...this.props}/>
        </div>
      </div>
    );
  }
}
