const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

module.exports = withPlugins(
  [withImages],
  {
    publicRuntimeConfig: {
      lunisApi: process.env.LUNIS_API,
      socorro: 'scorro'
    },
  }
);
