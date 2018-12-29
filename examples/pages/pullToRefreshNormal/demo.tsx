import React from 'react';
import { PullToRefreshNormal } from 'rate-mobile/index';
import './styles/demo.scss';

interface PullToRefreshNormalProps extends RouteProps{

}

interface PullToRefreshNormalState {
  list: Array<any>,
  refreshing: boolean
}

export default class PullToRefreshNormalDemo extends React.Component<PullToRefreshNormalProps, PullToRefreshNormalState> {
  constructor(props: PullToRefreshNormalProps) {
    super(props);
    this.state = {
      list: [],
      refreshing: true,
    };
  }
  componentDidMount() {
    // 模拟首次加载
    setTimeout(() => {
      this.setState({
        list: this.getList(),
        refreshing: false,
      });
    }, 2000);
  }
  getList() {
    const list = (this.state && this.state.list) || [];
    for (let i = list.length, l = i + 18; i < l; i++) {
      list.push({val: i});
    }
    return list;
  }
  refreshContent() {
    this.setState({
      refreshing: true,
    });
    // 模拟刷新列表
    setTimeout(() => {
      this.setState({
        list: this.getList(),
        refreshing: false,
      });
    }, 2000);
  }
  render() {
    const {list, refreshing} = this.state;
    return <div>
      <PullToRefreshNormal
        isRefresh
        style={{height: '600px'}}
        refreshing={refreshing}
        onRefresh={this.refreshContent.bind(this)}
      >
        <ul className="pull-to-refresh-list">
          {list.map((item: any) => (<li key={item.val}>{item.val}</li>))}
        </ul>
      </PullToRefreshNormal>
    </div>;
  }
}
