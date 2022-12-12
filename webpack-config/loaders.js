const ReactRefreshTypeScript = require('react-refresh-typescript');
const { DEV_MODE, PROD_MODE, EXTS, paths } = require('./constants');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function createTsLoader({ env }) {
  return {
    test: /\.[jt]sx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [env === DEV_MODE && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: true,
        },
      },
    ],
  };
}

function createCssLoader({ env }) {
  return {
    test: EXTS.CSS,
    exclude: EXTS.CSS_MODULE,
    use: getStyleLoaders({
      cssOptions: {
        importLoaders: 2,
        sourceMap: env === DEV_MODE,
        modules: {
          mode: 'icss',
        },
      },
    }),
    sideEffects: true,
  };
}

function createScssLoader({ env }) {
  return {
    test: EXTS.SCSS,
    exclude: EXTS.SCSS_MODULE,
    use: getStyleLoaders({
      env,
      preProcessor: 'sass-loader',
      cssOptions: {
        importLoaders: 3,
        sourceMap: env === DEV_MODE,
        modules: {
          mode: 'icss',
        },
      },
    }),
    sideEffects: true,
  };
}

function createCssModuleLoader({ env }) {
  return {
    test: EXTS.CSS_MODULE,
    use: getStyleLoaders({
      env,
      cssOptions: {
        importLoaders: 2,
        sourceMap: env === DEV_MODE,
        modules: {
          mode: 'local',
          localIdentName: env === PROD_MODE ? '[hash:base64:5]' : '[local]__[hash:base64:5]',
          getLocalIdent: (_context, _localIdentName, localName) => {
            if (localName === 'dark') return 'dark';
          },
        },
      },
    }),
  };
}

function createScssModuleLoader({ env }) {
  return {
    test: EXTS.SCSS_MODULE,
    use: getStyleLoaders({
      env,
      preProcessor: 'sass-loader',
      cssOptions: {
        importLoaders: 3,
        sourceMap: env === DEV_MODE,
        modules: {
          mode: 'local',
          localIdentName: env === PROD_MODE ? '[hash:base64:5]' : '[local]__[hash:base64:5]',
          getLocalIdent: (_context, _localIdentName, localName) => {
            if (localName === 'dark') return 'dark';
          },
        },
      },
    }),
  };
}

function createImageLoader({ env }) {
  return {
    test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'images/[hash][ext][query]',
    },
  };
}

function createFontLoader({ env }) {
  return {
    test: /\.(?:woff(2)?|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[hash][ext][query]',
    },
  };
}

function getStyleLoaders({ cssOptions, preProcessor, env }) {
  const loaders = [
    env === PROD_MODE ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: 'css-loader',
      options: cssOptions,
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          ident: 'postcss',
          config: false,
          plugins: [
            'tailwindcss',
            'postcss-flexbugs-fixes',
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              },
            ],
          ],
        },
        sourceMap: env === DEV_MODE,
      },
    },
  ].filter(Boolean);

  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: env === DEV_MODE,
          root: paths.src,
        },
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: env === DEV_MODE,
        },
      },
    );
  }

  return loaders;
}

module.exports = {
  createTsLoader,
  createCssLoader,
  createScssLoader,
  createCssModuleLoader,
  createScssModuleLoader,
  createImageLoader,
  createFontLoader,
};
