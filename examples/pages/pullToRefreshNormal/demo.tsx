import React from 'react';
import { PullToRefreshNormal } from 'rate-mobile/index';
import './styles/demo.scss';

interface PullToRefreshNormalProps extends RouteProps{

}

interface PullToRefreshNormalState {
  list: Array<any>,
  initLoading: boolean
}

export default class PullToRefreshNormalDemo extends React.Component<PullToRefreshNormalProps, PullToRefreshNormalState> {
  constructor(props: PullToRefreshNormalProps) {
    super(props);
    this.state = {
      list: [],
      initLoading: true,
    };
  }
  componentDidMount() {
    // 模拟首次加载
    setTimeout(() => {
      this.setState({
        list: this.getList(true),
        initLoading: false,
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
      this.setState({
        list: this.getList(true),
      });
      event.done();
    }, 2000);
  }
  loaderMoreContent(event: any) {
    event.doing();
    // 模拟刷新列表
    setTimeout(() => {
      this.setState({
        list: this.getList(false),
      });
      event.done();
    }, 2000);
  }
  render() {
    const {list, initLoading} = this.state;
    return <div>
      <PullToRefreshNormal
        isRefresh
        style={{height: document && document.documentElement && document.documentElement.clientHeight}}
        custom={{
          content: '加载中...',
          className: '',
          type: 'init', // init, complete
          isShow: initLoading
        }}
        onRefresh={(event: any) => this.refreshContent.call(this, event)}
        onLoaderMore={(event: any) => this.loaderMoreContent.call(this, event)}
      >
        <ul className="pull-to-refresh-list">
          {list.map((item: any) => (<li key={item.val}>{item.val}</li>))}
        </ul>
      </PullToRefreshNormal>
    </div>;
  }
}
