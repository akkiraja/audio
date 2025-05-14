const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configure source map handling
config.transformer = {
  ...config.transformer,
  minifierConfig: {
    ...config.transformer.minifierConfig,
    sourceMap: false, // Disable source maps to prevent anonymous file issues
  },
  unstable_allowRequireContext: true,
};

// Add additional asset extensions
config.resolver.assetExts = [...config.resolver.assetExts, 'db', 'sqlite'];

// Add additional source extensions
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'cjs'];

// Configure cache
config.cacheStores = [];

module.exports = config;