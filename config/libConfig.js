const path = require('path');
const cwd = process.cwd();

function getProjectPath(...filePath) {
  return path.join(cwd, ...filePath);
}


module.exports = {
  lib: getProjectPath('lib'),
  // appPublic: resolveApp('public'),
  // appHtml: resolveApp('public/index.html'),
  indexJs: getProjectPath('src/index.tsx'),
  // appPackageJson: resolveApp('package.json'),
  // appSrc: resolveApp('src'),
  // appTsConfig: resolveApp('tsconfig.json'),
  // appTsLint: resolveApp('tslint.json'),
  // appTsProdConfig: resolveApp('tsconfig.prod.json'),
  // eslintSrc: resolveApp('src/modules'),
  // yarnLockFile: resolveApp('yarn.lock'),
  // testsSetup: resolveApp('src/setupTests.js'),
  // appNodeModules: resolveApp('node_modules'),
  // publicUrl: getPublicUrl(resolveApp('package.json')),
  // servedPath: getServedPath(resolveApp('package.json')),
};