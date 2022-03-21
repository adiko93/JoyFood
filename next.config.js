const withLess = require("next-with-less");

module.exports = withLess({
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
      "storage.googleapis.com",
    ],
  },
});
