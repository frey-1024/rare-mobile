import React from 'react';
import classNames from 'classnames';

interface PullProps {
  className?: string,
  damping?: number,
  distanceToRefresh?: number,
  text?: React.ReactNode,
  activeText?: React.ReactNode,
  loadingText?: React.ReactNode,
  finishText?: React.ReactNode,
}

interface CustomProps {
  content: React.ReactNode,
  className?: string,
  type: 'init' | 'complete',
  isShow: boolean
}

interface PullToRefreshNormalProps {
  className?: string;
  contentClassName?: string;
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
  isBack: boolean, // 是否返回到原来的位置，加入translate动画
  currentStatus: 'WILL' | 'DOING' | 'DONE', // 当前滑动状态
  direction: string, // 移动方向
}

const TOP_PULL = {
  damping: 150,
  distanceToRefresh: 40,
  text: '下拉可以刷新',
  activeText: '释放立即刷新',
  loadingText: '刷新中...',
  finishText: '刷新成功',
};
const BOTTOM_PULL = {
  damping: 150,
  distanceToRefresh: 40,
  text: '上拉可以加载',
  activeText: '释放立即加载',
  loadingText: '加载中...',
  finishText: '加载成功',
};

let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get() {
      supportsPassive = true;
    },
  });
  window.addEventListener('test', null as any, opts);
} catch (e) {
  // empty
}
const willPreventDefault = supportsPassive ? { passive: false } : false;

class PullToRefreshNormal extends React.Component<PullToRefreshNormalProps, PullToRefreshNormalState> {

  static defaultProps = {
    isRefresh: false,
    topPull: {},
    bottomPull: {},
    custom: {
      content: '加载中...',
      type: 'init',
      isShow: false
    } as CustomProps
  };

