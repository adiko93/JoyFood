// next.config.js
const withAntdLess = require("next-plugin-antd-less");
const withPlugins = require("next-compose-plugins");

const pluginAntdLess = withAntdLess({
  // optional
  modifyVars: {
    "@primary-color": "#FA9400",
    "@link-color": "#FA9400",
    "@font-size-base": "14px",
    "@font-family": '"Open Sans", sans-serif',
    "@rate-star-bg": "#DFDFDF",
  },
  lessVarsFilePath: "./styles/variables.less",

  lessVarsFilePathAppendToEndOfContent: false,
  //   // optional https://github.com/webpack-contrib/css-loader#object
  //   cssLoaderOptions: {},
  cssLoaderOptions: {
    // ...
    mode: "local",
    exportOnlyLocals: false,
    // ...
    getLocalIdent: (context, localIdentName, localName, options) => {
      return "whatever_random_class_name";
    },
  },
  nextjs: {
    localIdentNameFollowDev: true, // default false, for easy to debug on PROD mode
  },
  // Other Config Here...
});

module.exports = withPlugins([[pluginAntdLess]], {
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    return config;
  },
  images: {
    domains: [
      "localhost",
      "localhost:8055",
      "joyfood.ga",
      "joyfood.ga:8055",
      "admin.joyfood.ga",
    ],
  },
  // images: {
  //   disableStaticImages: true,
  // },
  // NextFuture
  // future: {
  //   webpack5: true,
  // },
});
