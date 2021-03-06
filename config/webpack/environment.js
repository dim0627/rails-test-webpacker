const { environment } = require('@rails/webpacker')

environment.config.merge({
  output: {
    filename: '[name].[contenthash:8].js',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        // @see https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            return `npm.${packageName.replace('@', '')}`;
          },
          priority: 10,
        },
        // libs: {
        //   test: /app\/frontend\/src\/javascripts\/libs/,
        //   name: 'libs',
        //   priority: 1,
        // },
        // 'css-vendor': {
        //   test: /app\/frontend\/src\/stylesheets\/vendor\.scss/,
        //   name: "css-vendor",
        // }
      },
    }
  },
  devtool: false,
})

module.exports = environment