  private $el: any;
  private prefixCls = 'rt-pull-normal';
  private startY: number;
  private topPullIndicator: any;
  private bottomPullIndicator: any;

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
    this.$el.addEventListener('touchstart', this.handleTouchStart.bind(this), willPreventDefault);
    this.$el.addEventListener('touchmove', this.handleTouchMove.bind(this), willPreventDefault);
    this.$el.addEventListener('touchend', this.handleTouchEnd.bind(this), willPreventDefault);
  }
  componentWillUnmount() {
    this.$el.removeEventListener('touchstart', this.handleTouchStart.bind(this), willPreventDefault);
    this.$el.removeEventListener('touchmove', this.handleTouchMove.bind(this), willPreventDefault);
    this.$el.removeEventListener('touchend', this.handleTouchEnd.bind(this), willPreventDefault);
  }
  doing(moveY: number) {
    this.setState({
      currentStatus: 'DOING',
      moveY,
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
  isRefuseMove() {
    const {currentStatus} = this.state;
    if (currentStatus === 'DOING') {
      return true;
    }

    const {custom} = this.props;
    if (!custom || !custom.isShow) {
      return false;
    }

    return custom.type === 'init';
  }
  isComplete() {
    const {custom} = this.props;
    return custom && custom.isShow && custom.type === 'complete';
  }
  isScrollRange(moveYInfo: any) {
    const elScrollTop = this.$el.scrollTop;
    const elScrollHeight = this.$el.scrollHeight;
    const elOffsetHeight = this.$el.offsetHeight;
    if (elScrollTop <= 0) {
      // 这里加入 elOffsetHeight !== elScrollHeight 是为了解决当容器内容总高度没有超出容器高度时，
      // 如果数据没有加载完， 可以继续滑动加载
      return moveYInfo.direction === 'UP' && elOffsetHeight !== elScrollHeight;
    }
    if (elScrollTop + elOffsetHeight >= elScrollHeight) {
      return moveYInfo.direction === 'DOWN';
    }
    return true;
  }
  handleTouchStart(event: any) {
    if (this.isRefuseMove()) {
      return;
    }
    const touch = event.changedTouches[0];
    this.startY = touch.screenY;
    this.setState({
      isBack: false,
      currentStatus: 'WILL',
      direction: '',
    });
  }

  getMoveYInfo(moveY: number, diff: number) {
    const ratio = Math.abs(diff) / window.screen.height;
    const dy = (1 - ratio) * diff * 0.52 + moveY;
    if (dy > 0) {
      const topDamping = this.topPullIndicator.damping;
      return {
        moveY: dy > topDamping ? topDamping : dy,
        direction: 'DOWN'
      };
    }
    if (dy < 0) {
      const bottomDamping = this.bottomPullIndicator.damping;
      return {
        moveY: dy < -bottomDamping ? -bottomDamping : dy,
        direction: 'UP'
      };
    }
    return {
      moveY: dy,
      direction: ''
    };
  }
  handleTouchMove(event: any) {
    const touch = event.changedTouches[0];
    const diff = touch.screenY - this.startY;
    const moveYInfo = this.getMoveYInfo(this.state.moveY, diff);
    if (this.isRefuseMove()) {
      return;
    }
    if (!this.isScrollRange(moveYInfo)) {
      event.preventDefault();

      this.setState({
        moveY: (!this.props.isRefresh && moveYInfo.direction === 'DOWN') ? 0 : moveYInfo.moveY,
        direction: moveYInfo.direction
      });
    }
    this.startY = touch.screenY;
  }
  handleTouchEnd() {
    if (this.isRefuseMove()) {
      return;
    }
    const {moveY} = this.state;
    const {onRefresh, onLoaderMore} = this.props;
    // 下拉
    if (moveY > 0) {
      // 不支持刷新，将不能下拉
      if (!this.props.isRefresh) {
        return;
      }
      const topDistance = this.topPullIndicator.distanceToRefresh;
      if (moveY < topDistance) {
        this.setState({
          moveY: 0,
          isBack: true,
        });
      } else {
        if (onRefresh) {
          onRefresh({doing: () => this.doing.call(this, topDistance), done: this.done.bind(this)});
        }
      }
    } else if (moveY < 0) {
      // 加载完成，将不能再加载，只能滑动
      if (this.isComplete()) {
        this.setState({
          moveY: 0,
          isBack: true,
        });
        return;
      }
      const bottomDistance = this.bottomPullIndicator.distanceToRefresh;
      if (Math.abs(moveY) < bottomDistance) {
        this.setState({
          moveY: 0,
          isBack: true,
        });
      } else {
        if (onLoaderMore) {
          onLoaderMore({doing: () => this.doing.call(this, -bottomDistance), done: this.done.bind(this)});
        }
      }
    }
  }
  renderPullStatus(indicator: any, className: string) {
    const {moveY, currentStatus, isBack} = this.state;
    const topTextClass = classNames(className, indicator.className);
    if (currentStatus === 'DOING') {
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
    if (this.state.direction === 'UP') {
      return '';
    }
    return this.renderPullStatus(this.topPullIndicator, `${this.prefixCls}-top-text`);
  }
  renderBottomPull() {
    if (this.state.direction === 'DOWN' || this.isComplete()) {
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
  render() {
    const {className, contentClassName, children, isRefresh, style} = this.props;
    const {moveY, isBack} = this.state;

    this.topPullIndicator = {...(TOP_PULL as PullProps), ...(this.props.topPull as PullProps)};
    this.bottomPullIndicator = {...(BOTTOM_PULL as PullProps), ...(this.props.bottomPull as PullProps)};

    const wrapClass = classNames(this.prefixCls, className);

    const contentClass = classNames(
      `${this.prefixCls}-content`,
      contentClassName,
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
          {isRefresh ? this.renderTopPull() : ''}
          {children}
          {this.renderCustom()}
          {this.renderBottomPull()}
        </div>
      </div>
    </div>);
  }
}

export default PullToRefreshNormal;
