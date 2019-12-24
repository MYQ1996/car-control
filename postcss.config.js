module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-plugin-px2rem": {
      "remUnit": 75,
      "exclude": "/node_modules"
    }
  }
}
