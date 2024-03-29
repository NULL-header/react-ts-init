import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import packageJSON from "./package.json";
const webpackConfig = (env: {
  production: any;
  development: any;
}): webpack.Configuration => {
  return {
    entry: "./src/index.tsx",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    output: {
      path: path.join(__dirname, "/public"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            configFile: "tsconfig.build.json",
          },
          exclude: /public/,
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { url: false },
            },
          ],
        },
        {
          test: /\.js/,
          enforce: "pre",
          loader: "source-map-loader",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./src/index.html" }),
      new webpack.DefinePlugin({
        "process.env.PRODUCTION": env.production || !env.development,
        "process.env.NAME": JSON.stringify(packageJSON.name),
        "process.env.VERSION": JSON.stringify(packageJSON.version),
      }),
      new ForkTsCheckerWebpackPlugin(),
    ],
  };
};

export default webpackConfig;
