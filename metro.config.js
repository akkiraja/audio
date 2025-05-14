const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add additional configuration
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'cjs'];
config.resolver.assetExts = [...config.resolver.assetExts, 'db', 'sqlite'];

// Ensure proper handling of symlinks
config.resolver.enableSymlinks = true;

// Add additional watchFolders if needed
config.watchFolders = [...(config.watchFolders || []), '.'];

// Configure caching
config.cacheStores = [];
config.resetCache = true;

// Configure error handling
config.reporter = {
  ...config.reporter,
  update: () => {},
};

// Configure source map handling
config.transformer = {
  ...config.transformer,
  minifierConfig: {
    ...config.transformer.minifierConfig,
    sourceMap: {
      includeSources: true,
    },
  },
};

module.exports = config;