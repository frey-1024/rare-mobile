/**
 * 判断是移动设备还是PC
 */
export function isMobile() {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent);
}

export function isUndef(val: any) {
  return val === null || typeof val === 'undefined';
}

export function isBlank (val: any) {
  return isUndef(val) || val === '' || val.toString().trim() === '';
}

export function isAllBlank(...args: any[]) {
  return args.every(arg => isBlank(arg));
}
export function isAllFull(...args: any[]) {
  return args.every(arg => !isBlank(arg));
}



export function isEmptyObject (obj: any) {
  return !obj || Object.keys(obj).length <= 0;
}

export function isEmptyArray (obj: any) {
  return !obj || obj.length <= 0;
}

const objToString = Object.prototype.toString;
export function isObject(obj: any) {
  return objToString.call(obj) === '[object Object]';
}
export function isArray(obj:any) {
  return objToString.call(obj) === '[object Array]';
}
