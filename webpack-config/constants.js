const path = require('node:path');
const fs = require('node:fs');
const dotenvExpand = require('dotenv-expand');
const dotenv = require('dotenv');

const DEV_MODE = 'development';
const PROD_MODE = 'production';

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

const paths = {
  env: resolvePath('.env'),
  root: resolvePath('.'),
  build: resolvePath('build'),
  public: resolvePath('public'),
  html: resolvePath('template.html'),
  src: resolvePath('src'),
  entry: resolvePath('src/index.tsx'),
  tsconfig: resolvePath('tsconfig.json'),
  ui: resolvePath('src/view/ui'),
};

dotenvExpand.expand(dotenv.config({ path: paths.env }));

module.exports = {
  DEV_MODE,
  PROD_MODE,
  EXTS: {
    CSS: /\.css$/,
    CSS_MODULE: /\.module\.css$/,
    SCSS: /\.(scss|sass)$/,
    SCSS_MODULE: /\.module\.(scss|sass)$/,
  },
  paths,
  appTitle: process.env.APP_TITLE || 'Appello App',
};
