const path = require('path')
const { HotModuleReplacementPlugin } = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = (env) => {
  let isProduction = (env && env.production)

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.[hash].js'
    },

    plugins: [
      new HotModuleReplacementPlugin(),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html')
      })
    ],

    devServer: {
      hot: true, // Enable hot module replacement.
      overlay: true, // Show an overlay of any build errors in the browser.
      open: true, // Automatically open the browser when dev server is started.
      contentBase: path.resolve(__dirname, 'dist'), // Use dist folder as the root of the web server.
      // Only show that a compile is happening when developing. This hides the module build info spam.
      stats: isProduction ? 'normal' : 'errors-only'
    },

    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|vue)$/,
          use: 'eslint-loader'
        },
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.pug$/,
          use: 'pug-plain-loader'
        },
        {
          test: /\.styl(us)?$/,
          use: ['vue-style-loader', 'css-loader', {
            loader: 'stylus-loader',
            options: {
              import: path.resolve(__dirname, 'src', 'colors.styl')
            }
          }]
        }
      ]
    }
  }
}
