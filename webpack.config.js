const { resolve } = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  plugins: [
    // new BundleAnalyzerPlugin(),
    // new MinifyPlugin()
  ],
  entry: ['babel-polyfill', './app/main'],
  output: {
    publicPath: '/',
    chunkFilename: './modules/[name].[chunkhash].js',
    path: resolve(__dirname, './public'),
    filename: './modules/bundle.js'
  },
  mode: 'development',
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts','.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: (inputFile)=>{
          let thisTest = /\.tsx?$/.test(inputFile) && !(/\.test.tsx?$/.test(inputFile))
          return thisTest
        },
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          // context: __dirname,
          transpileOnly: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'mute',
          // experimentalWatchApi: true,
          configFile: resolve(__dirname,'tsconfig.webpack.json'),
        }
      },
      {
        test: /jsx?$/,
        include: resolve(__dirname, './app'),
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      }
    ]
  }
}