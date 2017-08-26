
require('babel-register');

import express from 'express'
import login from './router/login'
import ajax from './router/ajax'
import {requiredLogin} from './router/middleware'
import {initDB} from './module/database'
const app = express()
const port = process.env.PORT || 3000
initDB()

require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]___[hash:base64:5]'
})


// initalize webpack dev middleware if in development context
if (process.env.NODE_ENV === 'development') {
  let webpack = require('webpack')
  let config = require('../webpack.config')

  let devMiddleware = require('webpack-dev-middleware')
  let hotDevMiddleware = require('webpack-hot-middleware')
  let compiler = webpack(config)
  let devMiddlewareConfig = {
    noInfo: true,
    stats: {colors: true},
    publicPath: config.output.publicPath
  }

  app.use(devMiddleware(compiler, devMiddlewareConfig))
  app.use(hotDevMiddleware(compiler))
}

var cookieParser = require('cookie-parser')

app.use(require('express').static('public'))
app.use('/ajax', ajax)
app.use('/login', login)
app.use(cookieParser())

let serverRender = require('./serverRender')

app.get('*', requiredLogin, serverRender)

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
})