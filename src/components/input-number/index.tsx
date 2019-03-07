import React from 'react';
import classNames from 'classnames';
import {isBlank} from "../asset";
import {getNumber} from "../parse";

interface InputNumberProps {
  className?: string,
  disabled?: boolean,
  value?: any,
  min?: number | string | undefined,
  max?: number | string | undefined,
  isPositive?: boolean,
  onChange: (value: string | number) => any
}
export default class InputNumber extends React.Component<InputNumberProps> {
  static defaultProps = {
    value: ''
  };
  private _min: any;
  private _max: any;
  private _isPositive: boolean;
  private prefixCls: string = 'rt-input-number';

  constructor(props: InputNumberProps) {
    super(props);
    const { min, max, isPositive } = this.props;
    this._min = getNumber(min);
    this._max = getNumber(max);
    this._isPositive = isPositive || false;
  }
  componentDidUpdate(prevProps: InputNumberProps) {
    const { min: prevMin, max: prevMax, isPositive: prevIsPositive } = prevProps;
    const { min: nextMin, max: nextMax, isPositive: nextIsPositive } = this.props;
    if (prevMin !== nextMin) {
      this._min = nextMin;
    }
    if (prevMax !== nextMax) {
      this._max = nextMax;
    }
    if (prevIsPositive !== nextIsPositive) {
      this._isPositive = !!nextIsPositive;
    }
  }

  callBack = (value: string | number) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };
  onValueChange = (nextValue: any) => {
    if (isBlank(nextValue)) {
      this.callBack(nextValue);
      return;
    }
    // 缓存上次的value
    const prevValue = this.props.value;
    const reg = /^-$|(^(-?\d+)(\.\d*)?)$/;
    if (!reg.test(nextValue)) {
      this.callBack(prevValue);
      return;
    }
    // 0开头后面直接是数字，没有点如：011， 这是不合法的
    const zeroReg = /^0\d+$/;
    if (zeroReg.test(nextValue)) {
      this.callBack(0);
      return;
    }
    const min = this._min;
    const max = this._max;
    if (!isBlank(min)) {
      if (min > nextValue) {
        this.callBack(prevValue);
        return;
      }
      // 如果min>= 0, 将阻止输入-
      if (min >= 0 && nextValue.indexOf('-') > -1) {
        this.callBack('');
        return;
      }
    }
    if (!isBlank(max) && max < nextValue) {
      this.callBack(prevValue);
      return;
    }
    const isPositive = this._isPositive;
    const valueStr = nextValue.toString();
    if (isPositive && valueStr.indexOf('.') > -1) {
      this.callBack(prevValue);
      return;
    }
    this.callBack(nextValue);
  };

  render() {
    const { value, className, disabled = false } = this.props;
    const inputControl = classNames(this.prefixCls, className, {
      disabled: disabled
    });
    return (
      <input type="text" disabled={disabled} className={inputControl} value={value} onChange={(event) => this.onValueChange(event.target.value)} />
    );
  }
}