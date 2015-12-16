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

The bundle is build on `./build/` directory.

You can `require` it on a node application, or directly insert is on a `<script>`
tag (it's an UMD module).

## Unit tests
Unit testing is made with mocha and chai. It directly runs tests against built bundle.
Tests are written in ES5 to avoid useless compilation.

```bash
npm run test
```

To run test without rebuilding bundle with webpack, launch

```bash
npm run single-test
```

## Example

### Node.js
```javascript
var WakJSC = require('./wakjsc.js');
console.log(WakJSC.version()); //0.0.1
```

### Browser
```html
<script src="./wakjsc.js"></script>
<script>
  console.log(WakJSC.version()); //0.0.1
</script>
```
