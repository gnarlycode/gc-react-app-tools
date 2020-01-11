#!/usr/bin/env node

require('../lib/load-env')

const express = require('express')
const errorhandler = require('errorhandler')
const { requireOrError } = require('../helpers/require')
const config = require('../lib/config')
const {
  PUBLIC_PATH,
  SERVER_RENDERER_PATH,
  STATIC_PATH,
  STATS_PATH,
} = require('../lib/paths')

if (config.baseUrl) process.env.BASE_URL = config.baseUrl

// Express app
const app = express()

// Static assets serving
if (config.serveStatic) app.use(config.baseUrl, express.static(STATIC_PATH))

// Static or development
if (config.isDev) {
  // Webpack
  app.use(require('../lib/webpack-router'))

  // Error handler
  const getRandomErrorFace = require('../helpers/getRandomErrorFace')
  const pickErrorFace = () => (errorhandler.title = getRandomErrorFace())
  pickErrorFace()
  app.use(errorhandler({ log: pickErrorFace }))
} else {
  // Static assets serving
  if (config.serveStatic) app.use(config.baseUrl, express.static(PUBLIC_PATH))

  // Require stats
  const stats = requireOrError(
    STATS_PATH,
    'Client bundle stats.json not found. Try running `npm run build`',
  )

  // Require server renderer
  const serverRenderer = requireOrError(
    SERVER_RENDERER_PATH,
    'Server bundle error. Try running `npm run build',
  ).default(stats)

  // Server renderer middleware
  app.use(config.baseUrl, serverRenderer)
}

app.listen(config.port, config.host, err => {
  if (err) console.error(err)
  console.info(`\n\n🤖  Listening at http://${config.host}:${config.port}\n`)
})
