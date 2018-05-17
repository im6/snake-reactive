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
        loader: "ts-loader"
      }
    ]
  },
  devServer: {
    contentBase: "./public",
    hot: true,
  }
};