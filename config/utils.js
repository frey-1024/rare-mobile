const path = require('path');
// 执行node命令时候的文件绝对路径
const root = process.cwd();

/**
 * 从根目录开始获取文件绝对地址路径
 * @param filePath 文件参数
 * @returns {string} 返回绝对路径
 */
function getProjectPath(...filePath) {
  return path.join(root, ...filePath);
}

module.exports = {
  getProjectPath,
};
