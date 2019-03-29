import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import './index.scss';

interface ShiftNavProps {
  navClassName?: string,
  maskClassName?: string,
  navContent: React.ReactNode,
  size?: number,
  placement?: string,
  visible?: boolean,
  onEnter?: () => any,
  onEntering?: () => any,
  onEntered?: () => any,
  onExit?: () => any,
  onExiting?: () => any,
  onExited?: () => any,
}
interface ShiftNavStates {
  currentStatus: string
}

const UNMOUNTED = 'unmounted';
// const ENTERING = 'entering';
const ENTERED = 'entered';
// const EXITING = 'exiting';
const EXITED = 'exited';

export default class ShiftNav extends Component<ShiftNavProps, ShiftNavStates> {
  static defaultProps = {
    size: 290,
    placement: 'left',
    visible: false,
  };
  private prefixCls: string = 'rt-shift';
  _node: any;
  timer: any;
  constructor(props: any) {
    super(props);
    this._node = window.document.createElement('div');
    window.document.body.appendChild(this._node);
    this.state = {
      currentStatus: UNMOUNTED
    };
  }
  componentDidUpdate() {
    const {visible} = this.props;
    const {currentStatus} = this.state;
    if (!visible && currentStatus === UNMOUNTED) {
      return;
    }
    const nextStatus = visible ? ENTERED : currentStatus === EXITED ? UNMOUNTED : EXITED;
    console.log(nextStatus, currentStatus);
    if (currentStatus !== nextStatus) {
      if (this.timer) {
        window.clearTimeout(this.timer);
      }
      this.timer = window.setTimeout(() => {
        this.setState({
          currentStatus: nextStatus
        });
      });
    }
  }
  renderPortal = () => {
    const { navContent, maskClassName, navClassName, visible } = this.props;
    // 初始化时，如果不显示，将不创建
    if (this.state.currentStatus === UNMOUNTED || !visible) {
      return '';
    }
    const {currentStatus} = this.state;
    const maskClass = classNames(
      `${this.prefixCls}-mask`,
      maskClassName,
      {
        [`${this.prefixCls}-transitions`]: currentStatus === ENTERED
      }
    );
    const navClass = classNames(
      `${this.prefixCls}-wrap`,
      navClassName,
      {
        [`${this.prefixCls}-transitions`]: currentStatus === ENTERED
      }
    );
    return createPortal(
      <Fragment>
        <div className={maskClass} />
        <div className={navClass}>{navContent}</div>
      </Fragment>,
      this._node
    );
  };
  render() {
    const { children, visible } = this.props;
    console.log(visible);
    return (
      <Fragment>
        <div>{children}</div>
        {this.renderPortal()}
      </Fragment>
    );
  }
  componentWillUnmount() {
    window.document.body.removeChild(this._node);
  }
}
