// @ts-check
// Learn more https://docs.expo.io/guides/customizing-metro
// const {getDefaultConfig} = require('expo/metro-config');
const {getSentryExpoConfig} = require('@sentry/react-native/metro');

const path = require("path");

const config = getSentryExpoConfig(__dirname);

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "./");

// #1 - Watch all files in the monorepo
config.watchFolders = [workspaceRoot];

config.resolver = config.resolver || {};

// #3 - Force resolving nested modules to the folders below
config.resolver.disableHierarchicalLookup = true;
// #2 - Try resolving with project modules first, then workspace modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

config.resolver.resolverMainFields = [
  "ui.source",
  "react-native",
  "browser",
  "main",
];

// config.watcher = config.watcher || {};

config.watcher.additionalExts = config.watcher.additionalExts || [];

config.watcher.watchman = config.watcher.watchman || {};

// Add support for react-native-svg-transformer
config.transformer = {
  ...config.transformer,
  workerPath: require.resolve("metro/src/DeltaBundler/Worker"),
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
  minifierConfig: {
    keep_classnames: true, // Preserve class names
    keep_fnames: true, // Preserve function names
    mangle: {
      keep_classnames: true, // Preserve class names
      keep_fnames: true, // Preserve function names
    },
  },
};

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...config.resolver.sourceExts, "svg"],
};

module.exports = config;
