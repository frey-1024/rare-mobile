import React from 'react';
import ReactDOM from "react-dom";
import { PullToRefreshNormal } from 'rate-mobile/index';
import './styles/demo.scss';

interface PullToRefreshNormalProps extends RouteProps{

}

interface CustomProps {
  content: React.ReactNode,
  className?: string,
  type: 'init' | 'complete',
  isShow: boolean
}

interface PullToRefreshNormalState {
  list: Array<any>,
  custom: CustomProps,
  height: number
}

export default class PullToRefreshNormalDemo extends React.Component<PullToRefreshNormalProps, PullToRefreshNormalState> {
  private scrollEl: any;
  constructor(props: PullToRefreshNormalProps) {
    super(props);
    this.state = {
      list: [],
      custom: {
        content: '加载中...',
        type: 'init',
        isShow: true
      },
      height: (document && document.documentElement && document.documentElement.clientHeight) || 100,
    };
  }
  componentDidMount() {
    let height = this.state.height;
    const scrollEl = ReactDOM.findDOMNode(this.scrollEl);
    if (scrollEl) {
      height -= (scrollEl as HTMLElement).offsetTop;
    }
    // 模拟首次加载
    setTimeout(() => {
      this.setState({
        height,
        list: this.getList(true),
        custom: {
          content: '加载中...',
          type: 'init',
          isShow: false
        },
      });
    }, 2000);
  }
  getList(isRefresh: boolean) {
    const list = isRefresh ? [] : ((this.state && this.state.list) || []);
    for (let i = list.length, l = i + 18; i < l; i++) {
      list.push({val: i});
    }
    return list;
  }
  refreshContent(event: any) {
    event.doing();
    // 模拟刷新列表
    setTimeout(() => {
      const list = this.getList(true);
      this.setState({
        list,
        custom: {
          content: '已经加载完',
          type: 'complete',
          isShow: list.length > 50
        }
      });
      event.done();
    }, 2000);
  }
  loaderMoreContent(event: any) {
    event.doing();
    // 模拟刷新列表
    setTimeout(() => {
      const list = this.getList(false);
      this.setState({
        list,
        custom: {
          content: '已经加载完',
          type: 'complete',
          isShow: list.length > 50
        }
      });
      event.done();
    }, 2000);
  }
  render() {
    const {list, custom, height} = this.state;
    return (
      <PullToRefreshNormal
        ref={(el: any) => this.scrollEl = el}
        isRefresh
        style={{height: height}}
        custom={custom}
        onRefresh={(event: any) => this.refreshContent.call(this, event)}
        onLoaderMore={(event: any) => this.loaderMoreContent.call(this, event)}
      >
        <ul className="pull-to-refresh-list">
          {list.map((item: any) => (<li key={item.val}>{item.val}</li>))}
        </ul>
      </PullToRefreshNormal>
    );
  }
}
