import React from 'react';
import Loadable from 'react-loadable';
import LoadingBar from './LoadingBar';

export default function lazyLoad(url: string){
  console.log(`@/${url}.tsx`);
  return Loadable({
    loader: () => import(`@/${url}.tsx`).then((rest) => {
      console.log(rest);
      return rest;
    }),
    loading(props: any) {
      console.log(props);
      if (props.error) {
        throw props.error;
      }
      return (<LoadingBar/>);
    },
  });
}
