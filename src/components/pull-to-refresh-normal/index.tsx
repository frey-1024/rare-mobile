import React from 'react';
import classNames from 'classnames';

interface PullProps {
  className: string,
  damping: number,
  distanceToRefresh: number,
  text: React.ReactNode,
  activeText: React.ReactNode,
  loadingText: React.ReactNode,
  finishText: React.ReactNode,
}

interface CustomProps {
  content: React.ReactNode,
  className: string,
  type: 'init' | 'complete',
  isShow: boolean
}

interface PullToRefreshNormalProps {
  className?: string;
  defaultClass?: string;
  isRefresh?: boolean,
  topPull?: PullProps,
  bottomPull?: PullProps,
  custom?: CustomProps,
  style?: any,
  onRefresh?: (event: any) => void,
  onLoaderMore?: (event: any) => void,
}

interface PullToRefreshNormalState {
  moveY: number, // 移动垂直距离
  isBack: boolean // 是否返回到原来的位置，加入translate动画
  currentStatus: 'WILL' | 'DOING' | 'DONE',
  direction: string, // 移动方向
}

const TOP_PULL = {
  damping: 150,
  distanceToRefresh: 35,
  text: '下拉可以刷新',
  activeText: '释放立即刷新',
  loadingText: '刷新中...',
  finishText: '刷新成功',
};
const BOTTOM_PULL = {
  damping: 150,
  distanceToRefresh: 35,
  text: '上拉可以加载',
  activeText: '释放立即加载',
  loadingText: '加载中...',
  finishText: '加载成功',
};

class PullToRefreshNormal extends React.Component<PullToRefreshNormalProps, PullToRefreshNormalState> {

  static defaultProps = {
    defaultClass: 'rt-pull-normal',
    isRefresh: false,
  };

  constructor(props: PullToRefreshNormalProps) {
    super(props);
    this.state = {
      moveY: 0,
      isBack: false,
      currentStatus: 'WILL',
      direction: ''
    };
  }
  componentDidMount() {
    this.$el.addEventListener('touchstart', this.handleTouchStart.bind(this), {passive: true});
    this.$el.addEventListener('touchmove', this.handleTouchMove.bind(this), {passive: true});
    this.$el.addEventListener('touchend', this.handleTouchEnd.bind(this), {passive: true});
  }
  componentWillUnmount() {
    this.$el.removeEventListener('touchstart', this.handleTouchStart.bind(this), {passive: true});
    this.$el.removeEventListener('touchmove', this.handleTouchMove.bind(this), {passive: true});
    this.$el.removeEventListener('touchend', this.handleTouchEnd.bind(this), {passive: true});
  }

  private prefixCls: string = 'rt-pull-normal';
  private startY: number;
  private topPullIndicator: any;
  private bottomPullIndicator: any;

