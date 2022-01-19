// next.config.js
const withAntdLess = require("next-plugin-antd-less");
const path = require("path");
const lessToJS = require("less-vars-to-js");

module.exports = withAntdLess({
  // optional
  modifyVars: {
    "@primary-color": "#FA9400",
    "@link-color": "#FA9400",
    "@font-size-base": "14px",
    "@font-family": '"Open Sans", sans-serif',
    "@rate-star-bg": "#DFDFDF",
  },
  //   // optional
  //   lessVarsFilePath: "./src/styles/variables.less",
  //   // optional
  //   lessVarsFilePathAppendToEndOfContent: false,
  //   // optional https://github.com/webpack-contrib/css-loader#object
  //   cssLoaderOptions: {},

  // Other Config Here...
  images: {
    domains: [
      "localhost",
      "localhost:8055",
      "joyfood.ga",
      "joyfood.ga:8055",
      "admin.joyfood.ga",
    ],
  },
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    return config;
  },

});
