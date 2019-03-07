/**
 * 判断是否为undefined
 * @param val
 */
export function isUndef(val: any) {
  return val === null || typeof val === 'undefined';
}

/**
 * 判断是否为空，包括undefined
 * @param val
 */
export function isBlank(val: any) {
  return isUndef(val) || val === '' || val.toString().trim() === '';
}

/**
 * 判断对象是否为空对象
 * @param obj
 */
export function isEmptyObject(obj: any) {
  return !obj || Object.keys(obj).length <= 0;
}

/**
 * 判断是否为函数
 * @param value
 */
export function isFunction(value: any) {
  return Object.prototype.toString.call(value) === '[object Function]';
}