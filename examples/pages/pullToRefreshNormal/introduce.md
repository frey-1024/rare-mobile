# 普通的滑动加载数据

支持刷新和加载更多，自定义加载样式，更加灵活控制


@IFRAME@URL = /demo/pull-to-refresh-normal

```javascript
import {PullToRefreshNormal} from 'rate-mobile';

<PullToRefreshNormal
    isRefresh
    style={{height: document && document.documentElement && document.documentElement.clientHeight}}
    custom={custom}
    onRefresh={(event: any) => this.refreshContent.call(this, event)}
    onLoaderMore={(event: any) => this.loaderMoreContent.call(this, event)}
>
    <ul className="pull-to-refresh-list">
      {list.map((item: any) => (<li key={item.val}>{item.val}</li>))}
    </ul>
</PullToRefreshNormal>
```

支持刷新和加载更多，自定义加载样式，更加灵活控制
