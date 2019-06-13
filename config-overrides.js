const { override,addWebpackAlias, fixBabelImports ,addLessLoader,addDecoratorsLegacy,disableEsLint,overrideDevServer} = require('customize-cra')
const path = require('path')

const webpackConfig = () => config =>{
  config.devtool = false
  return config
}

module.exports = {
  webpack :override(
    fixBabelImports('import', { libraryName: 'antd-mobile', style: true}),
    addWebpackAlias({
      ["@"]: path.resolve(__dirname, "src"),
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
           '@brand-primary': '#DC000C',
           '@primary-button-fill-tap':'#DC000C'
          },
    }),
    webpackConfig()
  ),
  

  devServer: overrideDevServer(
    
  )
}