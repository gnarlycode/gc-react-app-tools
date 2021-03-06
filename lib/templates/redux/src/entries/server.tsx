import React from 'react'
import Helmet from 'react-helmet'
import { RequestHandler } from 'express'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter, StaticRouterContext } from 'react-router'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import { ServerStyleSheet } from 'styled-components'
import { routes } from 'routes'
import { makeStore } from 'data/store'
import { Html } from 'components/Layout/Html'
import { getDataFetchers } from '@gnarlycode/react-route-fetch'
import unwrapStats from '@gnarlycode/react-app-tools/helpers/unwrap-stats'

export default (allstats: any): RequestHandler => async (req, res, next) => {
  try {
    const { scripts } = unwrapStats(allstats)
    const routerContext: StaticRouterContext = {}
    const sheet = new ServerStyleSheet()
    const store = makeStore({})

    await getDataFetchers(req.url, routes, store)

    // Render App
    const markup = renderToString(
      sheet.collectStyles(
        <Provider store={store}>
          <StaticRouter location={req.url} context={routerContext}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>,
      ),
    )

    // Render Html
    const html = renderToStaticMarkup(
      <Html
        helmet={Helmet.renderStatic()}
        initialState={store.getState()}
        markup={markup}
        scripts={scripts}
        styleEl={sheet.getStyleElement()}
      />,
    )

    // Response
    if (routerContext.url) {
      res.writeHead(302, { Location: routerContext.url })
      res.end()
    } else {
      res.send(`<!doctype html>${html}`)
    }
  } catch (err) {
    next(err)
  }
}
