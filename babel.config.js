/**
 * Babel config for BUD MVP.
 *
 * For Amir: react-native-reanimated v4 + the New Architecture requires the
 * `react-native-worklets/plugin` Babel transform to run last. Without it the
 * iOS bundle ships fine but throws "Exception in HostFunction: <unknown>" the
 * moment a worklet function executes. Web bundles work without it because
 * worklets are no-ops on web.
 */

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Must be listed last per the Reanimated 4 docs.
      'react-native-worklets/plugin',
    ],
  };
};
