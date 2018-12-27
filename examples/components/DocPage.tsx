import React from 'react';
import Header from './Header';
import s from '../styles/docPage.scss';
import SideBar from "./SideBar";

interface DocPageProps {
  component: any,
}

export default class DocPage extends React.Component<DocPageProps, any>{
  render() {
    const { component: Component } = this.props;
    return (
      <div className={s.container}>
        <Header/>
        <SideBar/>
        <div className={s.content}>
          <Component {...this.props}/>
        </div>
      </div>
    );
  }
}
