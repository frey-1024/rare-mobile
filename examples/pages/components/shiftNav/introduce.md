# 数字输入框只能输入数字

支持自定义min, max, disabled, isPositive


@IFRAME@URL = /demo/shift-nav

```javascript
import { InputNumber } from 'rate-mobile';

<InputNumber
   className={className}
   min={0}
   max={100}
   isPositive
   disabled
   value={value}
   onChange={(v: any) => this.valueChange(v)}
 />
```
## 参数说明

| 属性 | 默认值 | 参数类型 | 用法说明 |
| ------ | ------ | ------ | ------ |
| className | 输入框默认样式 | class样式名 | 输入框自定义样式 |
| min | 无 | string/number的数字 | 输入框输入的最小值， 没有将不限制 |
| max | 无 | string/number的数字 | 输入框输入的最大值， 没有将不限制 |
| isPositive | false | boolean | 输入框只能输入整数，默认可以输入浮点型 |
| disabled | false | boolean | 输入框是否disabled |
| value | 空 | string/number的数字 | 输入框的值 |
| onChange | / | 函数 | 输入框的值发生改变时，执行的回调函数 |

## 注意
无

