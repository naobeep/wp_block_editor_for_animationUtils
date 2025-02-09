// webpack.config.js
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
  ...defaultConfig,
  entry: {
    'block-animation': './src/block-animation.js',
  },
  externals: {
    ...defaultConfig.externals,
    '@wordpress/blocks': ['wp', 'blocks'],
    '@wordpress/element': ['wp', 'element'],
    '@wordpress/editor': ['wp', 'editor'],
    '@wordpress/components': ['wp', 'components'],
    '@wordpress/compose': ['wp', 'compose'],
    '@wordpress/hooks': ['wp', 'hooks'],
    '@wordpress/i18n': ['wp', 'i18n'],
  },
};
