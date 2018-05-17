module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: ['babel-polyfill', './src/app.ts'],
  resolve:
  {
    extensions: ['.ts', '.js', '.json']
  },
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: "./public",
    hot: true,
  }
};