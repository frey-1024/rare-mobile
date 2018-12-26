import * as React from 'react';
import test from './test.md';
// import {Router, Route} from 'react-router-dom';
// import SideBar from './components/SideBar';
import './app.scss';
import '../src/index.scss';
console.log(test);

export default class App extends React.PureComponent<any> {
  render() {
    return (
      <div className="App height-100">
        <div>
          {test}
        </div>
      </div>
    );
  }
}
