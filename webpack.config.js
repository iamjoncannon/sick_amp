const { resolve } = require('path')

module.exports = {
  plugins: [
    // new BundleAnalyzerPlugin(),
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
        test: /\.tsx?$/,
        exclude: /node_modules/,
        // use: 'ts-loader',
        // loader: require.resolve('ts-loader'),
        loader: 'ts-loader',
        options: {
          // context: __dirname,
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