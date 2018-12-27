import React, {Component} from 'react';
import s from '../styles/butterbar.scss';

export default class LoadingBar extends Component {
  render() {
    return (
      <div className={`${s.butterbar}`}>
        <span className="bar"/>
      </div>
    );
  };
}
