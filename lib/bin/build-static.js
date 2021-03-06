#!/usr/bin/env node

require('../lib/load-env')

const fs = require('fs-extra')
const path = require('path')
const MockExpressRequest = require('mock-express-request')
const MockExpressResponse = require('mock-express-response')
const ensureDirectoryExistence = require('../helpers/ensureDirectoryExistence')
const config = require('../lib/config')
const {
  BUILD_PATH,
  PUBLIC_PATH,
  SERVER_RENDERER_PATH,
  STATIC_PATH,
  STATS_PATH,
} = require('../lib/paths')

const stats = require(STATS_PATH)
let server = require(SERVER_RENDERER_PATH).default(stats)

// For router case
if (server.stack) {
  server = server.stack.find(layer => '/'.match(layer.regexp)).handle
}

if (fs.pathExistsSync(STATIC_PATH)) {
  fs.copySync(STATIC_PATH, PUBLIC_PATH, () =>
    console.info('Static files copied!'),
  )
}

const processRequest = url => {
  if (url.indexOf(':') !== -1) return
  if (config.baseUrl) url = url.replace(config.baseUrl, '')

  const req = new MockExpressRequest({ url })
  const res = new MockExpressResponse()
  const next = () => {}

  Promise.resolve(server(req, res, next)).then(function() {
    const fileName =
      url !== '*'
        ? `${url}${url.slice(-1) === '/' ? 'index' : ''}.html`
        : '/404.html'
    const fullName = PUBLIC_PATH + fileName
    ensureDirectoryExistence(fullName)
    fs.writeFileSync(fullName, res._getString())
    console.info(`Static created: ${fileName}`)
  })
}

if (config.routerConfig) {
  const { routes } = require(path.resolve(BUILD_PATH, 'routes.js'))

  const processRoutes = routes => {
    routes.forEach(route => {
      if (route.path) processRequest(route.path)
      if (route.routes) processRoutes(route.routes)
    })
  }

  processRoutes(routes)
} else {
  processRequest('/')
}
