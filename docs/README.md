# Welcome to f.js

f.js is a functional JavaScript library for writing frontend applications.
It is quite different from frameworks like React and Vue in that it
discourages mutability and provides tools to write simple, safe code without
sacrificing power or speed. This website provides the documentation for f.js,
as well as high-level guides on how to utilize its features.

## Installation

f.js can be installed as a node module through the `@stomprocket/f` npm package.
```sh
$ yarn add @stomprocket/f
```

It is recommended to build f.js applications with Webpack, a simple and
powerfull way to compile JavaScript applications for the web. Install it
with yarn or npm and add a script to build in your `package.json`.

```sh
$ yarn add -D webpack
```

```json
"scripts": {
  "build": "webpack"
}
```

## Usage

Now you can import `f.js` as an es6 module and Webpack will compile it down
to a single minified JavaScript file. By default, Webpack will read JavaScript
source files from the `src` directory, and output compiled JS into the `dist`
directory as `main.js`. This behavior can be configured extensively (see the
[webpack docs](https://webpack.js.org/)).

```js
import * as f from '@stomprocket/f'
```
