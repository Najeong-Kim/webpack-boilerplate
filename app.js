const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config.js");
const compiler = webpack(webpackConfig);

const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
  })
);

app.set("port", 3000);

app.get("/", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "dist/index.html"));
});

app.listen(app.get("port"), () => {
  console.log("http://localhost:" + app.get("port"));
});
