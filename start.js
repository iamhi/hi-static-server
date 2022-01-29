const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

global.appRoot = path.resolve(__dirname);

const esmRequire = require('esm')(module, { cjs: { topLevelReturn: true }})
esmRequire('module-alias/register');
esmRequire('./src/server.js')
