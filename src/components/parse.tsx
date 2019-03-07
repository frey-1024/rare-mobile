/**
 * 获取数字
 * @param number
 * @param isInteger
 */
export function getNumber(number: any, isInteger = false) {
  const val = isInteger ? parseInt(number, 10) : parseFloat(number);
  if (val.toString() === 'NaN') {
    return '';
  }
  return val;
}
