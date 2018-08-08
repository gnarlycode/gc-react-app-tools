<p align="center"><img src="https://github.com/gnarlycode/gnarly-assets/blob/master/gnarly-logo-600.png?raw=true" /></p>

###### _GNARLY CODE_ Presents

# REACT APP TOOLS

## DESIGNED FOR **[CREATE-GNARLY-APP](https://github.com/gnarlycode/create-gnarly-app)**!

Helps to build `universal` or `static` react apps.

## COMMANDS

🕹 **`npm run dev`** — dev server (hot reload, watch mode etc)

🕹 **`npm run build`** — build the app

🕹 **`npm run build-static`** — build the app with static html's

🕹 **`npm start`** — serve builded app

🕹 **`npm run tsint`** — check linter rules

## CONFIG

You can create next files in root of your project to configure builder:

- `gnarly.config.js` — default config
- `gnarly.config.local.js` — local, extends default, do not commit

Available options:

```js
module.exports = {
  // Server listening
  host: '0.0.0.0',
  port: 8080,

  // Url prefix
  baseUrl: '/base-url',

  // For static renderer, used when you run `npm run build-static` or `build-all`
  routerConfig: './src/routes',

  // Serve static with express (do not enable if static served with nginx for example)
  serveStatic: true,

  // Add babel transform runtime
  babelRuntime: true,

  // Browsers list
  browsers: ['last 2 versions', '>= 1%'],
}
```

Also you can create `_env` and `.env` for extra configurations

## CREDITS

[`@gnarlycode/react-route-fetch`](https://github.com/gnarlycode/react-components/tree/master/packages/react-route-fetch)
[`@gnarlycode/react-scroll-state`](https://github.com/gnarlycode/react-components/tree/master/packages/react-scroll-state)
[`awesome-typescript-loader`](https://github.com/s-panferov/awesome-typescript-loader)
[`babel`](https://babeljs.io/)
[`commander`](https://github.com/tj/commander.js)
[`dotenv-webpack`](https://github.com/mrsteele/dotenv-webpack)
[`dotenv`](https://github.com/motdotla/dotenv)
[`express`](https://expressjs.com/)
[`inquirer`](https://github.com/SBoudrias/Inquirer.js/)
[`react-helmet`](https://github.com/nfl/react-helmet)
[`react-hot-loader`](https://github.com/gaearon/react-hot-loader)
[`react-router`](https://reactjs.org/)
[`react`](https://reactjs.org/)
[`redux`](https://redux.js.org/)
[`styled-components`](https://www.styled-components.com/)
[`svg-react-loader`](https://github.com/jhamlet/svg-react-loader)
[`tslint`](https://palantir.github.io/tslint/)
[`typescript`](https://www.typescriptlang.org)
[`webpack-hot-server-middleware`](https://www.npmjs.com/package/webpack-hot-server-middleware)
[`webpack`](https://webpack.js.org/)

###### Author: Dmitry Podlesny
