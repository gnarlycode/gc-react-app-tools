import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { App } from 'components/App'
import { Html } from 'components/Html'
import createServerEntry from '@gnarlycode/react-app-tools/helpers/server-entry'

// Server Middleware
export default createServerEntry(({ scripts, res }) => {
  const sheet = new ServerStyleSheet()
  const markup = renderToString(sheet.collectStyles(<App />))

  // Render Html Block
  const html = renderToString(
    <Html
      markup={markup}
      scripts={scripts}
      styleEl={sheet.getStyleElement()}
    />,
  )

  // Return Markup
  res.write(`<!doctype html>${html}`)

  res.end()
})
