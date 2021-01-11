const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy
} = require("customize-cra");

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "red",
      "@border-color-base": "green",
      "@link-color": "orange"
    }
  }),
  addDecoratorsLegacy() //配置装饰器
);
