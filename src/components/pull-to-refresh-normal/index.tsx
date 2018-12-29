import React from 'react';
import classNames from 'classnames';

interface PullToRefreshNormalProps {
  className?: string;
  defaultClass?: string;
  isRefresh?: boolean,
  refreshing?: boolean,
  refreshLoaderHeight?: number | any,
  topPullText?: React.ReactNode,
  topPullActiveText?: React.ReactNode,
  topPullLoadingText?: React.ReactNode,
  style?: any,
  onRefresh?: () => void
}

interface PullToRefreshNormalState {
  moveY: number, // 移动垂直距离
  isBack: boolean // 是否返回到原来的位置，加入translate动画
}

class PullToRefreshNormal extends React.Component<PullToRefreshNormalProps, PullToRefreshNormalState> {
  static defaultProps = {
    defaultClass: 'rt-pull-normal',
    topPullText: '下拉可以刷新',
    topPullActiveText: '松开立即刷新',
    topPullLoadingText: '加载中',
    isRefresh: false,
    refreshing: false,
    refreshLoaderHeight: 30, // 触发刷新的下拉高度，单位px
  };

  constructor(props: PullToRefreshNormalProps) {
    super(props);
    this.state = {
      moveY: 0,
      isBack: false,
    };
  }
  componentDidMount() {
    this.$el.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.$el.addEventListener('touchmove', this.handleTouchMove.bind(this));
    this.$el.addEventListener('touchend', this.handleTouchEnd.bind(this));
  }
  private prefixCls: string = 'rt-pull-normal';
  private startY: number;
  renderTopPull() {
    const {moveY} = this.state;
    const {topPullText, topPullActiveText, refreshLoaderHeight} = this.props;
    // 移动距离小于触发刷新的下拉高度
    if (moveY < refreshLoaderHeight) {
      return <p className={`${this.prefixCls}-top-text`}>{topPullText}</p>;
    }
    // 移动距离大于等于触发刷新的下拉高度
    return <p className={`${this.prefixCls}-top-text`}>{topPullActiveText}</p>;
  }
  renderBottomPull() {
    return '';
  }
  handleTouchStart(event: any) {
    const touch = event.changedTouches[0];
    this.startY = touch.pageY;
    this.setState({
      isBack: false,
    });
  }
  handleTouchMove(event: any) {
    const touch = event.changedTouches[0];
    this.setState({
      moveY: this.state.moveY + touch.pageY - this.startY,
    });
    this.startY = touch.pageY;
    console.log(event, this.startY);
  }
  handleTouchEnd(event: any) {
    const {moveY} = this.state;
    const {refreshLoaderHeight, onRefresh} = this.props;
    // 下拉
    if (moveY > 0) {
      // 移动距离小于触发刷新的下拉高度, 恢复到原来位置，不做处理
      if (moveY < refreshLoaderHeight) {
        this.setState({
          moveY: 0,
          isBack: true,
        });
      } else {
        this.setState({
          moveY: refreshLoaderHeight,
          isBack: true,
        });
        if (onRefresh) {
          onRefresh();
        }
      }
    }

    console.log(event, 'TouchEnd');
  }
  private $el: any;
  render() {
    const {className, defaultClass, children, isRefresh, style} = this.props;
    const {moveY, isBack} = this.state;
    const wrapClass = classNames(defaultClass, className);
    const contentClass = classNames(
      `${this.prefixCls}-content`,
      {
        [`${this.prefixCls}-transitions`]: isBack
      });
    const styles = {
      transform: `translate3d(0, ${moveY}px, 0)`,
      ...style,
    };
    return (<div className={wrapClass} ref={(el: any) => this.$el = el}>
      <div className={`${this.prefixCls}-content-wrapper`}>
        <div
          className={contentClass}
          style={styles}
        >
          {isRefresh ? this.renderTopPull(): ''}
          {children}
          {this.renderBottomPull()}
        </div>
      </div>
    </div>);
  }
}

export default PullToRefreshNormal;
