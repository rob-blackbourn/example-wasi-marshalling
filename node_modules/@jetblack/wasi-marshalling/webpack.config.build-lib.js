const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
  const conf = {
    mode: 'development',
    devServer: {
      open: true,
      openPage: ['client/example.html'],
      contentBase: path.join(__dirname, '/'),
      watchContentBase: true,
      port: 8080,
      host: argv.mode === 'production' ? 'localhost' : 'localhost',
      disableHostCheck: true
    },

    entry: {
      'lib/index': ['./src/index.js']
    },
    // library building properties for (3-4)
    output: {
      path: path.join(__dirname, '/'),
      filename: argv.mode === 'production' ? '[name].js' : '[name].develop.js',
      library: 'WasiMarshalling',
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    optimization: {
      minimizer: [new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })]
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader'
        }]
      }]
    }
  }

  if (argv.mode !== 'production') {
    conf.devtool = 'inline-source-map'
  }

  return conf
}
