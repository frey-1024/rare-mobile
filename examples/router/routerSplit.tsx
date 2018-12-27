import lazyLoad from '@/components/LazyLoad';
import {pullToRefreshNormalDocRouters, pullToRefreshNormalDemoRouters} from '../pages/pullToRefreshNormal/router';
import {homeDocRouters, homeDemoRouters} from '../pages/home/router';

// 文档所有路由
const docRouters = [
  ...homeDocRouters,
  ...pullToRefreshNormalDocRouters,
];

// 文档所有路由
const demoRouters = [
  ...homeDemoRouters,
  ...pullToRefreshNormalDemoRouters,
];

export function getDocRouters() {
  const result: Array<object> = [];
  docRouters.forEach((item) => {
    result.push(Object.assign({}, item, {
      component: lazyLoad((item.url))
    }));
  });
  return result;
}

export function getDemoRouters() {
  const result: Array<object> = [];
  demoRouters.forEach((item) => {
    result.push(Object.assign({}, item, {
      component: lazyLoad((item.url))
    }));
  });
  return result;
}
