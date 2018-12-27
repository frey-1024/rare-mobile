import React from 'react';
import classNames from 'classnames';

interface PullToRefreshNormalProps {
  className?: string;
  defaultClass?: string;
  topPullText?: React.ReactNode,
  topPullActiveText?: React.ReactNode,
  topPullLoadingText?: React.ReactNode,
}

class PullToRefreshNormal extends React.Component<PullToRefreshNormalProps, any> {
  static defaultProps = {
    defaultClass: 'rate-pull-refresh-wrapper',
    topPullText: '下拉可以刷新',
    topPullActiveText: '搜开立即刷新',
    topPullLoadingText: '加载中',
  };
  componentDidMount() {
    this.$el.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.$el.addEventListener('touchmove', this.handleTouchMove.bind(this));
    this.$el.addEventListener('touchend', this.handleTouchEnd.bind(this));
  }
  renderTopPull() {
    return '';
  }
  renderBottomPull() {
    return '';
  }
  handleTouchStart() {}
  handleTouchMove() {}
  handleTouchEnd() {}
  private $el: any;
  render() {
    const {className, defaultClass, children} = this.props;
    const wrapClass = classNames(defaultClass, className);
    const contentClass = classNames('rate-pull-refresh-content', {});
    return (<div className={wrapClass} ref={(el: any) => this.$el = el}>
      <div className={contentClass}>
        {this.renderTopPull()}
        {children}
        {this.renderBottomPull()}
      </div>
    </div>);
  }
}

export default PullToRefreshNormal;
