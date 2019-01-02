import React from 'react';
import Loadable from 'react-loadable';
import LoadingBar from './LoadingBar';

export default function lazyLoad(url: string){
  return Loadable({
    loader: () => import(`@/${url}.tsx`).then((rest) => {
      return rest;
    }),
    loading(props: any) {
      if (props.error) {
        throw props.error;
      }
      return (<LoadingBar/>);
    },
  });
}
