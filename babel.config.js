module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  env: {
    test: {
      presets: ['@babel/preset-env'],
    },
  },
  plugins: ['@babel/plugin-transform-runtime'],
}
