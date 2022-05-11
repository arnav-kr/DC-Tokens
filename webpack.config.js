const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist/umd"),
    filename: "DCToken.js",
    library: "DCT",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|tests)/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.umd.json"
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify"),
    }
  }
};