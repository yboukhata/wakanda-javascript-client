# Wakanda Javascript Client

Minimalist, framework agnostic, JS client to interact with REST API that exposes a
standard and easy to use JS API.

## Install
Git clone this repository then install dependencies. This may not work on Node < 4.0.

```bash
npm install
```

## Run (on web browser)

```bash
npm run webpack-watch
```

On another tab

```bash
gulp serve
```

Then open your browser on `http://localhost:1136/app/index.html`.

## Build (dev)

```bash
npm run webpack-build
```

Bundles are built on `./build/` directory.

You can `require` `wakjsc.node.js` on a Node application, or directly insert
`wakjsc.js` on a `<script>` tag (it's a UMD module) and use `WakJSC` object.

## Unit tests
Unit testing is made with mocha and chai. It directly runs tests against built bundles.
Tests are written in ES5 to avoid useless compilation. There are two modes : one
which runs tests against node bundle, the other against the umd module on PhantomJS with karma.

There also are commands to launch test without rebuilding the bundles.

```bash
#Build and run unit test for karma
npm run test:karma:full

#Run test for karma
npm run test:karma:single

#Build and run unit test for node
npm run test:node:full

#Run test for node
npm run test:node:single

#Build (once) and run test for node and karma
npm run test
```

Karma automatically proxies request on `/rest` to `http://localhost:8081`. For node
test, `WakJSC` module is instancied with `http://localhost:8081` parameter on each
test file.

As PhantomJS doesn't support `CustomEvent` constructor, there is a polyfill on `test`
directory.

## Example

### Node.js
```javascript
var wakjsc = require('./wakjsc.node.js');
var WakJSC = new wakjsc('http://localhost:8081'); //Pass here Wakanda Server url
console.log(WakJSC.version()); //0.0.1
```

### Browser
You will have to proxy all request on `/rest` to your Wakanda Server (example on gulpfile).
```html
<script src="./wakjsc.js"></script>
<script>
  console.log(WakJSC.version()); //0.0.1
</script>
```
