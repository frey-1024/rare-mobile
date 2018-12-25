import * as React from 'react';
// import {Router, Route} from 'react-router-dom';
import SideBar from './components/SideBar';
import './app.scss';
import '../src/index.scss';

export default class App extends React.PureComponent {
  render() {
    return (
      <div className="App height-100">
        <div>
          <SideBar/>
        </div>
      </div>
    );
  }
}