  renderPullStatus(indicator: PullProps, className: string) {
    const {moveY, currentStatus, isBack} = this.state;
    const topTextClass = classNames(className, indicator.className);
    if (this.isDoing()) {
      return <p className={topTextClass}>{indicator.loadingText}</p>;
    }
    // 触发刷新/加载
    if (Math.abs(moveY) >= indicator.distanceToRefresh && !isBack) {
      return <p className={topTextClass}>{indicator.activeText}</p>;
    }
    if (currentStatus === 'DONE') {
      return <p className={topTextClass}>{indicator.finishText}</p>;
    }
    return <p className={topTextClass}>{indicator.text}</p>;
  }
  renderTopPull() {
    if (this.state.direction === 'DOWN') {
      return '';
    }
    return this.renderPullStatus(this.topPullIndicator, `${this.prefixCls}-top-text`);
  }
  renderBottomPull() {
    if (this.state.direction === 'UP') {
      return '';
    }
    return this.renderPullStatus(this.bottomPullIndicator, `${this.prefixCls}-bottom-text`);
  }
  renderCustom() {
    const {custom} = this.props;
    if (!custom || !custom.isShow) {
      return '';
    }
    const customClass = classNames(`${this.prefixCls}-custom`, custom.className, {
      [`${this.prefixCls}-custom-init`]: custom.type === 'init',
      [`${this.prefixCls}-custom-complete`]: custom.type === 'complete',
    });
    return <div className={customClass}>{custom.content}</div>;
  }
  doing() {
    this.setState({
      currentStatus: 'DOING',
      isBack: true
    });
  }
  done() {
    this.setState({
      currentStatus: 'DONE',
      moveY: 0,
      isBack: true,
    });
  }
  isDoing() {
    return this.state.currentStatus === 'DOING';
  }
  handleTouchStart(event: any) {
    if (this.isDoing()) {
      return;
    }
    const touch = event.changedTouches[0];
    this.startY = touch.pageY;
    this.setState({
      isBack: false,
      currentStatus: 'WILL'
    });
  }
  isScrollRange() {
    const elScrollTop = this.$el.scrollTop;
    const elScrollHeight = this.$el.scrollHeight;
    const elOffsetHeight = this.$el.offsetHeight;
    if (elScrollTop <= 0 || (elScrollTop + elOffsetHeight >= elScrollHeight)) {
      return false;
    }
    return true;
  }
  getMoveYInfo(moveY: number, diff: number) {
    const ratio = Math.abs(diff) / window.screen.height;
    const dy = (1 - ratio) * diff * 0.55 + moveY;
    if (dy > 0) {
      return {
        moveY: dy > this.topPullIndicator.damping ? this.topPullIndicator.damping : dy,
        direction: 'UP'
      };
    }
    if (dy < 0) {
      return {
        moveY: dy > this.bottomPullIndicator.damping ? -this.bottomPullIndicator.damping : dy,
        direction: 'DOWN'
      };
    }
    return {
      moveY: dy,
      direction: ''
    };
  }
  handleTouchMove(event: any) {
    if (this.isDoing()) {
      return;
    }
    const touch = event.changedTouches[0];
    if (!this.isScrollRange()) {
      const moveYInfo = this.getMoveYInfo(this.state.moveY, touch.pageY - this.startY);
      this.setState({
        moveY: moveYInfo.moveY,
        direction: moveYInfo.direction
      });
    }
    this.startY = touch.pageY;
  }
  handleTouchEnd() {
    if (this.isDoing()) {
      return;
    }
    const {moveY} = this.state;
    const {onRefresh, onLoaderMore} = this.props;
    // 下拉
    if (moveY > 0) {
      // 移动距离小于触发刷新的下拉高度, 恢复到原来位置，不做处理
      if (moveY < this.topPullIndicator.distanceToRefresh) {
        this.setState({
          moveY: 0,
          isBack: true,
        });
      } else {
        this.setState({
          moveY: this.topPullIndicator.distanceToRefresh,
          isBack: true,
        });
        if (onRefresh) {
          onRefresh({doing: this.doing.bind(this), done: this.done.bind(this)});
        }
      }
    } else if (moveY < 0) {
      if (Math.abs(moveY) < this.bottomPullIndicator.distanceToRefresh) {
        this.setState({
          moveY: 0,
          isBack: true,
        });
      } else {
        this.setState({
          moveY: -this.bottomPullIndicator.distanceToRefresh,
          isBack: true,
        });
        if (onLoaderMore) {
          onLoaderMore({doing: this.doing.bind(this), done: this.done.bind(this)});
        }
      }
    }
  }
  private $el: any;
  render() {
    const {className, defaultClass, children, isRefresh, style} = this.props;
    this.topPullIndicator = {...TOP_PULL, ...this.props.topPull};
    this.bottomPullIndicator = {...BOTTOM_PULL, ...this.props.bottomPull};
    const {moveY, isBack} = this.state;
    const wrapClass = classNames(defaultClass, className);
    const contentClass = classNames(
      `${this.prefixCls}-content`,
      {
        [`${this.prefixCls}-transitions`]: isBack
      });
    const styles = {
      transform: `translate3d(0, ${moveY}px, 0)`,
    };
    return (<div style={style} className={wrapClass} ref={(el: any) => this.$el = el}>
      <div className={`${this.prefixCls}-content-wrapper`}>
        <div
          className={contentClass}
          style={styles}
        >
          {isRefresh ? this.renderTopPull(): ''}
          {children}
          {this.renderCustom()}
          {this.renderBottomPull()}
        </div>
      </div>
    </div>);
  }
}

export default PullToRefreshNormal;
