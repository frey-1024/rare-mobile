import React from 'react';
import { ShiftNav } from 'rate-mobile/index';
import './styles/demo.scss';

interface ShiftNavState {
  visible: boolean,
}

export default class InputNumberDemo extends React.Component<RouteProps, ShiftNavState> {
  constructor(props: RouteProps) {
    super(props);
    this.state = {
      visible: false
    };
  }
  openShiftNav = () => {
    this.setState({
      visible: true
    });
  };
  closeShiftNav = () => {
    this.setState({
      visible: false
    });
  };
  renderNavContent = () =>
    <ul>
      <li>111111</li>
      <li>22222</li>
      <li>33333</li>
      <li><button onClick={() => this.closeShiftNav()}>点击关闭Shift Nav</button></li>
    </ul>;
  render() {
    const { visible } = this.state;
    return (
      <ShiftNav
        navContent={this.renderNavContent()}
        visible={visible}
      >
        <div className="shift-demo-wrapper">
          <button
            onClick={() => this.openShiftNav()}
          >
            点击打开Shift Nav
          </button>
        </div>
      </ShiftNav>
    );
  }
}
