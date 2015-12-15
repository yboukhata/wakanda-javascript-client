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

## Example

### Node.js
```javascript
var WakJSC = require('./main.build.js');
console.log(WakJSC.version()); //0.0.1
```

### Browser
```html
<script src="./build.main.js"></script>
<script>
  console.log(WakJSC.version()); //0.0.1
</script>
```
