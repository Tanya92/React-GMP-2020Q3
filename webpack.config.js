const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const babelOptions = (preset) => {
  const opts = {
      presets: [
          '@babel/preset-env',
      ],
      plugins: [
          '@babel/plugin-proposal-class-properties'
      ]
  }

  if (preset) {
      opts.presets.push(preset)
  }

  return opts;
}

const optimization = () => {
  const config = {
      splitChunks: {
          chunks: 'all'
      }
  }

  if (isProd) {
      config.minimize = true;
      config.minimizer = [
          new OptimizeCssAssetsWebpackPlugin(),
          new TerserWebpackPlugin()
      ]
  }

  return config
}

const jsLoaders = () => {
  const loaders = [{
      loader: 'babel-loader',
      options: babelOptions()
  }]

  if (isDev) {
      loaders.push('eslint-loader')
  }

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry:[ '@babel/polyfill', './components/index.jsx' ],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.json', '.png', '.jsx'],
    alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@assets': path.resolve(__dirname, 'src/assets'),
    }},
    optimization: optimization(),
    devServer: {
      port: 3000,
      hot: isDev
    },
    devtool: isDev ? 'source-map': '',
    plugins: [
      new HTMLWebpackPlugin({
        template: './index.html',
        minify: {
          collapseWhitespace: isProd
        }
      }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
          {
              from: path.resolve(__dirname, 'src/assets/favicon.ico'),
              to: path.resolve(__dirname, 'dist/assets')
          }
      ]
    }),
  new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'less-loader' ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: {
            loader: 'babel-loader',
            options: babelOptions('@babel/preset-react')
        }
    },
    ]
  }
}