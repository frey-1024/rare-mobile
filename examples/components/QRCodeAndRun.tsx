import React from 'react';
import PhoneIframe from "@/components/PhoneIframe";
import QRCode from 'qrcode.react';
import '../styles/qrCodeAndRun.scss';

interface QRCodeAndRunProps {
  url: string,
}

export default class QRCodeAndRun extends React.PureComponent<QRCodeAndRunProps, any> {
  render() {
    const href = `${window.location.origin}${this.props.url}`;
    return (<div className="qrcode-and-run-wrapper">
      <h2>代码在线执行</h2>
      <div className="flex-row row-left col-bottom qrcode-and-run-content">
        <PhoneIframe
          iframeUrl={href}
        />
        <div className="flex-row row-left col-top qrcode-wrapper">
          <QRCode className="qrcode" value={href} size={80}/>
          <div className="text-orange qrcode-tip">
            推荐使用手机扫二维码查看演示效果
          </div>
        </div>
      </div>
    </div>);
  }
}
