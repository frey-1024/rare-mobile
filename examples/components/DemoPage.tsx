import React from 'react';
import '../styles/demoPage.scss';

interface DocPageProps {
  component: any,
}

export default class DocPage extends React.Component<DocPageProps, any> {
  render() {
    const { component: Component } = this.props;
    return (
      <div className="demo-container">
        <div className="demo-content">
          <Component {...this.props}/>
        </div>
      </div>
    );
  }
}
