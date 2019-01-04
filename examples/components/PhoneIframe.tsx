import React from 'react';
import '../styles/phoneIframe.scss';

interface PhoneIframeProps {
  iframeUrl: string,
}

export default class PhoneIframe extends React.PureComponent<PhoneIframeProps> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const {iframeUrl} = this.props;
    return <div className="phone-iframe-wrapper">
      <div className="phone-title">
        <img className="phone-title-img" src={require('../imgs/phone-title.png')}/>
        <input className="phone-title-url" type="text" readOnly value={iframeUrl}/>
      </div>
      <div className="phone-content">
        <iframe src={iframeUrl} frameBorder="0" width="100%" height="100%"/>
      </div>
    </div>;
  }
}
