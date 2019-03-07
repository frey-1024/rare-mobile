import React from 'react';
import { InputNumber } from 'rate-mobile/index';
import './styles/demo.scss';

interface InputNumberState {
  value1: string | number | undefined,
  value2: string | number | undefined,
  value3: string | number | undefined,
  value4: string | number | undefined,
}

export default class InputNumberDemo extends React.Component<RouteProps, InputNumberState> {
  constructor(props: RouteProps) {
    super(props);
    this.state = {
      value1: '',
      value2: '',
      value3: '',
      value4: ''
    };
  }
  valueChange = (value: any, key: string) => {
    // @ts-ignore
    this.setState({
      [key]: value
    });
  };
  render() {
    const {value1, value2, value3, value4} = this.state;
    return (
      <ul className="input-number-wrapper">
        <li>
          <label>普通数字输入框</label>
          <InputNumber
            value={value1}
            onChange={(v: any) => this.valueChange(v, 'value1')}
          />
        </li>
        <li>
          <label>整数数字输入框</label>
          <InputNumber
            isPositive
            value={value2}
            onChange={(v: any) => this.valueChange(v, 'value2')}
          />
        </li>
        <li>
          <label>min 和 max数字输入框</label>
          <InputNumber
            min={0}
            max={100}
            value={value3}
            onChange={(v: any) => this.valueChange(v, 'value3')}
          />
        </li>
        <li>
          <label>min，max 整数数字输入框</label>
          <InputNumber
            min={0}
            max={100}
            isPositive
            value={value4}
            onChange={(v: any) => this.valueChange(v, 'value4')}
          />
        </li>
        <li>
          <label>min，max 整数数字输入框</label>
          <InputNumber
            disabled
            value={11111}
            onChange={(v: any) => this.valueChange(v, 'value4')}
          />
        </li>
      </ul>
    );
  }
}
