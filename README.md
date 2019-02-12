# pika-plugin-minify

> A [@pika/pack](https://github.com/pikapkg/pack) build plugin.
> Minifies your index.js files in /pkg/\* using [terser](https://github.com/terser-js/terser)

## Install

```sh
# npm:
npm install pika-plugin-minify --save-dev
# yarn:
yarn add pika-plugin-minify --dev
```

## Usage

```json
{
  "name": "example-package-json",
  "version": "1.0.0",
  "@pika/pack": {
    "pipeline": [["pika-plugin-minify",{"minifyOptions": <terser options>}]]
  }
}
```

For more information about @pika/pack & help getting started, [check out the main project repo](https://github.com/pikapkg/pack).
