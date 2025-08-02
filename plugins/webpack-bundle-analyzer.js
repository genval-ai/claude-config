const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = function (context, options) {
  return {
    name: 'webpack-bundle-analyzer-plugin',
    configureWebpack(config, isServer) {
      // Only analyze client-side bundle in production builds
      if (!isServer && process.env.ANALYZE === 'true') {
        return {
          plugins: [
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              reportFilename: '../bundle-report.html',
              openAnalyzer: false,
              generateStatsFile: true,
              statsFilename: '../bundle-stats.json',
              logLevel: 'info'
            }),
          ],
        };
      }
      return {};
    },
  };
};