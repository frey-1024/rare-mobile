import lazyLoad from '@/components/LazyLoad';
import {pullToRefreshNormalDocRouters, pullToRefreshNormalDemoRouters} from '../pages/components/pullToRefreshNormal/router';
import {inputNumberDocRouters, inputNumberDemoRouters} from '../pages/components/inputNumber/router';
import {shiftNavDocRouters, shiftNavDemoRouters} from '../pages/components/shiftNav/router';
import {introduceDocRouters} from '../pages/introduce/router';
import {homeDocRouters, homeDemoRouters} from '../pages/home/router';

// 文档所有路由
const docRouters = [
  ...introduceDocRouters,
  ...homeDocRouters,
  ...pullToRefreshNormalDocRouters,
  ...inputNumberDocRouters,
  ...shiftNavDocRouters,
];

// 文档所有路由
const demoRouters = [
  ...homeDemoRouters,
  ...pullToRefreshNormalDemoRouters,
  ...inputNumberDemoRouters,
  ...shiftNavDemoRouters,
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
